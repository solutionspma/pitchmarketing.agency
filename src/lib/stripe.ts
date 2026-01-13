import Stripe from "stripe";

/**
 * STRIPE CONNECT V2 INTEGRATION
 * Pitch Market Strategies & Public Relations, LLC
 * 
 * This module provides:
 * - V2 Connected Account creation
 * - Account onboarding with Account Links
 * - Thin event webhook handling
 * - Direct charges with application fees
 * - Platform subscriptions to connected accounts
 */

// Check if Stripe key is configured
const stripeKey = process.env.STRIPE_SECRET_KEY;
const isStripeConfigured = stripeKey && !stripeKey.includes('YOUR_KEY_HERE');

/**
 * Creates a Stripe client instance
 * IMPORTANT: Always use this stripeClient for all Stripe API requests
 */
export const stripeClient = isStripeConfigured 
  ? new Stripe(stripeKey, { 
      // API version is automatically used by the SDK
      typescript: true,
    })
  : null;

// Legacy export for backwards compatibility
export const stripe = stripeClient;

/**
 * Checks if Stripe is properly configured and ready for use
 * @returns boolean indicating if Stripe operations can be performed
 */
export const isStripeReady = () => isStripeConfigured && stripeClient !== null;

/**
 * Gets the webhook secret for verifying webhook signatures
 */
export const getWebhookSecret = () => process.env.STRIPE_WEBHOOK_SECRET;

/**
 * Gets the platform subscription price ID
 */
export const getPlatformPriceId = () => process.env.STRIPE_PLATFORM_PRICE_ID;

/**
 * Application fee percentage (e.g., 0.05 = 5%)
 */
export const APPLICATION_FEE_PERCENT = 0.05;

/**
 * Calculate application fee from total amount
 * @param amount - Amount in cents
 * @returns Application fee in cents
 */
export const calculateApplicationFee = (amount: number): number => {
  return Math.round(amount * APPLICATION_FEE_PERCENT);
};

/**
 * ROOT_URL for redirects - uses environment variable or defaults to localhost
 */
export const ROOT_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
