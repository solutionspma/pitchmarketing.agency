import { NextResponse } from "next/server";
import { stripe, isStripeReady } from "@/lib/stripe";

export async function POST() {
  if (!isStripeReady() || !stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }
  
  try {
    const link = await stripe.paymentLinks.create({
      line_items: [{ price: "price_XXXX", quantity: 1 }],
    });
    return NextResponse.json({ url: link.url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
