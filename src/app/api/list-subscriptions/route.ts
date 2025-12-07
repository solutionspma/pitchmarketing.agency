import { NextResponse } from "next/server";
import { stripe, isStripeReady } from "@/lib/stripe";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  if (!isStripeReady() || !stripe) {
    return NextResponse.json({ subscriptions: [], message: "Stripe not configured" });
  }
  
  const { searchParams } = new URL(req.url);
  const customerId = searchParams.get("customerId");

  if (!customerId) {
    return NextResponse.json({ error: "Missing customerId" }, { status: 400 });
  }

  try {
    const subs = await stripe.subscriptions.list({
      customer: customerId,
      expand: ["data.items.data.price.product"],
    });
    return NextResponse.json({ subscriptions: subs.data });
  } catch (error: any) {
    return NextResponse.json({ subscriptions: [], error: error.message });
  }
}
