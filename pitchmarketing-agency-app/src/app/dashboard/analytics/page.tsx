import DashboardCard from "@/components/admin/DashboardCard";

export default function AnalyticsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Analytics</h1>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Monthly Recurring Revenue (MRR)" value="$0" />
        <StatCard title="Annual Recurring Revenue (ARR)" value="$0" />
        <StatCard title="Total Customers" value="0" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <DashboardCard title="Revenue by Plan">
          <div className="h-64 flex items-center justify-center text-gray-400">
            Chart placeholder - Connect to database to see live data
          </div>
        </DashboardCard>

        <DashboardCard title="Subscription Growth">
          <div className="h-64 flex items-center justify-center text-gray-400">
            Chart placeholder - Connect to database to see live data
          </div>
        </DashboardCard>

        <DashboardCard title="Churn Rate">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Monthly Churn</span>
              <span className="text-2xl font-bold">0%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Annual Churn</span>
              <span className="text-2xl font-bold">0%</span>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Top Products">
          <div className="space-y-4">
            <p className="text-gray-400 text-sm">
              No product data available yet
            </p>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-pitch-dark border border-white/10 rounded-xl p-6">
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <p className="text-4xl font-bold text-pitch-gold">{value}</p>
    </div>
  );
}
