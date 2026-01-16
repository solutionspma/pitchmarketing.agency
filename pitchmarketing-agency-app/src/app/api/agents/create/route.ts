import { NextResponse } from "next/server";
import { stripe, isStripeReady } from "@/lib/stripe";

export async function POST() {
  if (!isStripeReady() || !stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }
  
  try {
    const account = await stripe.accounts.create({
      type: "express",
    });

    const link = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.NEXT_PUBLIC_URL}/agent/onboarding`,
      return_url: `${process.env.NEXT_PUBLIC_URL}/agent/complete`,
      type: "account_onboarding",
    });

    return NextResponse.json({ accountId: account.id, url: link.url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
