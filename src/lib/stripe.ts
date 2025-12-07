import Stripe from "stripe";

// Check if Stripe key is configured
const stripeKey = process.env.STRIPE_SECRET_KEY;
const isStripeConfigured = stripeKey && !stripeKey.includes('YOUR_KEY_HERE');

export const stripe = isStripeConfigured 
  ? new Stripe(stripeKey, { apiVersion: "2023-10-16" })
  : null;

export const isStripeReady = () => isStripeConfigured && stripe !== null;
