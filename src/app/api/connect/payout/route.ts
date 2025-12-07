import { NextResponse } from "next/server";
import { stripe, isStripeReady } from "@/lib/stripe";

export async function POST(req: Request) {
  if (!isStripeReady() || !stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }
  
  try {
    const { accountId, amount, memo } = await req.json();

    const payout = await stripe.transfers.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      destination: accountId,
      description: memo,
    });

    return NextResponse.json({ payout });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
