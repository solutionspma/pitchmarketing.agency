# CRM Tier Specifications - PWS Packages

## Overview
4 progressive CRM tiers that increase in functionality, designed to be developed modularly and installed with each corresponding web package.

---

## 🎯 Tier 1: Starter CRM
**Included with:** Essential Site ($1,200 + $75/mo)

### Core Features
- **Contact Management**
  - Add/edit/delete contacts
  - Basic contact fields (name, email, phone, company)
  - Notes/comments on each contact
  - Contact list view with search

- **Basic Email Notifications**
  - Contact form submission alerts
  - New lead notifications
  - Simple email templates

### Tech Stack Ready to Build
- Supabase table: `contacts`
- Simple dashboard: Contact list + detail view
- Email: SendGrid basic notifications

### Use Case
Solo entrepreneurs, service providers who need to track leads from their website contact form.

---

## 🚀 Tier 2: Growth CRM
**Included with:** Functional Site ($2,400 + $125/mo)

### Everything in Starter CRM, plus:

- **Client Pipeline**
  - Deal stages (Lead → Contacted → Proposal → Won/Lost)
  - Drag-and-drop pipeline board
  - Deal values and probability
  - Pipeline analytics

- **Analytics Dashboard**
  - Conversion rates by stage
  - Lead source tracking
  - Monthly growth metrics
  - Revenue forecasting

- **Automated Email Sequences**
  - Trigger-based emails (form fill, stage change)
  - 3-5 email templates per sequence
  - Open/click tracking

- **Booking Management**
  - Calendar integration
  - Booking status tracking
  - Automated reminders
  - Rescheduling workflows

### Tech Stack Ready to Build
- Supabase tables: `contacts`, `deals`, `bookings`, `email_sequences`
- Dashboard: Pipeline board (react-dnd), analytics charts
- Calendly or custom booking integration

### Use Case
Growing businesses with bookings (consultants, event planners, service businesses) who need pipeline visibility.

---

## 💼 Tier 3: Pro CRM
**Included with:** E-Commerce Platform ($3,997 + $175/mo)

### Everything in Growth CRM, plus:

- **Sales Pipeline**
  - Multiple pipelines (Sales, Support, Projects)
  - Custom fields per pipeline
  - Task assignment and due dates
  - Deal collaboration (team notes)

- **Advanced Analytics & Reporting**
  - Custom report builder
  - Cohort analysis
  - Customer lifetime value (CLV)
  - Product performance metrics
  - Export to CSV/PDF

- **Multi-Channel Automation**
  - Email + SMS workflows
  - Conditional logic (if/then)
  - Time delays and scheduling
  - A/B testing for campaigns

- **Customer Order History**
  - Full order timeline per customer
  - Purchase patterns
  - Cross-sell recommendations
  - Refund/return tracking

- **SMS Notifications**
  - Twilio integration
  - Order confirmations
  - Shipping updates
  - Abandoned cart recovery

### Tech Stack Ready to Build
- Supabase tables: `deals`, `tasks`, `orders`, `campaigns`, `automations`
- Dashboard: Multi-pipeline view, advanced charts, reporting engine
- Integrations: Stripe (orders), Twilio (SMS)

### Use Case
E-commerce businesses and sellers who need full customer lifecycle management and automated marketing.

---

## 🏢 Tier 4: Enterprise CRM
**Included with:** Enterprise Build (From $7,997)

### Everything in Pro CRM, plus:

- **Full Enterprise Suite**
  - Unlimited custom modules
  - White-label branding
  - Multi-tenant architecture
  - Role-based access control (RBAC)

- **Custom Reporting & BI**
  - SQL query builder
  - Custom dashboards per user/team
  - Scheduled report delivery
  - Data warehouse integration

- **Advanced Marketing Automation**
  - Multi-step campaigns (10+ emails)
  - Lead scoring algorithms
  - Predictive analytics
  - Attribution modeling

- **Team Collaboration Tools**
  - Internal chat/messaging
  - @mentions and notifications
  - Shared calendars
  - Activity feeds

- **API & Webhook Integrations**
  - REST API access
  - Webhook builder
  - Zapier/Make integration
  - Custom integration development

- **Mobile App Access**
  - Progressive Web App (PWA)
  - iOS/Android compatible
  - Offline mode
  - Push notifications

- **Staff Training Included**
  - Onboarding sessions
  - Video tutorials
  - Documentation portal
  - Ongoing support calls

### Tech Stack Ready to Build
- Supabase: Multi-tenant setup with RLS policies
- Next.js: Full dashboard with all modules
- PWA: Mobile-optimized interface
- API: REST endpoints + webhook system
- Integrations: Zapier, Slack, custom APIs

### Use Case
Large teams, agencies, or businesses with complex workflows who need a fully customized CRM that replaces multiple tools.

---

## 📋 Development Priority Order

1. **Build Tier 1 First** (Starter CRM)
   - Essential foundation
   - Can be delivered standalone
   - ~2-3 day build

2. **Upgrade to Tier 2** (Growth CRM)
   - Add pipeline + automation
   - Build on Tier 1 foundation
   - ~5-7 day build

3. **Upgrade to Tier 3** (Pro CRM)
   - Add e-commerce + multi-channel
   - Requires Stripe integration
   - ~7-10 day build

4. **Upgrade to Tier 4** (Enterprise CRM)
   - Full white-label customization
   - Custom per client
   - ~2-4 week build

---

## 🎨 Design Philosophy

Each tier should:
- ✅ Be installable independently
- ✅ Share common UI/UX patterns
- ✅ Use the same color scheme (Pitch gold/black)
- ✅ Store data in unified Supabase schema
- ✅ Allow easy upgrades (data migration-free)

---

## 💾 Unified Database Schema

All tiers share core tables:
```sql
-- Core tables (Tier 1+)
contacts
notes

-- Growth tables (Tier 2+)
deals
bookings
email_sequences
pipeline_stages

-- Pro tables (Tier 3+)
orders
campaigns
automations
sms_logs

-- Enterprise tables (Tier 4+)
teams
permissions
api_keys
webhooks
custom_fields
```

---

## 🚀 Ready to Build

Use this spec to develop each tier progressively. Each one is a complete, functional CRM that adds value at its price point.

**Next Steps:**
1. Build Tier 1 (Starter CRM) for Essential Site clients
2. Test with Carolina's BalloonQueenX project
3. Document installation process
4. Build Tier 2 when first Functional Site client signs
