import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase";

// Check if Stripe is configured
const stripeKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const isStripeConfigured = stripeKey && !stripeKey.includes('YOUR_KEY_HERE');

const stripe = isStripeConfigured 
  ? new Stripe(stripeKey, { apiVersion: "2023-10-16" })
  : null;

export async function POST(req: Request) {
  if (!stripe || !isStripeConfigured || !webhookSecret) {
    return NextResponse.json({ error: "Stripe webhook not configured" }, { status: 503 });
  }
  
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig!,
      webhookSecret
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "customer.created": {
      const customer = event.data.object as Stripe.Customer;
      const orgId = customer.metadata?.org_id;

      if (supabaseAdmin) {
        await supabaseAdmin.from("customers").upsert({
          stripe_customer_id: customer.id,
          email: customer.email,
          name: customer.name,
          org_id: orgId || null,
        });
      }
      break;
    }

    case "invoice.created":
    case "invoice.paid":
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;

      if (supabaseAdmin) {
        // Get customer from our DB
        const { data: cust } = await supabaseAdmin
          .from("customers")
          .select("id, org_id")
          .eq("stripe_customer_id", invoice.customer)
          .single();

        await supabaseAdmin.from("invoices").upsert({
          stripe_invoice_id: invoice.id,
          customer_id: cust?.id,
          org_id: cust?.org_id,
          amount: invoice.amount_due,
          status: invoice.status,
          url: invoice.hosted_invoice_url,
        });
      }
      break;
    }

    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;

      if (supabaseAdmin) {
        const { data: cust } = await supabaseAdmin
          .from("customers")
          .select("id, org_id")
          .eq("stripe_customer_id", sub.customer)
          .single();

        const item = sub.items.data[0];
        const price = item?.price as Stripe.Price;

        await supabaseAdmin.from("subscriptions").upsert({
          stripe_subscription_id: sub.id,
          customer_id: cust?.id,
          org_id: cust?.org_id,
          status: sub.status,
          plan_name: price?.nickname || "Plan",
          plan_price: price?.unit_amount || 0,
          interval: price?.recurring?.interval || "month",
        });
      }

      /**
       * Handle subscription lifecycle for access control
       * - created: Grant access to subscribed features
       * - updated: Check for upgrades/downgrades, pause status
       * - deleted: Revoke access
       */
      if (event.type === "customer.subscription.deleted") {
        // TODO: Revoke customer access to subscribed products
        console.log(`Subscription ${sub.id} deleted - revoke access`);
      } else if (sub.cancel_at_period_end) {
        // Customer has scheduled cancellation
        console.log(`Subscription ${sub.id} will cancel at period end`);
      } else if (sub.pause_collection) {
        // Subscription is paused
        console.log(`Subscription ${sub.id} is paused`);
      }
      break;
    }

    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("Checkout completed:", session.id);
      
      /**
       * Get customer info from session
       */
      const customerId = session.customer;
      if (customerId) {
        console.log(`Checkout for customer: ${customerId}`);
      }
      break;
    }

    case "payment_intent.succeeded": {
      const intent = event.data.object as Stripe.PaymentIntent;
      console.log("Payment succeeded:", intent.id);
      break;
    }

    case "payment_method.attached": {
      const paymentMethod = event.data.object as Stripe.PaymentMethod;
      console.log("Payment method attached:", paymentMethod.id);
      break;
    }

    case "payment_method.detached": {
      const paymentMethod = event.data.object as Stripe.PaymentMethod;
      console.log("Payment method detached:", paymentMethod.id);
      break;
    }

    case "customer.updated": {
      const customer = event.data.object as Stripe.Customer;
      // Check for default payment method changes
      const defaultPaymentMethod = customer.invoice_settings?.default_payment_method;
      console.log(`Customer ${customer.id} updated, default PM: ${defaultPaymentMethod}`);
      
      // TODO: Update database with billing info changes
      // Note: Only treat as billing info, not login credentials
      break;
    }

    case "billing_portal.session.created": {
      const portalSession = event.data.object;
      console.log("Billing portal session created:", portalSession.id);
      break;
    }

    case "payout.paid": {
      const payout = event.data.object as Stripe.Payout;
      console.log("Payout completed:", payout.id);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
