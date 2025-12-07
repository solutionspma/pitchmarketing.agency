import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const customerId = searchParams.get("customerId");

  if (!customerId) {
    return NextResponse.json({ error: "Missing customerId" }, { status: 400 });
  }

  const subs = await stripe.subscriptions.list({
    customer: customerId,
    expand: ["data.items.data.price.product"],
  });

  return NextResponse.json({ subscriptions: subs.data });
}
