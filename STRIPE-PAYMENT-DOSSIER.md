# 💳 STRIPE PAYMENT INTEGRATION DOSSIER
## Pitch Marketing Agency - Complete Payment Catalog

**Generated:** January 12, 2026  
**Website:** http://localhost:3000  
**Status:** Development server running ✅

---

## 📊 EXECUTIVE SUMMARY

The Pitch Marketing Agency website features **multiple payment types** across various service categories:

### Payment Types
1. **Recurring Subscriptions** (Monthly/Annual) - For SaaS & Retainer Services
2. **One-Time Payments** - For Agency Services, Web Builds, & Print Products
3. **Hybrid Payments** - Web Services with one-time setup + monthly hosting
4. **Custom Quotes** - Enterprise builds and specialized services

### Current Stripe Integration Status
- ✅ Stripe SDK installed (`stripe@14.9.0`)
- ✅ Stripe React components ready
- ⚠️ **API Keys needed** - Currently using placeholder keys in `.env.local`
- ✅ Seed script ready (`scripts/seed-stripe.ts`)
- ✅ Checkout API routes configured
- ✅ Webhook infrastructure in place

---

## 🎯 PRICING STRUCTURE BREAKDOWN

### 1️⃣ SOCIAL MEDIA MARKETING (SMMA) - Monthly Subscriptions

**Location:** `/pricing` page - Tab 1  
**Payment Type:** Recurring subscription  
**Billing Interval:** Monthly

| Tier | Price | Stripe Product Name | Popular |
|------|-------|---------------------|---------|
| SMMA Starter | $997/mo | "SMMA Starter" | No |
| SMMA Growth | $1,997/mo | "SMMA Growth" | ⭐ Yes |
| SMMA Dominate | $3,997/mo | "SMMA Dominate" | No |

**Features Summary:**
- Starter: 2 platforms, 12 posts/month, basic analytics
- Growth: 4 platforms, 20 posts/month, ads ($500 spend), priority support
- Dominate: Unlimited platforms, 30+ posts, ads ($2k spend), 24/7 support

---

### 2️⃣ CONSULTING SERVICES - Mixed Payment Types

**Location:** `/pricing` page - Tab 2  
**Payment Type:** Mixed (one-time & subscription)

| Service | Price | Payment Type | Stripe Product Name |
|---------|-------|--------------|---------------------|
| Strategy Session | $497 | One-time | "Strategy Session" |
| Monthly Advisory | $1,497/mo | Monthly Subscription | "Monthly Advisory" |
| VIP Day | $2,997 | One-time | "VIP Day" |

**Features Summary:**
- Strategy Session: 90-min video call, action plan, 7-day follow-up
- Monthly Advisory: 4 calls/month, unlimited email, growth roadmap
- VIP Day: Full day intensive (6-8 hours), complete business audit

---

### 3️⃣ PITCH WEB SERVICES (PWS) - Hybrid Payments

**Location:** `/pricing` page - Tab 3  
**Payment Type:** One-time setup + optional monthly hosting  
**Note:** Each tier includes corresponding CRM functionality

| Tier | Setup Price | Monthly Hosting | CRM Level | Popular |
|------|-------------|-----------------|-----------|---------|
| Landing Page Starter | $499 | None | None | No |
| Essential Site | $1,200 | +$75/mo | Starter CRM | ⭐ Yes |
| Functional Site | $2,400 | +$125/mo | Growth CRM | No |
| E-Commerce Platform | $3,997 | +$175/mo | Pro CRM | No |
| Enterprise Build | From $7,997 | Custom | Enterprise CRM | No |

**CRM Tier Features Included:**

**Starter CRM** (with Essential Site):
- Contact management
- Basic email notifications
- Contact form integration

**Growth CRM** (with Functional Site):
- Everything in Starter +
- Client pipeline with drag-drop board
- Analytics dashboard
- Automated email sequences
- Booking management

**Pro CRM** (with E-Commerce):
- Everything in Growth +
- Sales pipeline with multiple stages
- Advanced analytics & reporting
- Multi-channel automation (email + SMS)
- Customer order history
- CLV tracking

