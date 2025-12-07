"use client";

import DashboardCard from "@/components/admin/DashboardCard";

export default function OrdersPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Orders</h1>
        <button className="px-4 py-2 bg-pitch-gold text-black rounded-lg font-semibold hover:bg-yellow-400 transition">
          + Create Order
        </button>
      </div>

      <DashboardCard title="">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 text-left">
              <th className="p-3 font-semibold">Order #</th>
              <th className="p-3 font-semibold">Customer</th>
              <th className="p-3 font-semibold">Items</th>
              <th className="p-3 font-semibold">Total</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="p-6 text-center text-gray-400">
                No orders yet. Orders will appear here when customers make
                purchases.
              </td>
            </tr>
          </tbody>
        </table>
      </DashboardCard>
    </div>
  );
}
