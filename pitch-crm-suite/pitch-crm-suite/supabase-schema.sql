-- =============================================
-- PITCH CRM SUITE - SUPABASE SCHEMA
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- CLIENTS TABLE
-- =============================================
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  phone TEXT,
  company TEXT,
  elite BOOLEAN DEFAULT FALSE,
  sessions INTEGER DEFAULT 0,
  stripe_customer_id TEXT,
  subscription JSONB,
  metadata JSONB DEFAULT '{}',
  last_credit_assigned TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for email lookups
CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_clients_stripe_customer ON clients(stripe_customer_id);

-- =============================================
-- BOOKINGS TABLE
-- =============================================
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  cancellation_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for booking queries
CREATE INDEX idx_bookings_date ON bookings(date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_email ON bookings(email);

-- =============================================
-- ANALYTICS EVENTS TABLE
-- =============================================
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_name TEXT NOT NULL,
  properties JSONB DEFAULT '{}',
  user_id UUID,
  session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for event queries
CREATE INDEX idx_analytics_event_name ON analytics_events(event_name);
CREATE INDEX idx_analytics_created_at ON analytics_events(created_at);

-- =============================================
-- SESSIONS TABLE (for tracking client sessions)
-- =============================================
CREATE TABLE client_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id),
  session_type TEXT NOT NULL,
  notes TEXT,
  duration_minutes INTEGER,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INVOICES TABLE
-- =============================================
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id),
  stripe_invoice_id TEXT,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'usd',
  status TEXT DEFAULT 'draft',
  description TEXT,
  due_date DATE,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- FUNCTIONS
-- =============================================

-- Function to increment sessions
CREATE OR REPLACE FUNCTION increment_sessions(client_uuid UUID, amount INTEGER)
RETURNS INTEGER AS $$
DECLARE
  new_sessions INTEGER;
BEGIN
  UPDATE clients 
  SET sessions = sessions + amount,
      last_credit_assigned = NOW()
  WHERE id = client_uuid
  RETURNING sessions INTO new_sessions;
  
  RETURN new_sessions;
END;
$$ LANGUAGE plpgsql;

-- Function to get top events
CREATE OR REPLACE FUNCTION get_top_events(event_limit INTEGER DEFAULT 10)
RETURNS TABLE(event_name TEXT, count BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT ae.event_name, COUNT(*) as count
  FROM analytics_events ae
  GROUP BY ae.event_name
  ORDER BY count DESC
  LIMIT event_limit;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

-- Enable RLS
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Policies for authenticated users
CREATE POLICY "Users can view own client data" ON clients
  FOR SELECT USING (auth.uid()::text = id::text OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can manage all clients" ON clients
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (email = auth.jwt() ->> 'email' OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Anyone can create bookings" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage all bookings" ON bookings
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- =============================================
-- TRIGGERS
-- =============================================

-- Updated at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables
CREATE TRIGGER clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
