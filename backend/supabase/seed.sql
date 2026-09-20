-- GayaSeva Backend Initial Seed Data

-- 28 Admin Sections
INSERT INTO public.admin_sections (key, name, description, display_order) VALUES
  ('dashboard', 'Dashboard Overview', 'Main administrative dashboard metrics', 1),
  ('users', 'User Management', 'Manage customers and system users', 2),
  ('providers', 'Providers Management', 'Manage all service providers', 3),
  ('drivers', 'Drivers & Vehicles', 'Manage drivers, taxis, and vehicle fleets', 4),
  ('pandits', 'Pandits & Religious', 'Manage pandits and religious service listings', 5),
  ('hotels', 'Hotels & Stay', 'Manage hotels, dharamshalas, and guest houses', 6),
  ('shops', 'Shops & Puja Material', 'Manage shops, prasad, and puja items', 7),
  ('guides', 'Gaya Guides', 'Manage tourist and local pilgrimage guides', 8),
  ('service_categories', 'Service Categories', 'Manage platform service categories', 9),
  ('services', 'Services Catalog', 'Manage specific service offerings', 10),
  ('service_requests', 'Service Requests', 'Manage customer service and pick-drop requests', 11),
  ('bookings', 'Bookings & Orders', 'Manage confirmed bookings and transactions', 12),
  ('active_rides', 'Active Rides', 'Monitor live active rides', 13),
  ('gps_monitoring', 'GPS & Ride Monitoring', 'Live map view of active driver locations', 14),
  ('verification', 'Provider Verification', 'Review and verify provider documents', 15),
  ('reviews', 'Reviews & Ratings', 'Manage customer feedback and ratings', 16),
  ('complaints', 'Complaints & Support', 'Manage customer complaints and dispute resolution', 17),
  ('gaya_guide', 'Gaya Guide Content', 'Manage Gaya holy places and tourist content', 18),
  ('help_resources', 'Help & Emergency', 'Manage emergency numbers, hospitals, and Lost & Found', 19),
  ('notifications', 'Push Notifications', 'Send and manage platform push notifications', 20),
  ('ai_knowledge', 'AI Assistant Knowledge', 'Manage approved knowledge base for AI', 21),
  ('ai_conversations', 'AI Conversations Log', 'Inspect AI assistant interaction logs', 22),
  ('payments', 'Payment Transactions', 'Monitor Razorpay orders and payment webhooks', 23),
  ('reports', 'Reports & Analytics', 'View detailed performance and business reports', 24),
  ('qr_sources', 'QR Sources Tracking', 'Manage QR code physical source tracking', 25),
  ('marketing_content', 'Marketing & Banners', 'Manage promotional banners and hero content', 26),
  ('email_smtp', 'Email & SMTP Management', 'Manage SMTP settings, logs, and email templates', 27),
  ('settings', 'System Settings', 'Platform-wide configurations and rules', 28),
  ('audit_logs', 'Audit Logs', 'Inspect administrative activity logs', 29)
ON CONFLICT (key) DO NOTHING;
