# Pitch Marketing Agency - Project Overview

**Live Site:** https://pitchmarketing.agency  
**Deploy Date:** December 16, 2025  
**Owner:** Jason Harris  
**Framework:** Next.js 14.0.4  
**Hosting:** Netlify

---

## About Jason Harris

**Background:**
- Grew up in Greenville, South Carolina
- Parents: Mother (choir singer, poet), Father (recording artist, painter)
- Music production and entertainment industry veteran

**Notable Achievements:**
- Created "Welcome Home Louisiana" TV program
- Worked with Lil Duval, Mike Epps, Boosie, Webbie, No Limit Records
- Appeared on Food Network's "Mystery Diners"
- Featured in "Cody the Robosapien" film
- Elevated Rollin Homes marketing (millions in sales increase)

---

## Site Features

### Core Pages
1. **Homepage** - Hero with Pexels imagery, service cards, stats
2. **About** - Jason's authentic story with personal photo
3. **Services** - Full service catalog
4. **Pricing** - SMMA & Consulting retainer packages ($497-$3997/mo)
5. **Book** - Single 15-min free discovery call booking
6. **Print Shop** - Retail print services
7. **Platforms** - SaaS products showcase
8. **Contact** - Multiple contact options
9. **CRM Suite** - Dashboard, clients, bookings, analytics

### Key Functionality
- **Booking System:** Supabase-powered, weekday 9AM-5PM availability
- **CRM:** Client management, booking tracking, analytics
- **Pexels Integration:** Dynamic imagery throughout site
- **Mobile Optimized:** Fixed hamburger menu, responsive layouts
- **Dark Theme:** Pitch-black (#0A0A0A) with gold accents (#F5A623)

---

## Design System

**Colors:**
- `pitch-black`: #0A0A0A
- `pitch-dark`: #1A1A1A
- `pitch-gold`: #F5A623

**Typography:**
- Bold, modern sans-serif
- Gold highlights for emphasis
- High contrast for readability

**Layout:**
- Fixed navbar with backdrop blur
- Responsive grid systems
- Mobile-first approach

---

## Technical Stack

### Frontend
- Next.js 14.0.4 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Image optimization with Next/Image

### Backend/Services
- Supabase (Database, Auth)
- SendGrid (Email notifications)
- Pexels API (Stock imagery)
- Stripe (Payment processing - pending setup)

### Deployment
- Netlify (Production)
- Automatic builds from main branch
- Environment variables configured

---

## Project Structure

```
pitchmarketing-agency-app/
├── src/
│   ├── app/
│   │   ├── page.tsx (Homepage)
│   │   ├── about/page.tsx (Jason's story)
│   │   ├── book/page.tsx (Booking wizard)
│   │   ├── pricing/page.tsx (Retainer packages)
│   │   ├── crm/ (CRM dashboard)
│   │   ├── api/ (Backend routes)
│   │   └── ...
│   ├── components/
│   │   ├── Navbar.tsx (Mobile-fixed menu)
│   │   ├── Hero.tsx (Homepage hero)
│   │   ├── ServiceCards.tsx (Services grid)
│   │   ├── PexelsImage.tsx (Dynamic images)
│   │   └── ...
│   └── lib/
│       ├── supabase.ts
│       ├── pexels.ts
│       └── stripe.ts
├── public/
│   ├── logo.png
│   └── jaFullSizeRender10.jpg (Jason's photo)
├── .env.local (API keys)
└── package.json
```

---

## Database Schema (Supabase)

### Clients Table
```sql
- id (uuid)
- created_at (timestamp)
- name (text)
- email (text)
- phone (text)
- company (text)
- industry (text)
- notes (text)
```

### Bookings Table
```sql
- id (uuid)
- created_at (timestamp)
- name (text)
- email (text)
- phone (text)
- meeting_type (text)
- date (text)
- time (text)
- notes (text)
```

---

## Recent Fixes & Improvements

### December 16, 2025
1. **About Page Content** - Rewrote with authentic Jason Harris story
2. **Booking Page** - Simplified to single 15-min free consultation
3. **Pricing Page** - Restructured for SMMA & Consulting retainer packages
4. **Mobile Menu** - Fixed hamburger toggle, added X icon when open
5. **Mobile Spacing** - Optimized about page layout for portrait view
6. **Pexels Integration** - Added dynamic imagery across all pages
7. **API Keys** - Configured all environment variables

---

## Next Steps / Future Enhancements

### High Priority
- [ ] Add Stripe API keys and configure payment processing
- [ ] Build retail print shop with shopping cart
- [ ] Integrate design studio (Canvas/Figma-style editor)
- [ ] Set up SendGrid templates for booking confirmations

### Medium Priority
- [ ] Add client portal with login
- [ ] Create automated marketing funnels
- [ ] Implement AI chatbot integration
- [ ] Add portfolio/case studies section

### Nice to Have
- [ ] Blog/content section
- [ ] Video testimonials
- [ ] Live chat support
- [ ] Advanced analytics dashboard

---

## Support & Maintenance

**Deployment Command:**
```bash
cd pitchmarketing-agency-app
npm run build
npx netlify-cli deploy --prod
```

**Local Development:**
```bash
npm run dev
# Open http://localhost:3000
```

**Environment Variables:**
All stored in `.env.local` - see API-CREDENTIALS.md

---

**Last Updated:** December 16, 2025
