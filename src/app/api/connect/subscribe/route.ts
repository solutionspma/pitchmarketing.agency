import { NextResponse } from "next/server";
import { stripeClient, isStripeReady, ROOT_URL, getPlatformPriceId } from "@/lib/stripe";

export const dynamic = 'force-dynamic';

/**
 * CREATE SUBSCRIPTION FOR PLATFORM USER
 * Creates a subscription checkout session for a platform subscription
 * 
 * POST /api/connect/subscribe
 * Body: { customerId?: string, priceId?: string, email: string }
 */
export async function POST(req: Request) {
  if (!isStripeReady() || !stripeClient) {
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 503 }
    );
  }

  try {
    const { customerId, priceId, email } = await req.json();

    // Use provided priceId or fall back to platform price
    const subscriptionPriceId = priceId || getPlatformPriceId();

    if (!subscriptionPriceId) {
      return NextResponse.json(
        { error: "No subscription price configured. Set STRIPE_PLATFORM_PRICE_ID in environment." },
        { status: 400 }
      );
    }

    /**
     * Create subscription checkout session
     * If customerId provided, attach to existing customer
     * Otherwise, let Stripe create new customer from email
     */
    const sessionParams: any = {
      mode: "subscription",
      line_items: [
        {
          price: subscriptionPriceId,
          quantity: 1,
        },
      ],
      success_url: `${ROOT_URL}/dashboard/subscribed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${ROOT_URL}/dashboard`,
    };

    if (customerId) {
      sessionParams.customer = customerId;
    } else if (email) {
      sessionParams.customer_email = email;
    }

    const session = await stripeClient.checkout.sessions.create(sessionParams);

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (err: any) {
    console.error("Error creating subscription:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
}
