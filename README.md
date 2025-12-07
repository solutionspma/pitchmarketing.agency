# Pitch Marketing Agency - Multi-Tenant SaaS Platform

This is the complete payment and management platform for Pitch Marketing Agency, including:

- **Stripe Connect Marketplace** - Full payment processing with agent payouts
- **Multi-Tenant Architecture** - Organizations with role-based access control
- **Admin Dashboard** - Customer, subscription, invoice, and project management
- **Print Shop** - Product catalog with Stripe integration
- **Support System** - Real-time ticket management

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd pitch-pay
npm install
```

### 2. Configure Environment Variables

Edit `.env.local` with your actual keys:

```env
# Stripe Keys (get from stripe.com/dashboard)
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key

# Supabase Keys (get from supabase.com/dashboard)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE=your_service_role_key

# App URL
NEXT_PUBLIC_URL=http://localhost:3000
```

### 3. Set Up Database

1. Go to [Supabase](https://supabase.com) and create a new project
2. Open the SQL Editor
3. Copy and run the entire contents of `supabase/schema.sql`

### 4. Seed Stripe Products

```bash
npm run seed
```

This creates all products including:
- LEVEL10 SaaS subscription tiers
- Agency services (websites, logos, video)
- Print products (banners, stickers, signs, apparel)
- BeCovered.life insurance plans
- SaxtaxPro tax plans

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
pitch-pay/
├── src/
│   ├── app/
│   │   ├── api/                    # API Routes
│   │   │   ├── admin/              # Admin APIs
│   │   │   ├── agents/             # Agent onboarding
│   │   │   ├── billing/            # Billing portal
│   │   │   ├── checkout/           # Stripe checkout
│   │   │   ├── connect/            # Marketplace payouts
│   │   │   ├── marketplace/        # Split payments
│   │   │   ├── pay-now/            # One-time payments
│   │   │   ├── payment-links/      # Payment links
│   │   │   ├── products/           # Product catalog
│   │   │   └── webhooks/           # Stripe webhooks
│   │   ├── auth/                   # Auth pages
│   │   ├── dashboard/              # Admin dashboard
│   │   ├── pricing/                # Pricing page
│   │   └── services/               # Services page
│   ├── components/
│   │   ├── admin/                  # Admin components
│   │   └── *.tsx                   # Shared components
│   └── lib/
│       ├── stripe.ts               # Stripe client
│       └── supabase.ts             # Supabase client
├── scripts/
│   └── seed-stripe.ts              # Product seeder
├── supabase/
│   └── schema.sql                  # Database schema
└── package.json
```

## 🔐 Multi-Tenant Architecture

Every table is scoped to organizations:

- Users belong to organizations via `organization_members`
- All data tables have `org_id` foreign key
- Row Level Security (RLS) enforces tenant isolation
- Users can only see/edit data from their organizations

## 💳 Stripe Integration

### Supported Features

- ✅ Subscription billing (monthly/annual)
- ✅ One-time payments
- ✅ Billing portal (card updates, invoices)
- ✅ Stripe Connect (agent payouts)
- ✅ Application fees (platform commission)
- ✅ Payment links
- ✅ Webhook sync

### Webhook Events Handled

- `customer.created`
- `invoice.created/paid/payment_failed`
- `customer.subscription.created/updated/deleted`
- `checkout.session.completed`
- `payment_intent.succeeded`
- `payout.paid`

## 🎯 Next Steps

1. **Set up Stripe Webhook Endpoint**
   - Go to Stripe Dashboard → Developers → Webhooks
   - Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Select events listed above

2. **Configure Stripe Connect**
   - Enable Express accounts in Stripe Dashboard
   - Set up branding for onboarding

3. **Deploy to Production**
   - Vercel recommended for Next.js
   - Update environment variables
   - Update NEXT_PUBLIC_URL

## 📞 Support

Built by Pitch Marketing Agency
Contact: support@pitchmarketing.agency
