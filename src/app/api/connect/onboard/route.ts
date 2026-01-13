import { NextResponse } from "next/server";
import { stripeClient, isStripeReady, ROOT_URL } from "@/lib/stripe";

export const dynamic = 'force-dynamic';

/**
 * CREATE ACCOUNT ONBOARDING LINK
 * Generates a Stripe Account Link for connected account onboarding
 * 
 * POST /api/connect/onboard
 * Body: { accountId: string }
 */
export async function POST(req: Request) {
  if (!isStripeReady() || !stripeClient) {
    return NextResponse.json(
      { error: "Stripe not configured. Please add your Stripe API keys." },
      { status: 503 }
    );
  }

  try {
    const { accountId } = await req.json();

    if (!accountId) {
      return NextResponse.json(
        { error: "accountId is required" },
        { status: 400 }
      );
    }

    /**
     * Create Account Link for onboarding
     * This redirects the user to Stripe's hosted onboarding flow
     */
    const accountLink = await stripeClient.accountLinks.create({
      account: accountId,
      refresh_url: `${ROOT_URL}/dashboard/onboarding/refresh?account=${accountId}`,
      return_url: `${ROOT_URL}/dashboard/onboarding/complete?account=${accountId}`,
      type: "account_onboarding",
    });

    return NextResponse.json({
      url: accountLink.url,
      expiresAt: accountLink.expires_at,
    });
  } catch (err: any) {
    console.error("Error creating account link:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
}
