# 🏥 Teleconsultation Platform – Production Blueprint

## 1. System Overview

A secure telehealth platform supporting:

- Patients
- Clinicians
- Administrators

Core modules:
- Authentication & Role Management
- Appointment Scheduling
- ePRO Forms
- Consent Management
- File Uploads
- Video Consultation
- CRF Documentation
- Audit Logs
- Admin Dashboard

---

# 2. Technology Stack

## Frontend
- React Native (Expo)
- TypeScript
- React Navigation
- Redux Toolkit
- React Hook Form
- Zod Validation
- Axios

## Backend
- Supabase
  - PostgreSQL
  - Authentication
  - Row Level Security
  - Storage
  - Realtime
  - Edge Functions

## Third Party
- Agora or Twilio (Video)
- FCM (Push Notifications)
- SendGrid (Email)
- MSG91 (SMS)

---

# 3. User Roles

## Patient
- Register/Login (OTP)
- Book Appointment
- Submit ePRO
- Upload Files
- Give Digital Consent
- Attend Video Call

## Clinician
- View Dashboard
- Manage Appointments
- Conduct Video Call
- Fill CRF
- Access Patient Records

## Admin
- Manage Users
- View Reports
- Monitor Appointments
- Export Data
- View Audit Logs

---

# 4. Database Schema (Supabase)

## users
- id (uuid, PK)
- role (patient | clinician | admin)
- full_name
- phone
- email
- created_at

## appointments
- id (uuid)
- patient_id (FK users)
- clinician_id (FK users)
- status (booked | confirmed | completed | cancelled)
- scheduled_at
- notes
- created_at

## epro_forms
- id
- title
- schema_json

## form_responses
- id
- form_id
- patient_id
- response_json
- submitted_at

## consents
- id
- patient_id
- consent_text
- signature_url
- accepted_at

## crf_entries
- id
- appointment_id
- clinician_id
- crf_json
- created_at

## tele_logs
- id
- appointment_id
- call_duration
- recording_url
- created_at

## audit_logs
- id
- user_id
- action
- metadata
- created_at

---

# 5. Security Requirements

- Enable Row Level Security (RLS)
- Patients can only access their data
- Clinicians can access assigned patients
- Admin has full access
- Use signed URLs for file downloads
- Use JWT-based authentication
- Enable database backups

---

# 6. Edge Functions Required

- Prevent double booking
- Send appointment reminders
- Trigger email on consent submission
- Log CRF updates
- Auto-expire unused appointments

---

# 7. Realtime Features

- Appointment status updates
- CRF live update
- Clinician availability
- Push notifications

---

# 8. Video Integration

- Generate token via Edge Function
- Join secure room
- Store session logs
- Optional recording storage

---

# 9. DevOps & Monitoring

- Enable Supabase logs
- Integrate Sentry
- Daily database backup
- CI/CD pipeline

---

# 10. Deployment Targets

- Android (Play Store)
- iOS (App Store)
- Web Admin (Next.js optional)

---

# 11. Compliance Preparation

- Audit logging
- Data encryption
- Consent version tracking
- Retention policy
- Data export request endpoint

---

# 12. Production Checklist

- RLS tested
- SQL indexed
- Foreign keys enforced
- Input validation
- Error handling
- Rate limiting
- Secure ENV variables
