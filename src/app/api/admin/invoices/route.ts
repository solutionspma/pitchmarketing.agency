import { NextResponse } from "next/server";
import { stripe, isStripeReady } from "@/lib/stripe";

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!isStripeReady() || !stripe) {
    return NextResponse.json({ invoices: [], message: "Stripe not configured" });
  }
  
  try {
    const invoices = await stripe.invoices.list({
      limit: 100,
      expand: ["data.customer"],
    });
    return NextResponse.json({ invoices: invoices.data });
  } catch (error) {
    return NextResponse.json({ invoices: [], error: "Failed to fetch invoices" });
  }
}
