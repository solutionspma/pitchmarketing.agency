"use client";

import { useEffect, useState } from "react";
import DashboardCard from "@/components/admin/DashboardCard";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/customers")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data.customers || []);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Customers</h1>
        <button className="px-4 py-2 bg-pitch-gold text-black rounded-lg font-semibold hover:bg-yellow-400 transition">
          + Add Customer
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
                <th className="p-3 font-semibold">Email</th>
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Created</th>
                <th className="p-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c: any) => (
                <tr key={c.id} className="border-b border-white/5">
                  <td className="p-3">{c.email}</td>
                  <td className="p-3">{c.name || "—"}</td>
                  <td className="p-3 text-gray-400">
                    {new Date(c.created * 1000).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <button className="text-pitch-gold hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-gray-400">
                    No customers yet
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
