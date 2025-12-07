import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST() {
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
}
