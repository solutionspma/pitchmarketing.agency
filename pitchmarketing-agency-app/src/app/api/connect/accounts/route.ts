import { NextResponse } from "next/server";
import { stripeClient, isStripeReady, ROOT_URL } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

/**
 * CREATE CONNECTED ACCOUNT
 * Creates a new Stripe Connect account
 * 
 * POST /api/connect/accounts
 * Body: { display_name: string, contact_email: string, user_id?: string }
 */
export async function POST(req: Request) {
  if (!isStripeReady() || !stripeClient) {
    return NextResponse.json(
      { error: "Stripe not configured. Please add your Stripe API keys." },
      { status: 503 }
    );
  }

  try {
    const { display_name, contact_email, user_id } = await req.json();

    if (!display_name || !contact_email) {
      return NextResponse.json(
        { error: "display_name and contact_email are required" },
        { status: 400 }
      );
    }

    /**
     * Create Express connected account
     * Express accounts use Stripe's hosted onboarding and dashboard
     */
    const account = await stripeClient.accounts.create({
      type: 'express',
      email: contact_email,
      business_profile: {
        name: display_name,
      },
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      metadata: {
        user_id: user_id || '',
        display_name,
      },
    });

    // If user_id provided and Supabase is configured, store the mapping
    if (user_id && supabaseAdmin) {
      await supabaseAdmin.from("stripe_accounts").upsert({
        user_id,
        stripe_account_id: account.id,
        display_name,
        contact_email,
        created_at: new Date().toISOString(),
      });
    }

    return NextResponse.json({ 
      accountId: account.id,
      account,
    });
  } catch (err: any) {
    console.error("Error creating connected account:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
}

/**
 * GET ACCOUNT STATUS
 * Retrieves account status including onboarding progress
 * 
 * GET /api/connect/accounts?accountId=acct_xxx
 */
export async function GET(req: Request) {
  if (!isStripeReady() || !stripeClient) {
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 503 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const accountId = searchParams.get("accountId");

    if (!accountId) {
      return NextResponse.json(
        { error: "accountId is required" },
        { status: 400 }
      );
    }

    /**
     * Retrieve account with full details
     */
    const account = await stripeClient.accounts.retrieve(accountId);

    // Check if account is ready to process payments
    const readyToProcessPayments = 
      account.charges_enabled && account.payouts_enabled;

    // Check onboarding status from requirements
    const hasCurrentlyDue = (account.requirements?.currently_due?.length || 0) > 0;
    const hasPastDue = (account.requirements?.past_due?.length || 0) > 0;
    const onboardingComplete = !hasCurrentlyDue && !hasPastDue;

    return NextResponse.json({
      accountId: account.id,
      readyToProcessPayments,
      onboardingComplete,
      chargesEnabled: account.charges_enabled,
      payoutsEnabled: account.payouts_enabled,
      requirements: account.requirements,
      account,
    });
  } catch (err: any) {
    console.error("Error retrieving account:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
}
