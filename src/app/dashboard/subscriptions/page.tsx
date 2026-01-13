"use client";

import { useEffect, useState } from "react";
import DashboardCard from "@/components/admin/DashboardCard";

export default function SubscriptionsPage() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/subscriptions")
      .then((res) => res.json())
      .then((data) => {
        setSubs(data.subs || []);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Subscriptions</h1>

      <DashboardCard title="">
        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin h-8 w-8 border-4 border-pitch-gold border-t-transparent rounded-full mx-auto"></div>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 text-left">
                <th className="p-3 font-semibold">Customer</th>
                <th className="p-3 font-semibold">Plan</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold">Price</th>
                <th className="p-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((s: any) => (
                <tr key={s.id} className="border-b border-white/5">
                  <td className="p-3">{s.customer?.email || "—"}</td>
                  <td className="p-3">
                    {s.items?.data?.[0]?.price?.product?.name || "—"}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        s.status === "active"
                          ? "bg-green-500/20 text-green-500"
                          : s.status === "past_due"
                          ? "bg-yellow-500/20 text-yellow-500"
                          : "bg-red-500/20 text-red-500"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="p-3">
                    ${((s.items?.data?.[0]?.price?.unit_amount || 0) / 100).toFixed(2)}
                    /{s.items?.data?.[0]?.price?.recurring?.interval}
                  </td>
                  <td className="p-3">
                    <button className="text-pitch-gold hover:underline">
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
              {subs.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-400">
                    No subscriptions yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </DashboardCard>
    </div>
  );
}
