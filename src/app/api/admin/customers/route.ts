import { NextResponse } from "next/server";
import { stripe, isStripeReady } from "@/lib/stripe";

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!isStripeReady() || !stripe) {
    return NextResponse.json({ 
      customers: [],
      message: "Stripe not configured. Add your API keys to .env.local" 
    });
  }
  
  try {
    const customers = await stripe.customers.list({ limit: 100 });
    return NextResponse.json({ customers: customers.data });
  } catch (error) {
    return NextResponse.json({ customers: [], error: "Failed to fetch customers" });
  }
}