**Enterprise CRM** (with Enterprise Build):
- Everything in Pro +
- Unlimited custom modules
- White-label branding
- Role-based access control
- Custom reporting & BI
- Team collaboration tools
- API & webhook integrations
- Mobile app access
- Staff training included

---

### 4️⃣ MEDIA PRODUCTION - Monthly Subscriptions

**Location:** `/pricing` page - Tab 4  
**Payment Type:** Recurring subscription  
**Billing Interval:** Monthly

| Package | Price | Stripe Product Name | Popular |
|---------|-------|---------------------|---------|
| Content Starter | $797/mo | "Content Starter" | No |
| Video Production | $1,997/mo | "Video Production" | ⭐ Yes |
| Media Suite | $3,497/mo | "Media Suite" | No |

**Features Summary:**
- Content Starter: 4 short-form videos, basic editing, social optimized
- Video Production: 2 long-form + 8 short-form, cinematic quality, scriptwriting
- Media Suite: Unlimited video, photography, music production, podcast, 48hr turnaround

---

### 5️⃣ SAAS SUBSCRIPTION TIERS (LEVEL10)

**Location:** Backend system (for SaaS product)  
**Payment Type:** Recurring subscription  
**Billing Interval:** Monthly or Annual

| Tier | Monthly | Annual | Stripe Product Name |
|------|---------|--------|---------------------|
| LEVEL10 Starter | $39/mo | $399/yr | "LEVEL10 Starter" |
| LEVEL10 Business | $79/mo | $799/yr | "LEVEL10 Business" |
| LEVEL10 Pro | $149/mo | $1,499/yr | "LEVEL10 Pro" |
| LEVEL10 Enterprise | $249/mo | $2,499/yr | "LEVEL10 Enterprise" |

---

### 6️⃣ ADD-ONS & ENHANCEMENTS

**Location:** Available as upsells  
**Payment Type:** Mixed

| Add-On | Price | Type | Stripe Product Name |
|--------|-------|------|---------------------|
| Additional User Seat | $15/mo | Subscription | "Additional User Seat" |
| AI Avatar Engine | $29/mo | Subscription | "AI Avatar Engine" |
| Marketing Package | $149/mo | Subscription | "Marketing Package" |
| SMS Bundle 1,000 | $20 | One-time | "SMS Bundle 1,000" |
| SMS Bundle 5,000 | $75 | One-time | "SMS Bundle 5,000" |

---

### 7️⃣ AGENCY ONE-TIME SERVICES

**Location:** Various service pages  
**Payment Type:** One-time payment

| Service | Price | Category | Stripe Product Name |
|---------|-------|----------|---------------------|
| Website Design — Starter | $500 | Web Design | "Website Design — Starter" |
| Website Design — Business | $1,000 | Web Design | "Website Design — Business" |
| Website Design — Premium | $2,500 | Web Design | "Website Design — Premium" |
| Website Design — Elite | $3,500 | Web Design | "Website Design — Elite" |
| Logo Design (Standard) | $150 | Branding | "Logo Design (Standard)" |
| Logo Design (Premium) | $350 | Branding | "Logo Design (Premium)" |
| Brand Kit Add-on | $97 | Branding | "Brand Kit Add-on" |
| Social Media Setup | $197 | Social Media | "Social Media Setup" |
| Video Commercial — Basic | $500 | Video | "Video Commercial — Basic" |
| Video Commercial — Pro | $1,200 | Video | "Video Commercial — Pro" |
| AI Avatar Video | $97 | Video | "AI Avatar Video" |
| Consulting Session — 1 Hour | $197 | Consulting | "Consulting Session — 1 Hour" |
| Consulting Session — Half Day | $497 | Consulting | "Consulting Session — Half Day" |

---

### 8️⃣ PRINT PRODUCTS CATALOG

**Location:** `/print` page  
**Payment Type:** One-time payment  
**Note:** 80+ print products available

