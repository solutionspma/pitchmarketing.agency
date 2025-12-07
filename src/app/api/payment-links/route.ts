import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST() {
  const link = await stripe.paymentLinks.create({
    line_items: [{ price: "price_XXXX", quantity: 1 }],
  });

  return NextResponse.json({ url: link.url });
}
