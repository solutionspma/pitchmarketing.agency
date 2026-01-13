# Feature Specifications

## Booking System

### Overview
Simple 3-step booking wizard for free 15-minute discovery calls.

### Flow
1. **Meeting Type Selection**
   - Single option: "Free Discovery Call"
   - Duration: 15 minutes
   - Description: "Quick intro call to discuss your needs"

2. **Date & Time Selection**
   - Available: Monday - Friday
   - Hours: 9:00 AM - 5:00 PM
   - 15-minute intervals
   - No weekend availability

3. **Contact Information**
   - Name (required)
   - Email (required)
   - Phone (required)
   - Additional notes (optional)

### Database Storage
**Table:** `bookings`
```sql
{
  id: uuid,
  created_at: timestamp,
  name: text,
  email: text,
  phone: text,
  meeting_type: "Free Discovery Call",
  date: "YYYY-MM-DD",
  time: "HH:MM AM/PM",
  notes: text
}
```

### Email Notifications
- **To Client:** Confirmation email with booking details
- **To Jason:** Notification of new booking
- **Service:** SendGrid (pending template setup)

---

## CRM Suite

### Dashboard (`/crm`)
**Features:**
- Total clients count
- Total bookings count
- Monthly revenue (placeholder)
- Active projects count
- Recent activity feed
- Quick actions

**Layout:**
- Dark theme (#0A0A0A)
- Sidebar navigation
- Stats cards with icons
- Gold accent highlights

### Clients Management (`/crm/clients`)
**Features:**
- Client list with search
- Add new client form
- Client details view
- Email/phone contact info
- Company & industry tracking
- Notes field

**Actions:**
- Add Client
- Edit Client
- View Details
- Send Email
- Delete Client

### Bookings Management (`/crm/bookings`)
**Features:**
- All bookings list
- Filter by date range
- Search by client name
- Booking status tracking
- Meeting type display

**Actions:**
- View Details
- Mark Complete
- Reschedule
- Cancel Booking

### Analytics (`/crm/analytics`)
**Features:**
- Booking trends chart
- Client acquisition over time
- Revenue tracking
- Conversion metrics
- Export reports

---

## Pricing Packages

### SMMA (Social Media Marketing Agency)

#### Starter - $997/month
- 2 Social Platforms Managed
- 12 Posts Per Month
- Basic Analytics Report
- Monthly Strategy Call
- Email Support
- Content Calendar

#### Growth - $1,997/month (Most Popular)
- 4 Social Platforms Managed
- 20 Posts Per Month
- Advanced Analytics Dashboard
- Bi-Weekly Strategy Calls
- Paid Ad Management ($500 ad spend)
- Community Management
- Story & Reel Creation
- Priority Support

#### Dominate - $3,997/month
- Unlimited Platforms
- 30+ Posts Per Month
- Real-time Analytics & Reporting
- Weekly Strategy Calls
- Paid Ad Management ($2,000 ad spend)
- Influencer Outreach
- Video Content Production
- Dedicated Account Manager
- 24/7 Priority Support

### Consulting

#### Strategy Session - $497 (One-time)
- 90-Minute Video Call
- Pre-Session Questionnaire
- Recorded Session
- Action Plan Document
- 7-Day Email Follow-up

#### Monthly Consulting - $997/month
- 2 Calls Per Month (60 min each)
- Email Support
- Strategy Documents
- Resource Library Access
- Quarterly Business Review

#### Intensive Package - $2,997 (One-time)
- Full Day (6-8 Hours)
- Complete Business Audit
- Brand Strategy Session
- Marketing Plan Creation
- Implementation Roadmap
- 30-Day Follow-up Support
- All Materials & Recordings

---

## Pexels Integration

### API Configuration
**Endpoint:** `/api/pexels/search`
**Method:** GET
**Parameters:**
- `query`: Search term
- `per_page`: Number of results (default: 10)

**Caching:** 1 hour revalidation

### Implementation Locations

1. **Homepage Hero**
   - Query: "creative marketing branding"
   - Usage: Background with gradient overlay
   - Opacity: 20%

2. **Service Cards**
   - Web Development: "coding workspace computer"
   - Branding: "creative design branding"
   - Video Production: "video production studio"
   - Marketing: "digital marketing strategy"
   - Print Shop: "printing press machine"
   - SaaS: "modern technology workspace"

3. **About Page**
   - Achievements section background
   - Query: "creative team workspace"
   - Opacity: 10%

4. **Pricing Page**
   - Page background
   - Query: "business growth strategy"
   - Opacity: 5%

### Component: `PexelsImage`
**Props:**
- `query`: Search term
- `alt`: Alt text
- `className`: CSS classes
- `width`: Image width
- `height`: Image height
- `priority`: Next.js priority loading
- `fallbackUrl`: Fallback image if API fails

---

## Mobile Optimization

### Navigation
- Hamburger menu (☰) on mobile
- Transforms to X (✕) when open
- Auto-closes on link click
- Fixed position with backdrop blur
- z-index: 50

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### About Page Mobile Layout
- Text-first layout (content before image)
- Reduced padding (pt-24 instead of pt-32)
- Smaller typography
- Hidden decorative elements
- Tighter spacing (gap-8 vs gap-12)

### Touch Targets
- Minimum 44x44px for buttons
- Increased padding on mobile CTAs
- Larger tap areas for menu items

---

## Design System

### Colors
```css
--pitch-black: #0A0A0A;
--pitch-dark: #1A1A1A;
--pitch-gold: #F5A623;
--white-10: rgba(255, 255, 255, 0.1);
--white-20: rgba(255, 255, 255, 0.2);
--white-30: rgba(255, 255, 255, 0.3);
```

### Typography Scale
- Hero: 5xl - 6xl (3rem - 3.75rem)
- H1: 4xl - 5xl (2.25rem - 3rem)
- H2: 3xl - 4xl (1.875rem - 2.25rem)
- H3: xl - 2xl (1.25rem - 1.5rem)
- Body: base - lg (1rem - 1.125rem)
- Small: sm (0.875rem)

### Spacing Scale
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 3rem (48px)

### Border Radius
- sm: 0.5rem (8px)
- md: 0.75rem (12px)
- lg: 1rem (16px)
- xl: 1.5rem (24px)
- 2xl: 2rem (32px)

---

## Component Library

### Navbar
- Fixed position, full width
- Backdrop blur effect
- Logo + brand name
- Desktop: horizontal menu
- Mobile: hamburger drawer
- CTA: "Book a Call" button

### Hero
- Full-width background image
- Gradient overlay
- Centered content
- Primary + secondary CTA
- Stats grid (4 metrics)

### Service Cards
- Grid layout (1-2-3 columns)
- Image background with gradient
- Icon overlay
- Hover effects (scale, border color)
- Links to relevant pages

### PricingTable
- Tab toggle (SMMA vs Consulting)
- 3-column grid for packages
- "Most Popular" badge
- Feature lists with checkmarks
- CTA links to booking

### Footer
- 4-column layout
- Logo + description
- Navigation links
- Contact info
- Social media icons
- Copyright notice

---

**Last Updated:** December 16, 2025
