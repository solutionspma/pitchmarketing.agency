import DashboardCard from "@/components/admin/DashboardCard";
import Link from "next/link";

export default function DashboardHome() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Revenue" value="$0.00" change="+0%" />
        <StatCard title="Active Subscriptions" value="0" change="+0%" />
        <StatCard title="Open Tickets" value="0" change="-0%" />
        <StatCard title="Pending Orders" value="0" change="+0%" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Quick Actions">
          <div className="space-y-3">
            <Link
              href="/dashboard/customers/new"
              className="block p-3 bg-white/5 rounded-lg hover:bg-white/10 transition"
            >
              + Add New Customer
            </Link>
            <Link
              href="/dashboard/invoices/new"
              className="block p-3 bg-white/5 rounded-lg hover:bg-white/10 transition"
            >
              + Create Invoice
            </Link>
            <Link
              href="/dashboard/projects/new"
              className="block p-3 bg-white/5 rounded-lg hover:bg-white/10 transition"
            >
              + Start New Project
            </Link>
          </div>
        </DashboardCard>

        <DashboardCard title="Recent Activity">
          <p className="text-gray-400 text-sm">No recent activity</p>
        </DashboardCard>

        <DashboardCard title="Upcoming Tasks">
          <p className="text-gray-400 text-sm">No upcoming tasks</p>
        </DashboardCard>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  change,
}: {
  title: string;
  value: string;
  change: string;
}) {
  const isPositive = change.startsWith("+");

  return (
    <div className="bg-pitch-dark border border-white/10 rounded-xl p-6">
      <p className="text-gray-400 text-sm mb-1">{title}</p>
      <p className="text-3xl font-bold mb-2">{value}</p>
      <p
        className={`text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}
      >
        {change} from last month
      </p>
    </div>
  );
}
