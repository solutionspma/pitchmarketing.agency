import { NextResponse } from "next/server";
import { stripe, isStripeReady } from "@/lib/stripe";

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!isStripeReady() || !stripe) {
    return NextResponse.json({ subs: [], message: "Stripe not configured" });
  }
  
  try {
    const subs = await stripe.subscriptions.list({
      expand: ["data.customer", "data.items.data.price.product"],
    });
    return NextResponse.json({ subs: subs.data });
  } catch (error) {
    return NextResponse.json({ subs: [], error: "Failed to fetch subscriptions" });
  }
}
