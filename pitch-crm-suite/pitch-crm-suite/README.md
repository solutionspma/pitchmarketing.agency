# Pitch CRM Suite

A complete CRM and booking system for Pitch Marketing Agency.

## Features

- 📅 **Booking System** - Client scheduling and meeting management
- 👥 **Client Management** - Track clients, sessions, and subscriptions
- 💳 **Stripe Integration** - Billing, subscriptions, and invoices
- 📧 **Email Notifications** - Automated confirmations and reminders
- 🤖 **AI Assistant** - GPT-powered client insights
- 📊 **Analytics** - Track events and conversions

## Quick Start

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Configure Environment

\`\`\`bash
cp .env.example .env
# Edit .env with your credentials
\`\`\`

### 3. Setup Supabase

Run the SQL in \`supabase-schema.sql\` in your Supabase SQL editor.

### 4. Deploy to Netlify

\`\`\`bash
netlify login
netlify init
netlify deploy --prod
\`\`\`

## Project Structure

\`\`\`
pitch-crm-suite/
├── book/                 # Booking frontend
│   ├── index.html
│   └── assets/
├── crm/                  # CRM backend modules
│   ├── auth/            # Authentication
│   ├── billing/         # Stripe integration
│   ├── clients/         # Client management
│   ├── meetings/        # Booking logic
│   ├── notifications/   # Email system
│   ├── ai/              # OpenAI integration
│   ├── dashboard/       # Stats & metrics
│   ├── admin/           # Admin functions
│   └── analytics/       # Event tracking
├── supabase-schema.sql  # Database schema
├── netlify.toml         # Netlify config
└── package.json
\`\`\`

## Environment Variables

| Variable | Description |
|----------|-------------|
| \`SUPABASE_URL\` | Supabase project URL |
| \`SUPABASE_ANON_KEY\` | Supabase anonymous key |
| \`SUPABASE_SERVICE_ROLE_KEY\` | Supabase service role key |
| \`STRIPE_SECRET_KEY\` | Stripe secret key |
| \`OPENAI_API_KEY\` | OpenAI API key |
| \`GMAIL_USER\` | Gmail address for notifications |
| \`GMAIL_PASS\` | Gmail app password |

## License

MIT © Pitch Marketing Agency
