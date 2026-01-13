"use client";

import { useEffect, useState } from "react";

interface Price {
  id: string;
  unit_amount: number;
  recurring?: {
    interval: string;
  };
  product: {
    name: string;
    description?: string;
  };
}

export default function PricingTable() {
  const [prices, setPrices] = useState<Price[]>([]);
  const [loading, setLoading] = useState(true);
  const [interval, setInterval] = useState<"month" | "year">("month");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        const subscriptionPrices = data.prices.filter(
          (p: Price) => p.recurring && p.product?.name?.includes("LEVEL10")
        );
        setPrices(subscriptionPrices);
        setLoading(false);
      });
  }, []);

  const filteredPrices = prices.filter(
    (p) => p.recurring?.interval === interval
  );

  async function handleCheckout(priceId: string) {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin h-8 w-8 border-4 border-pitch-gold border-t-transparent rounded-full mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* Interval Toggle */}
      <div className="flex justify-center mb-10">
        <div className="bg-pitch-dark rounded-lg p-1 inline-flex">
          <button
            onClick={() => setInterval("month")}
            className={`px-6 py-2 rounded-md transition ${
              interval === "month"
                ? "bg-pitch-gold text-black font-semibold"
                : "text-gray-400"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setInterval("year")}
            className={`px-6 py-2 rounded-md transition ${
              interval === "year"
                ? "bg-pitch-gold text-black font-semibold"
                : "text-gray-400"
            }`}
          >
            Yearly (Save 15%)
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPrices.map((price) => (
          <div
            key={price.id}
            className="bg-pitch-dark p-6 rounded-xl border border-white/10 hover:border-pitch-gold/50 transition"
          >
            <h3 className="text-xl font-semibold mb-2">{price.product.name}</h3>
            <p className="text-gray-400 text-sm mb-4">
              {price.product.description || "Full platform access"}
            </p>

            <p className="text-4xl font-bold mb-1">
              ${((price.unit_amount || 0) / 100).toFixed(0)}
              <span className="text-gray-400 text-lg font-normal">
                /{price.recurring?.interval}
              </span>
            </p>

            <button
              onClick={() => handleCheckout(price.id)}
              className="w-full mt-6 py-3 bg-pitch-gold text-black rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              Get Started
            </button>
          </div>
        ))}
      </div>

      {filteredPrices.length === 0 && (
        <p className="text-center text-gray-400 py-10">
          No pricing plans available. Run the seed script to create products.
        </p>
      )}
    </div>
  );
}
