import { NextResponse } from "next/server";
import { stripeClient, isStripeReady, getWebhookSecret } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import Stripe from "stripe";

export const dynamic = 'force-dynamic';

/**
 * CONNECT WEBHOOK HANDLER
 * Handles webhook events for connected accounts
 * 
 * Events to listen for:
 * - account.updated (onboarding and capability changes)
 * - account.application.deauthorized
 * - capability.updated
 * 
 * Setup in Stripe Dashboard:
 * 1. Go to Developers → Webhooks
 * 2. Click "+ Add endpoint"
 * 3. Add your endpoint URL: /api/webhooks/thin
 * 4. Select events: account.updated, capability.updated
 * 5. Select "Connected accounts" for Events on
 * 
 * Local testing with Stripe CLI:
 * stripe listen --forward-connect-to http://localhost:3000/api/webhooks/thin
 */
export async function POST(req: Request) {
  if (!isStripeReady() || !stripeClient) {
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 503 }
    );
  }

  const webhookSecret = getWebhookSecret();
  if (!webhookSecret) {
    console.error("Missing STRIPE_WEBHOOK_SECRET");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    if (!sig) {
      return NextResponse.json(
        { error: "Missing stripe-signature header" },
        { status: 400 }
      );
    }

    /**
     * Verify webhook signature
     */
    const event = stripeClient.webhooks.constructEvent(body, sig, webhookSecret);

    console.log(`Received connect event: ${event.id}, type: ${event.type}`);

    // Handle different event types
    switch (event.type) {
      case "account.updated": {
        /**
         * Account was updated - check for capability/onboarding changes
         */
        const account = event.data.object as Stripe.Account;
        console.log(`Account updated: ${account.id}`);
        console.log(`Charges enabled: ${account.charges_enabled}`);
        console.log(`Payouts enabled: ${account.payouts_enabled}`);
        
        // Update database with account status
        if (supabaseAdmin) {
          await supabaseAdmin
            .from("stripe_accounts")
            .update({
              charges_enabled: account.charges_enabled,
              payouts_enabled: account.payouts_enabled,
              updated_at: new Date().toISOString(),
            })
            .eq("stripe_account_id", account.id);
        }
        break;
      }

      case "capability.updated": {
        /**
         * A capability was updated on a connected account
         */
        const capability = event.data.object as Stripe.Capability;
        console.log(`Capability updated: ${capability.id}`);
        console.log(`Status: ${capability.status}`);
        console.log(`Account: ${capability.account}`);
        break;
      }

      case "account.application.deauthorized": {
        /**
         * Connected account disconnected from platform
         */
        const application = event.data.object;
        console.log(`Application deauthorized: ${event.account}`);
        
        if (supabaseAdmin && event.account) {
          await supabaseAdmin
            .from("stripe_accounts")
            .update({
              status: "disconnected",
              disconnected_at: new Date().toISOString(),
            })
            .eq("stripe_account_id", event.account);
        }
        break;
      }

      default:
        console.log(`Unhandled connect event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Webhook error:", err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }
}
