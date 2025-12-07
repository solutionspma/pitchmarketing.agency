"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Product {
  id: string;
  name: string;
  description: string;
  default_price: {
    id: string;
    unit_amount: number;
    currency: string;
  };
  images: string[];
}

/**
 * STOREFRONT PAGE
 * Displays products from a connected account
 * 
 * NOTE: In production, use a different identifier instead of the raw Stripe account ID
 * Consider using a slug, custom ID, or hashed value for better security
 */
export default function StorefrontPage() {
  const params = useParams();
  const accountId = params.accountId as string;
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch(`/api/connect/products?accountId=${accountId}`);
        const data = await res.json();

        if (data.error) {
          setError(data.error);
        } else {
          setProducts(data.products || []);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (accountId) {
      loadProducts();
    }
  }, [accountId]);

  async function handlePurchase(priceId: string) {
    try {
      const res = await fetch("/api/connect/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountId,
          priceId,
          quantity: 1,
        }),
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
      } else if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      alert(err.message);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-pitch-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pitch-gold mx-auto mb-4"></div>
          <p className="text-gray-400">Loading storefront...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-pitch-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <a href="/" className="text-pitch-gold hover:underline">
            Return Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-pitch-black pt-20 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Store</h1>
          <p className="text-gray-400">
            Browse products from this merchant
          </p>
          {/* TODO: Replace accountId display with merchant name in production */}
          <p className="text-xs text-gray-500 mt-2">
            Merchant: {accountId}
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400">No products available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-pitch-dark border border-white/10 rounded-xl overflow-hidden hover:border-pitch-gold/50 transition"
              >
                {product.images?.[0] && (
                  <div className="aspect-video bg-white/5">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                  {product.description && (
                    <p className="text-gray-400 text-sm mb-4">
                      {product.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-pitch-gold">
                      ${((product.default_price?.unit_amount || 0) / 100).toFixed(2)}
                    </span>
                    <button
                      onClick={() => handlePurchase(product.default_price?.id)}
                      className="px-4 py-2 bg-pitch-gold text-black rounded-lg font-semibold hover:bg-yellow-400 transition"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