#### Business Cards
| Product | Price | Unit | Stripe Product Name |
|---------|-------|------|---------------------|
| Standard Business Cards | $19.99 | 250 cards | "Business Cards — 250" |
| Premium Thick Cards | $34.99 | 250 cards | "Business Cards — 500" |
| Matte Finish Cards | $24.99 | 250 cards | "Business Cards — 1000" |
| Foil Stamped Cards | $79.99 | 250 cards | "Business Cards Foil — 250" |

#### Banners & Signs
| Product | Price | Unit | Stripe Product Name |
|---------|-------|------|---------------------|
| Vinyl Banner 2x4 | $35 | each | "Vinyl Banner 2x4" |
| Vinyl Banner 3x6 | $55 | each | "Vinyl Banner 3x6" |
| Vinyl Banner 4x8 | $85 | each | "Vinyl Banner 4x8" |
| Retractable Banner Stand | $125 | each | "Retractable Banner Stand" |
| X-Frame Banner Stand | $65 | each | "X-Frame Banner Stand" |
| Yard Sign 18x24 | $25 | each | "Yard Sign 18x24" |
| Yard Signs 18x24 — 10 Pack | $175 | 10 signs | "Yard Signs 18x24 — 10 Pack" |
| Yard Signs 18x24 — 25 Pack | $375 | 25 signs | "Yard Signs 18x24 — 25 Pack" |

