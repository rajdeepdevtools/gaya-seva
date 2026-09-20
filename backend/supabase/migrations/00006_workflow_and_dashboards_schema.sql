-- GayaSeva Workflow, Dashboards, Live GPS & QR System Migration
-- Migration: 00006_workflow_and_dashboards_schema.sql

-- 1. Live GPS Ride Locations Table with Retention Policy
CREATE TABLE IF NOT EXISTS public.ride_locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ride_id UUID NOT NULL REFERENCES public.active_rides(id) ON DELETE CASCADE,
  driver_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  lat NUMERIC(10, 7) NOT NULL,
  lng NUMERIC(10, 7) NOT NULL,
  accuracy NUMERIC(8, 2),
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ride_locations_ride_recorded 
  ON public.ride_locations(ride_id, recorded_at DESC);

-- Automatic 30-Day Retention Pruning Function for GPS logs
CREATE OR REPLACE FUNCTION prune_old_ride_locations() 
RETURNS void AS $$
BEGIN
  DELETE FROM public.ride_locations
  WHERE recorded_at < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

-- 2. AI Knowledge Base Table for Safe AI Assistant
CREATE TABLE IF NOT EXISTS public.ai_knowledge (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  tags JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed core Gaya Ji knowledge base entries
INSERT INTO public.ai_knowledge (topic, title, content, tags)
VALUES
  ('vishnupad', 'Vishnupad Temple', 'Vishnupad Temple is an ancient holy temple in Gaya Ji dedicated to Lord Vishnu, featuring his 40-cm footprint stamped in solid basalt rock.', '["temple", "pinda_daan", "visnu"]'::jsonb),
  ('falgu', 'Falgu River', 'Falgu River is the sacred river of Gaya Ji where pilgrims perform Pinda Daan rites for ancestral salvation.', '["river", "pinda_daan", "sacred"]'::jsonb),
  ('bodh_gaya', 'Bodh Gaya', 'Bodh Gaya is located 12 km from Gaya Ji town and is the world-renowned pilgrimage site where Lord Buddha attained enlightenment under the Mahabodhi Tree.', '["buddha", "mahabodhi", "stay"]'::jsonb)
ON CONFLICT (topic) DO NOTHING;

-- 3. QR Code Sources Table
CREATE TABLE IF NOT EXISTS public.qr_sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_key VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  scan_count INT DEFAULT 0,
  last_scanned_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed QR sources
INSERT INTO public.qr_sources (source_key, name, description)
VALUES
  ('hotel', 'Hotel Reception QR', 'Scanned at partner hotels and guest houses'),
  ('station', 'Gaya Railway Station QR', 'Scanned at station exit posters'),
  ('poster', 'City Transport Poster QR', 'Scanned on local public posters')
ON CONFLICT (source_key) DO NOTHING;

-- 4. Customer Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES public.service_bookings(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES public.provider_profiles(id) ON DELETE CASCADE,
  rating NUMERIC(2, 1) CHECK (rating >= 1.0 AND rating <= 5.0),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reviews_provider ON public.reviews(provider_id, created_at DESC);

-- 5. Multi-Channel Notifications Table
CREATE TABLE IF NOT EXISTS public.user_notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title VARCHAR(150) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) NOT NULL DEFAULT 'SYSTEM',
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.user_notifications(user_id, is_read, created_at DESC);

-- Enable RLS
ALTER TABLE public.ride_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_knowledge ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qr_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Private ride locations readable by participants" ON public.ride_locations
  FOR SELECT USING (
    auth.uid() IN (
      SELECT customer_id FROM public.active_rides WHERE id = ride_id
      UNION
      SELECT driver_id FROM public.active_rides WHERE id = ride_id
    )
  );

CREATE POLICY "Public AI Knowledge readable" ON public.ai_knowledge FOR SELECT USING (is_active = true);
CREATE POLICY "Public QR Sources readable" ON public.qr_sources FOR SELECT USING (true);
CREATE POLICY "Public Reviews readable" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Notifications readable by recipient" ON public.user_notifications FOR SELECT USING (auth.uid() = user_id);
