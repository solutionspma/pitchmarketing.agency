"use client";

import { useState } from "react";
import DashboardCard from "@/components/admin/DashboardCard";

export default function PayoutsPage() {
  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function sendPayout() {
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/connect/payout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        accountId,
        amount: Number(amount),
        memo,
      }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Agent Payouts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <DashboardCard title="Send Payout">
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Stripe Account ID</label>
              <input
                type="text"
                placeholder="acct_XXXX"
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                className="w-full bg-pitch-black border border-white/10 p-3 rounded-lg focus:border-pitch-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Amount (USD)</label>
              <input
                type="number"
                placeholder="100.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-pitch-black border border-white/10 p-3 rounded-lg focus:border-pitch-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Memo (Optional)</label>
              <input
                type="text"
                placeholder="Commission for Project X"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                className="w-full bg-pitch-black border border-white/10 p-3 rounded-lg focus:border-pitch-gold focus:outline-none"
              />
            </div>

            <button
              onClick={sendPayout}
              disabled={loading || !accountId || !amount}
              className="w-full py-3 bg-pitch-gold text-black rounded-lg font-semibold hover:bg-yellow-400 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Payout"}
            </button>

            {result && (
              <div
                className={`p-4 rounded-lg ${
                  result.error
                    ? "bg-red-500/10 text-red-500"
                    : "bg-green-500/10 text-green-500"
                }`}
              >
                {result.error ? result.error : "Payout sent successfully!"}
              </div>
            )}
          </div>
        </DashboardCard>

        <DashboardCard title="Recent Payouts">
          <p className="text-gray-400 text-sm">
            Payout history will appear here once connected to the database.
          </p>
        </DashboardCard>
      </div>
    </div>
  );
}
