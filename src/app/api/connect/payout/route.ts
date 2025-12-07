import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
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
