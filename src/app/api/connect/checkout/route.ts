import { NextResponse } from "next/server";
import { stripeClient, isStripeReady, ROOT_URL, calculateApplicationFee } from "@/lib/stripe";

export const dynamic = 'force-dynamic';

/**
 * CREATE CHECKOUT SESSION (Direct Charge)
 * Creates a checkout session for purchasing from a connected account
 * Uses direct charges with application fee
 * 
 * POST /api/connect/checkout
 * Body: { accountId: string, priceId: string, quantity?: number }
 */
export async function POST(req: Request) {
  if (!isStripeReady() || !stripeClient) {
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 503 }
    );
  }

  try {
    const { accountId, priceId, quantity = 1 } = await req.json();

    if (!accountId || !priceId) {
      return NextResponse.json(
        { error: "accountId and priceId are required" },
        { status: 400 }
      );
    }

    // First, get the price to calculate application fee
    const price = await stripeClient.prices.retrieve(priceId, {
      stripeAccount: accountId,
    });

    // Calculate application fee (5% of total)
    const applicationFee = calculateApplicationFee(
      (price.unit_amount || 0) * quantity
    );

    /**
     * Create checkout session with direct charge
     * payment_intent_data.application_fee_amount monetizes the transaction
     */
    const session = await stripeClient.checkout.sessions.create(
      {
        mode: "payment",
        line_items: [
          {
            price: priceId,
            quantity,
          },
        ],
        payment_intent_data: {
          // Application fee goes to the platform
          application_fee_amount: applicationFee,
        },
        success_url: `${ROOT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${ROOT_URL}/cancel`,
      },
      {
        stripeAccount: accountId, // Direct charge on connected account
      }
    );

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (err: any) {
    console.error("Error creating checkout session:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
}
