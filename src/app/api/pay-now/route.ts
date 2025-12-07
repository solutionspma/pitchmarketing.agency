import { NextResponse } from "next/server";
import { stripe, isStripeReady } from "@/lib/stripe";

export async function POST(req: Request) {
  if (!isStripeReady() || !stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }
  
  try {
    const { priceId, customerEmail, orgId, metadata } = await req.json();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: customerEmail,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_URL}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
      metadata: {
        org_id: orgId || "",
        ...metadata,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
