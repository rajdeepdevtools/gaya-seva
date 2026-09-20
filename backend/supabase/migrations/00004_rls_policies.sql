-- GayaSeva Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lost_and_found_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are readable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Verified providers are publicly visible" ON public.provider_profiles FOR SELECT USING (verification_status = 'VERIFIED' OR auth.uid() = user_id);
CREATE POLICY "Approved lost & found items are public" ON public.lost_and_found_items FOR SELECT USING (true);
