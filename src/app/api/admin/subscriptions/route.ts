import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET() {
  const subs = await stripe.subscriptions.list({
    expand: ["data.customer", "data.items.data.price.product"],
  });

  return NextResponse.json({ subs: subs.data });
}
