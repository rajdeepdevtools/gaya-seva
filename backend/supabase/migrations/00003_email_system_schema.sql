-- GayaSeva SMTP Email System Schema Migration
CREATE TYPE email_status AS ENUM (
  'QUEUED',
  'SENDING',
  'SENT',
  'FAILED',
  'RETRYING'
);

CREATE TABLE IF NOT EXISTS public.email_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_key VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(150) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  preheader VARCHAR(255),
  html_body TEXT NOT NULL,
  text_body TEXT NOT NULL,
  variables JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  version INT DEFAULT 1,
  updated_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.email_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_key VARCHAR(100) NOT NULL,
  recipient VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  status email_status NOT NULL DEFAULT 'QUEUED',
  provider_message_id VARCHAR(255),
  error_message_safe TEXT,
  retry_count INT DEFAULT 0,
  related_type VARCHAR(50),
  related_id VARCHAR(100),
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.email_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  smtp_host VARCHAR(255),
  smtp_port INT DEFAULT 587,
  smtp_secure BOOLEAN DEFAULT false,
  smtp_from_email VARCHAR(255) DEFAULT 'noreply@gayaseva.org',
  smtp_from_name VARCHAR(100) DEFAULT 'GayaSeva',
  smtp_reply_to VARCHAR(255) DEFAULT 'support@gayaseva.org',
  updated_by UUID REFERENCES public.profiles(id),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
