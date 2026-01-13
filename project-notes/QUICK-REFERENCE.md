# Quick Reference Guide

## Essential Commands

### Local Development
```bash
cd pitchmarketing-agency-app
npm run dev
# Site: http://localhost:3000
```

### Build & Deploy
```bash
# Build locally
npm run build

# Deploy to production
npx netlify-cli deploy --prod

# Deploy to preview
npx netlify-cli deploy
```

### Database Management
```bash
# Access Supabase Dashboard
# URL: https://supabase.com/dashboard/project/uksjnwnvarhldlxyymef
```

---

## File Locations

### Key Pages
- Homepage: `src/app/page.tsx`
- About: `src/app/about/page.tsx`
- Booking: `src/app/book/page.tsx`
- Pricing: `src/app/pricing/page.tsx`
- CRM Dashboard: `src/app/crm/page.tsx`

### Components
- Navbar: `src/components/Navbar.tsx`
- Hero: `src/components/Hero.tsx`
- Service Cards: `src/components/ServiceCards.tsx`
- Footer: `src/components/Footer.tsx`

### API Routes
- Pexels Search: `src/app/api/pexels/search/route.ts`
- Booking Confirm: `src/app/api/book/confirm/route.ts`
- Stripe Webhooks: `src/app/api/webhooks/stripe/route.ts`

### Configuration
- Environment: `.env.local`
- Next Config: `next.config.js`
- Tailwind: `tailwind.config.js`
- TypeScript: `tsconfig.json`

### Assets
- Logo: `public/logo.png`
- Jason's Photo: `public/jaFullSizeRender10.jpg`

---

## Common Tasks

### Add a New Page
1. Create file: `src/app/new-page/page.tsx`
2. Add to navbar: `src/components/Navbar.tsx`
3. Build and test: `npm run dev`
4. Deploy: `npx netlify-cli deploy --prod`

### Update About Page Content
- Edit: `src/app/about/page.tsx`
- Jason's info in the hero section
- Story in the prose section

### Modify Pricing Packages
- Edit: `src/app/pricing/page.tsx`
- Update `RETAINER_PACKAGES` array
- Update `CONSULTING_PACKAGES` array

### Add New Service
- Edit: `src/components/ServiceCards.tsx`
- Add to `services` array with:
  - title, desc, link, icon, image

### Change Colors
- Edit: `tailwind.config.js`
- Update theme.extend.colors
- Rebuild: `npm run build`

---

## API Quick Reference

### Pexels API
```javascript
// Fetch images
const response = await fetch(
  `/api/pexels/search?query=marketing&per_page=5`
);
const data = await response.json();
```

### Supabase Client
```javascript
import { supabase } from '@/lib/supabase';

// Insert booking
const { data, error } = await supabase
  .from('bookings')
  .insert([{ name, email, phone, date, time }]);

// Query clients
const { data, error } = await supabase
  .from('clients')
  .select('*')
  .order('created_at', { ascending: false });
```

### OpenAI (Future)
```javascript
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Your prompt' }]
  })
});
```

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Environment Variables Not Working
```bash
# Check .env.local exists
cat .env.local

# Restart dev server
npm run dev
```

### Image Not Loading
- Check file exists in `public/` folder
- Verify path starts with `/` (e.g., `/logo.png`)
- Clear browser cache

### Supabase Connection Issues
- Verify keys in `.env.local`
- Check RLS policies in Supabase dashboard
- Ensure tables exist

### Mobile Menu Stuck
- Check `useState` initialization
- Verify `onClick` handlers on all links
- Test toggle functionality

---

## Design Tokens

### Colors (Hex)
```
#0A0A0A - pitch-black (backgrounds)
#1A1A1A - pitch-dark (cards)
#F5A623 - pitch-gold (accents)
```

### Colors (Tailwind)
```
bg-pitch-black
bg-pitch-dark
text-pitch-gold
border-white/10
```

### Shadows
```css
shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1)
shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)
```

---

## Contact Information

**Owner:** Jason Harris  
**Email:** solutions@pitchmarketing.agency  
**Site:** https://pitchmarketing.agency  
**Deploy Platform:** Netlify  
**Database:** Supabase  

---

## Important Notes

⚠️ **Never commit `.env.local`** - Contains sensitive API keys  
⚠️ **Always test locally** before deploying to production  
⚠️ **Backup Supabase** data regularly  
⚠️ **Check mobile responsiveness** on real devices  

✅ **Logo always links to homepage**  
✅ **Mobile menu auto-closes on link click**  
✅ **All images optimized with Next/Image**  
✅ **Dark theme throughout for premium feel**  

---

**Last Updated:** December 16, 2025
