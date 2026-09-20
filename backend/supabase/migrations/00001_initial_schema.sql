-- GayaSeva Core Database Schema Migration
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE user_role AS ENUM (
  'CUSTOMER',
  'DRIVER',
  'PANDIT',
  'HOTEL',
  'SHOP',
  'GUIDE',
  'OTHER_PROVIDER',
  'ADMIN',
  'SUPER_ADMIN'
);

CREATE TYPE verification_status AS ENUM (
  'PENDING',
  'VERIFIED',
  'REJECTED',
  'SUSPENDED'
);

CREATE TYPE ride_status AS ENUM (
  'NEW',
  'SEARCHING',
  'PROVIDER_SELECTED',
  'ACCEPTED',
  'CONFIRMED',
  'DRIVER_ARRIVING',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
  'EXPIRED'
);

CREATE TYPE lost_found_status AS ENUM (
  'REPORTED',
  'UNDER_VERIFICATION',
  'RESOLVED',
  'EXPIRED'
);

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  phone VARCHAR(20) UNIQUE,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'CUSTOMER',
  language VARCHAR(10) DEFAULT 'hi',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.provider_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  business_name VARCHAR(150),
  provider_type user_role NOT NULL,
  verification_status verification_status NOT NULL DEFAULT 'PENDING',
  rejection_reason TEXT,
  phone_whatsapp VARCHAR(20),
  bio TEXT,
  address TEXT,
  area_name VARCHAR(100) DEFAULT 'Gaya Ji',
  rating NUMERIC(3,2) DEFAULT 5.00,
  total_reviews INT DEFAULT 0,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.provider_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID NOT NULL REFERENCES public.provider_profiles(id) ON DELETE CASCADE,
  document_type VARCHAR(50) NOT NULL,
  document_url TEXT NOT NULL,
  verified_by UUID REFERENCES public.profiles(id),
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID NOT NULL REFERENCES public.provider_profiles(id) ON DELETE CASCADE,
  vehicle_type VARCHAR(50) NOT NULL,
  vehicle_number VARCHAR(30) UNIQUE NOT NULL,
  model_name VARCHAR(50),
  capacity INT NOT NULL DEFAULT 4,
  is_elderly_friendly BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.lost_and_found_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR(20) NOT NULL,
  title VARCHAR(150) NOT NULL,
  category VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  location_event TEXT NOT NULL,
  image_url TEXT,
  reporter_name VARCHAR(100) NOT NULL,
  reporter_phone VARCHAR(20) NOT NULL,
  status lost_found_status DEFAULT 'REPORTED',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
