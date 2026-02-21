-- 1. Setup Extensions & Custom Types
CREATE TYPE user_role AS ENUM ('patient', 'clinician', 'admin');
CREATE TYPE appointment_status AS ENUM ('booked', 'confirmed', 'completed', 'cancelled');

-- 2. Profiles Table (Extends Auth.Users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role DEFAULT 'patient' NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Appointments Table
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES profiles(id) NOT NULL,
  clinician_id UUID REFERENCES profiles(id) NOT NULL,
  status appointment_status DEFAULT 'booked' NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT different_users CHECK (patient_id <> clinician_id)
);

-- 4. ePRO Forms & Responses
CREATE TABLE epro_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  schema_json JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE form_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_id UUID REFERENCES epro_forms(id) NOT NULL,
  patient_id UUID REFERENCES profiles(id) NOT NULL,
  response_json JSONB NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Consents
CREATE TABLE consents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES profiles(id) NOT NULL,
  consent_text TEXT NOT NULL,
  signature_url TEXT,
  accepted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. CRF Entries
CREATE TABLE crf_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID REFERENCES appointments(id) NOT NULL,
  clinician_id UUID REFERENCES profiles(id) NOT NULL,
  crf_json JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Tele Logs
CREATE TABLE tele_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID REFERENCES appointments(id) NOT NULL,
  call_duration INTEGER, -- In seconds
  recording_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Audit Logs
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE epro_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE crf_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE tele_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- 10. RLS Policies

-- Profiles: Users can view their own profile; Admins can view all.
CREATE POLICY "Users can view their own profile." ON profiles 
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles." ON profiles 
  FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Appointments: Patients view their appointments; Clinicians view their appointments.
CREATE POLICY "Patients view their own appointments." ON appointments 
  FOR SELECT USING (auth.uid() = patient_id);
CREATE POLICY "Clinicians view their own appointments." ON appointments 
  FOR SELECT USING (auth.uid() = clinician_id);

-- Form Responses: Patients view their responses; Clinicians view responses for their patients.
CREATE POLICY "Patients view their own responses." ON form_responses 
  FOR SELECT USING (auth.uid() = patient_id);
