import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET() {
  const products = await stripe.products.list({
    active: true,
    limit: 100,
    expand: ["data.default_price"],
  });

  const prices = await stripe.prices.list({
    active: true,
    limit: 100,
    expand: ["data.product"],
  });

  return NextResponse.json({
    products: products.data,
    prices: prices.data,
  });
}
