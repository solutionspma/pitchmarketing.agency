import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
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

      await supabaseAdmin.from("customers").upsert({
        stripe_customer_id: customer.id,
        email: customer.email,
        name: customer.name,
        org_id: orgId || null,
      });
      break;
    }

    case "invoice.created":
    case "invoice.paid":
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;

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
      break;
    }

    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;

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
      break;
    }

    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("Checkout completed:", session.id);
      // You can handle post-checkout logic here
      break;
    }

    case "payment_intent.succeeded": {
      const intent = event.data.object as Stripe.PaymentIntent;
      console.log("Payment succeeded:", intent.id);
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
