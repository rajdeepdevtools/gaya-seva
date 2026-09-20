-- GayaSeva 100,000 Concurrent Users Database Scalability & High-Concurrency Migration
-- Migration: 00005_high_concurrency_indexes.sql

-- 1. High-Performance B-Tree & Compound Indexes on core tables
CREATE INDEX IF NOT EXISTS idx_profiles_role_active ON public.profiles(role, is_active, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_phone ON public.profiles(phone);

CREATE INDEX IF NOT EXISTS idx_provider_profiles_lookup 
  ON public.provider_profiles(provider_type, verification_status, is_available, area_name);
CREATE INDEX IF NOT EXISTS idx_provider_profiles_rating 
  ON public.provider_profiles(rating DESC, total_reviews DESC);
CREATE INDEX IF NOT EXISTS idx_provider_profiles_user_id 
  ON public.provider_profiles(user_id);

CREATE INDEX IF NOT EXISTS idx_vehicles_provider_active 
  ON public.vehicles(provider_id, is_active, vehicle_type, capacity);

CREATE INDEX IF NOT EXISTS idx_lost_found_status_created 
  ON public.lost_and_found_items(status, category, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_admin_logs_admin_created 
  ON public.admin_logs(admin_user_id, section, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_email_logs_status_created 
  ON public.email_logs(status, event_key, created_at DESC);

-- 2. New High-Concurrency Tables for Pick & Drop, Service Requests & Bookings

-- Service Requests Table
CREATE TABLE IF NOT EXISTS public.service_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  provider_type user_role NOT NULL,
  pickup_address TEXT NOT NULL,
  drop_address TEXT,
  pickup_lat NUMERIC(10, 7),
  pickup_lng NUMERIC(10, 7),
  status VARCHAR(30) NOT NULL DEFAULT 'NEW',
  idempotency_key VARCHAR(100) UNIQUE,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_service_requests_customer 
  ON public.service_requests(customer_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_service_requests_status 
  ON public.service_requests(status, provider_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_service_requests_idempotency 
  ON public.service_requests(idempotency_key);

-- Service Bookings Table
CREATE TABLE IF NOT EXISTS public.service_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id UUID NOT NULL REFERENCES public.service_requests(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES public.provider_profiles(id) ON DELETE CASCADE,
  amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  payment_status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
  razorpay_order_id VARCHAR(100),
  razorpay_payment_id VARCHAR(100),
  idempotency_key VARCHAR(100) UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_service_bookings_customer 
  ON public.service_bookings(customer_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_service_bookings_provider 
  ON public.service_bookings(provider_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_service_bookings_idempotency 
  ON public.service_bookings(idempotency_key);
CREATE INDEX IF NOT EXISTS idx_service_bookings_razorpay 
  ON public.service_bookings(razorpay_order_id);

-- Active Rides / Scoped Live Tracking Table
CREATE TABLE IF NOT EXISTS public.active_rides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL UNIQUE REFERENCES public.service_bookings(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  driver_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  current_lat NUMERIC(10, 7),
  current_lng NUMERIC(10, 7),
  status VARCHAR(30) NOT NULL DEFAULT 'IN_PROGRESS',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_active_rides_booking 
  ON public.active_rides(booking_id);
CREATE INDEX IF NOT EXISTS idx_active_rides_status 
  ON public.active_rides(status, updated_at DESC);

-- System Settings & Emergency High Traffic Mode Configuration
CREATE TABLE IF NOT EXISTS public.system_settings (
  key VARCHAR(100) PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed High Traffic Mode default configuration
INSERT INTO public.system_settings (key, value, description)
VALUES (
  'high_traffic_mode',
  '{"enabled": false, "cache_ttl_multiplier": 5, "disable_animations": true, "ai_rate_limit_per_min": 3}'::jsonb,
  'Emergency Pitru Paksha High Traffic Mode configuration toggle'
) ON CONFLICT (key) DO NOTHING;

-- Enable RLS on new tables
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.active_rides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies
CREATE POLICY "Customers can view their own requests" 
  ON public.service_requests FOR SELECT USING (auth.uid() = customer_id);

CREATE POLICY "Customers can view their own bookings" 
  ON public.service_bookings FOR SELECT USING (auth.uid() = customer_id);

CREATE POLICY "Providers can view assigned bookings" 
  ON public.service_bookings FOR SELECT 
  USING (auth.uid() IN (SELECT user_id FROM public.provider_profiles WHERE id = provider_id));

CREATE POLICY "Ride participants can view live tracking" 
  ON public.active_rides FOR SELECT 
  USING (auth.uid() = customer_id OR auth.uid() = driver_id);

CREATE POLICY "Public system settings readable" 
  ON public.system_settings FOR SELECT USING (true);
