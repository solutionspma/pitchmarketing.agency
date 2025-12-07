import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET() {
  const invoices = await stripe.invoices.list({
    limit: 100,
    expand: ["data.customer"],
  });

  return NextResponse.json({ invoices: invoices.data });
}
