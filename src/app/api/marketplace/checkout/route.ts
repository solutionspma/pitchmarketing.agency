import { NextResponse } from "next/server";
import { stripe, isStripeReady } from "@/lib/stripe";

export async function POST(req: Request) {
  if (!isStripeReady() || !stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }
  
  try {
    const { priceId, agentAccountId, commissionPercent, customerEmail, orgId } = await req.json();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: customerEmail,
      line_items: [{ price: priceId, quantity: 1 }],
      payment_intent_data: {
        application_fee_amount: Math.round(commissionPercent * 100),
        transfer_data: {
          destination: agentAccountId,
        },
      },
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
      metadata: {
        org_id: orgId || "",
        agent_account_id: agentAccountId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
