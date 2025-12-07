import { NextResponse } from "next/server";
import { stripe, isStripeReady } from "@/lib/stripe";

export async function POST(req: Request) {
  if (!isStripeReady() || !stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }
  
  try {
    const { customerId, returnUrl } = await req.json();

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl || `${process.env.NEXT_PUBLIC_URL}/dashboard`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
