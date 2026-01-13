import { NextResponse } from "next/server";
import { stripeClient, isStripeReady, ROOT_URL } from "@/lib/stripe";

export const dynamic = 'force-dynamic';

/**
 * CREATE BILLING PORTAL SESSION
 * Creates a billing portal session for customer subscription management
 * 
 * POST /api/connect/billing-portal
 * Body: { customerId: string }
 */
export async function POST(req: Request) {
  if (!isStripeReady() || !stripeClient) {
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 503 }
    );
  }

  try {
    const { customerId } = await req.json();

    if (!customerId) {
      return NextResponse.json(
        { error: "customerId is required" },
        { status: 400 }
      );
    }

    /**
     * Create billing portal session for customer
     */
    const session = await stripeClient.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${ROOT_URL}/dashboard`,
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (err: any) {
    console.error("Error creating billing portal session:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
}
