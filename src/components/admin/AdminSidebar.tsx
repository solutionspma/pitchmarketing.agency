import Link from "next/link";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: "📊" },
  { name: "Customers", href: "/dashboard/customers", icon: "👥" },
  { name: "Subscriptions", href: "/dashboard/subscriptions", icon: "💳" },
  { name: "Invoices", href: "/dashboard/invoices", icon: "📄" },
  { name: "Orders", href: "/dashboard/orders", icon: "🛒" },
  { name: "Projects", href: "/dashboard/projects", icon: "📋" },
  { name: "Support", href: "/dashboard/support", icon: "💬" },
  { name: "Payouts", href: "/dashboard/payouts", icon: "💰" },
  { name: "Analytics", href: "/dashboard/analytics", icon: "📈" },
  { name: "Settings", href: "/dashboard/settings", icon: "⚙️" },
];

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-pitch-dark border-r border-white/10 p-6 hidden md:block min-h-screen">
      <Link href="/dashboard" className="text-xl font-bold mb-8 block">
        PITCH<span className="text-pitch-gold">ADMIN</span>
      </Link>

      <nav className="space-y-2">
        {links.map((l) => (
          <Link
            key={l.name}
            href={l.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 hover:text-pitch-gold transition"
          >
            <span>{l.icon}</span>
            <span>{l.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