#### Stickers & Labels
| Product | Price | Unit | Stripe Product Name |
|---------|-------|------|---------------------|
| Stickers — 100 Pack (2") | $45 | 100 stickers | "Stickers — 100 Pack (2\")" |
| Stickers — 250 Pack (2") | $85 | 250 stickers | "Stickers — 250 Pack (2\")" |
| Stickers — 500 Pack (2") | $125 | 500 stickers | "Stickers — 500 Pack (2\")" |
| Stickers — 1000 Pack (2") | $175 | 1000 stickers | "Stickers — 1000 Pack (2\")" |
| Label Sheets — 100 | $35 | 100 labels | "Label Sheets — 100" |
| Label Sheets — 500 | $95 | 500 labels | "Label Sheets — 500" |

#### Flyers & Postcards
| Product | Price | Unit | Stripe Product Name |
|---------|-------|------|---------------------|
| Flyers 8.5x11 — 100 | $45 | 100 flyers | "Flyers 8.5x11 — 100" |
| Flyers 8.5x11 — 500 | $95 | 500 flyers | "Flyers 8.5x11 — 500" |
| Flyers 8.5x11 — 1000 | $145 | 1000 flyers | "Flyers 8.5x11 — 1000" |
| Postcards 4x6 — 250 | $55 | 250 cards | "Postcards 4x6 — 250" |
| Postcards 4x6 — 500 | $85 | 500 cards | "Postcards 4x6 — 500" |
| Postcards 4x6 — 1000 | $125 | 1000 cards | "Postcards 4x6 — 1000" |

#### Signs & Posters
| Product | Price | Unit | Stripe Product Name |
|---------|-------|------|---------------------|
| Foam Board Sign 18x24 | $35 | each | "Foam Board Sign 18x24" |
| Aluminum Sign 18x24 | $55 | each | "Aluminum Sign 18x24" |
| Poster 18x24 | $15 | each | "Poster 18x24" |
| Poster 24x36 | $25 | each | "Poster 24x36" |
| Canvas Print 16x20 | $65 | each | "Canvas Print 16x20" |
| Canvas Print 24x36 | $125 | each | "Canvas Print 24x36" |

#### Vehicle Graphics
| Product | Price | Unit | Stripe Product Name |
|---------|-------|------|---------------------|
| Vehicle Magnet 12x18 | $35 | each | "Vehicle Magnet 12x18" |
| Vehicle Magnet 18x24 | $55 | each | "Vehicle Magnet 18x24" |
| Window Decal — Small | $25 | up to 12" | "Window Decal — Small" |
| Window Decal — Large | $65 | up to 36" | "Window Decal — Large" |
| Vehicle Wrap — Partial | $750 | partial wrap | "Vehicle Wrap — Partial" |
| Vehicle Wrap — Full | $2,500 | full wrap | "Vehicle Wrap — Full" |

#### Apparel
| Product | Price | Unit | Stripe Product Name |
|---------|-------|------|---------------------|
| Custom T-Shirt | $25 | each | "Custom T-Shirt" |
| Custom T-Shirts — 12 Pack | $180 | 12 shirts | "Custom T-Shirts — 12 Pack" |
| Custom T-Shirts — 25 Pack | $325 | 25 shirts | "Custom T-Shirts — 25 Pack" |
| Custom Hoodie | $45 | each | "Custom Hoodie" |
| Custom Hat — Embroidered | $25 | each | "Custom Hat — Embroidered" |
| Custom Hats — 12 Pack | $240 | 12 hats | "Custom Hats — 12 Pack" |

#### Promotional Items
| Product | Price | Unit | Stripe Product Name |
|---------|-------|------|---------------------|
| Custom Pens — 100 Pack | $95 | 100 pens | "Custom Pens — 100 Pack" |
| Custom Notepads — 25 Pack | $125 | 25 pads | "Custom Notepads — 25 Pack" |
| Custom Mugs — 12 Pack | $145 | 12 mugs | "Custom Mugs — 12 Pack" |
| Custom Tote Bags — 25 Pack | $225 | 25 bags | "Custom Tote Bags — 25 Pack" |

---

### 9️⃣ BECOVERED.LIFE INSURANCE PLANS

**Location:** Insurance portal  
**Payment Type:** Recurring subscription  
**Billing Interval:** Monthly or Annual

| Plan | Monthly | Annual | Stripe Product Name |
|------|---------|--------|---------------------|
| BeCovered Basic | $10/mo | $99/yr | "BeCovered Basic" |
| BeCovered Standard | $19/mo | $199/yr | "BeCovered Standard" |
| BeCovered Premium | $39/mo | $399/yr | "BeCovered Premium" |
| BeCovered Elite | $97/mo | $997/yr | "BeCovered Elite" |

---

### 🔟 SAXTAXPRO TAX SERVICES

**Location:** Tax services portal  
**Payment Type:** Recurring subscription  
**Billing Interval:** Monthly or Annual

| Plan | Monthly | Annual | Stripe Product Name |
|------|---------|--------|---------------------|
| SaxtaxPro Basic | $10/mo | $99/yr | "SaxtaxPro Basic" |
| SaxtaxPro Pro | $97/mo | $997/yr | "SaxtaxPro Pro" |
| SaxtaxPro Business | $197/mo | $1,997/yr | "SaxtaxPro Business" |

---

## 🔧 TECHNICAL IMPLEMENTATION

### Stripe Configuration Files

1. **Environment Variables** (`.env.local`)
   ```bash
   STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE  # ⚠️ NEEDS REAL KEY
   STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
   STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
   ```

2. **Stripe Library** (`src/lib/stripe.ts`)
   - V2 Connected Accounts support
   - Thin event webhooks
   - Application fee handling
   - Proper error handling for missing keys

3. **Seed Script** (`scripts/seed-stripe.ts`)
   - Automated product & price creation
   - Upsert logic (won't duplicate)
   - Covers all product categories
   - Ready to run: `npm run seed`

### API Endpoints

| Endpoint | Method | Purpose | Mode |
|----------|--------|---------|------|
| `/api/checkout` | POST | Create subscription checkout | subscription |
| `/api/pay-now` | POST | Create one-time payment | payment |
| `/api/connect/checkout` | POST | Checkout for connected accounts | payment |
| `/api/billing` | POST | Open Stripe billing portal | - |
| `/api/webhooks/stripe` | POST | Handle Stripe webhooks | - |

### Checkout Flow Patterns

**Subscription Services (SMMA, Media, SaaS):**
```typescript
POST /api/checkout
{
  "priceId": "price_xyz...",
  "customerEmail": "client@example.com",
  "successUrl": "/success",
  "cancelUrl": "/cancel"
}
```

**One-Time Payments (Print, Services):**
```typescript
POST /api/pay-now
{
  "priceId": "price_abc...",
  "customerEmail": "client@example.com"
}
```

**Web Services (Hybrid):**
- Setup fee: One-time payment (`/api/pay-now`)
- Monthly hosting: Recurring subscription (`/api/checkout`)
- Alternative: Bundle as subscription with setup fee in Stripe

---

## 📋 STRIPE CLI/MCP SETUP CHECKLIST

### Step 1: Get Stripe API Keys
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Copy **Secret Key** (starts with `sk_test_` or `sk_live_`)
3. Copy **Publishable Key** (starts with `pk_test_` or `pk_live_`)
4. Update `.env.local` file with real keys

### Step 2: Install Stripe CLI
```bash
# macOS
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Test connection
stripe products list
```

### Step 3: Run Seed Script
```bash
cd pitchmarketing-agency-app
npm run seed
```

This will create:
- ✅ 70+ products in Stripe
- ✅ 120+ prices (monthly, annual, one-time)
- ✅ All categories organized

### Step 4: Set Up Webhooks
```bash
# Listen for webhooks locally
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Copy webhook secret and add to .env.local
# STRIPE_WEBHOOK_SECRET=whsec_...
```

### Step 5: Test Payments
```bash
# Test card numbers
# Success: 4242 4242 4242 4242
# Decline: 4000 0000 0000 0002
# 3D Secure: 4000 0025 0000 3155
```

### Step 6: Connect Stripe MCP (Optional)
If using Model Context Protocol for Stripe:
```bash
# Configure MCP server
{
  "stripe": {
    "command": "stripe",
    "args": ["listen", "--api-key", "sk_test_..."],
    "env": {
      "STRIPE_API_KEY": "sk_test_..."
    }
  }
}
```

---

## 💰 REVENUE PROJECTIONS

### Monthly Recurring Revenue Potential

**If you sold 1 of each subscription tier:**
- SMMA: $997 + $1,997 + $3,997 = $6,991/mo
- Consulting: $1,497/mo
- Media Production: $797 + $1,997 + $3,497 = $6,291/mo
- Web Hosting: $75 + $125 + $175 = $375/mo
- SaaS (LEVEL10): $39 + $79 + $149 + $249 = $516/mo
- Add-ons: $15 + $29 + $149 = $193/mo

**Total MRR:** ~$16,863/mo per complete customer set

### One-Time Payment Opportunities

**Average ticket sizes:**
- Web Services: $499 - $7,997 (avg ~$2,500)
- Agency Services: $97 - $3,500 (avg ~$800)
- Print Products: $15 - $2,500 (avg ~$150)
- Consulting: $497 - $2,997 (avg ~$1,500)

---

## 🚀 NEXT STEPS

### Immediate Actions Required:
1. ✅ Replace placeholder Stripe keys in `.env.local`
2. ✅ Run `npm run seed` to populate Stripe catalog
3. ✅ Set up webhook endpoint and secret
4. ✅ Test checkout flow with test cards
5. ✅ Configure success/cancel URLs
6. ✅ Add proper error handling UI

### Future Enhancements:
- [ ] Add price IDs to frontend pricing components
- [ ] Implement dynamic price fetching from Stripe
- [ ] Add subscription upgrade/downgrade flows
- [ ] Implement usage-based billing for SMS bundles
- [ ] Add promotional code functionality
- [ ] Set up abandoned cart recovery
- [ ] Implement customer portal for subscription management
- [ ] Add invoice generation and delivery
- [ ] Configure tax collection with Stripe Tax

---

## 📞 SUPPORT & RESOURCES

**Stripe Dashboard:** https://dashboard.stripe.com  
**Stripe Docs:** https://stripe.com/docs  
**Stripe CLI Docs:** https://stripe.com/docs/stripe-cli  
**Test Cards:** https://stripe.com/docs/testing  

**Agency Contact:**
- Email: solutions@pitchmarketing.agency
- Website: http://localhost:3000
- Phone: +1 (760) 616-9587

---

**Document Version:** 1.0  
**Last Updated:** January 12, 2026  
**Maintained By:** GitHub Copilot for Pitch Market Strategies & Public Relations, LLC
