"use client";

import { useEffect, useState } from "react";
import DashboardCard from "@/components/admin/DashboardCard";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/invoices")
      .then((res) => res.json())
      .then((data) => {
        setInvoices(data.invoices || []);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Invoices</h1>
        <button className="px-4 py-2 bg-pitch-gold text-black rounded-lg font-semibold hover:bg-yellow-400 transition">
          + Create Invoice
        </button>
      </div>

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
                <th className="p-3 font-semibold">Amount</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold">Date</th>
                <th className="p-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv: any) => (
                <tr key={inv.id} className="border-b border-white/5">
                  <td className="p-3">{inv.customer_email || "—"}</td>
                  <td className="p-3">
                    ${((inv.amount_due || 0) / 100).toFixed(2)}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        inv.status === "paid"
                          ? "bg-green-500/20 text-green-500"
                          : inv.status === "open"
                          ? "bg-yellow-500/20 text-yellow-500"
                          : "bg-red-500/20 text-red-500"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-3 text-gray-400">
                    {new Date(inv.created * 1000).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    {inv.hosted_invoice_url && (
                      <a
                        href={inv.hosted_invoice_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pitch-gold hover:underline"
                      >
                        View
                      </a>
                    )}
                  </td>
                </tr>
              ))}
              {invoices.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-400">
                    No invoices yet
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
