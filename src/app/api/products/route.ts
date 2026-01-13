import { NextResponse } from "next/server";
import { stripe, isStripeReady } from "@/lib/stripe";

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!isStripeReady() || !stripe) {
    return NextResponse.json({ 
      products: [], 
      prices: [],
      message: "Stripe not configured. Add your API keys to .env.local" 
    });
  }
  
  try {
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
  } catch (error) {
    return NextResponse.json({ products: [], prices: [], error: "Failed to fetch products" });
  }
}
