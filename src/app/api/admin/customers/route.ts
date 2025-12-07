import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET() {
  const customers = await stripe.customers.list({ limit: 100 });
  return NextResponse.json({ customers: customers.data });
}
