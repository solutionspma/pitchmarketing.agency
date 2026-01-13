import { NextResponse } from "next/server";
import { stripeClient, isStripeReady } from "@/lib/stripe";

export const dynamic = 'force-dynamic';

/**
 * CREATE PRODUCT ON CONNECTED ACCOUNT
 * Creates a product with a default price on a connected account
 * Uses the Stripe-Account header for connected account operations
 * 
 * POST /api/connect/products
 * Body: { accountId: string, name: string, description?: string, price: number, currency?: string }
 */
export async function POST(req: Request) {
  if (!isStripeReady() || !stripeClient) {
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 503 }
    );
  }

  try {
    const { accountId, name, description, price, currency = "usd" } = await req.json();

    if (!accountId || !name || !price) {
      return NextResponse.json(
        { error: "accountId, name, and price are required" },
        { status: 400 }
      );
    }

    /**
     * Create product on connected account
     * stripeAccount option sets the Stripe-Account header
     */
    const product = await stripeClient.products.create(
      {
        name,
        description: description || undefined,
        default_price_data: {
          unit_amount: Math.round(Number(price)), // Price in cents
          currency,
        },
      },
      {
        stripeAccount: accountId, // Use stripeAccount for the Stripe-Account header
      }
    );

    return NextResponse.json({ product });
  } catch (err: any) {
    console.error("Error creating product:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
}

/**
 * LIST PRODUCTS FROM CONNECTED ACCOUNT
 * Retrieves all active products from a connected account's storefront
 * 
 * GET /api/connect/products?accountId=acct_xxx
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
     * List products from connected account
     * Include data.default_price to get pricing info
     */
    const products = await stripeClient.products.list(
      {
        limit: 20,
        active: true,
        expand: ["data.default_price"],
      },
      {
        stripeAccount: accountId,
      }
    );

    return NextResponse.json({
      accountId,
      products: products.data,
    });
  } catch (err: any) {
    console.error("Error listing products:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
}
