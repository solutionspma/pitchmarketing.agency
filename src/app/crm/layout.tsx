import Link from 'next/link';

const crmLinks = [
  { name: 'Dashboard', href: '/crm', icon: '📊' },
  { name: 'Clients', href: '/crm/clients', icon: '👥' },
  { name: 'Bookings', href: '/crm/bookings', icon: '📅' },
  { name: 'Analytics', href: '/crm/analytics', icon: '📈' },
];

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-pitch-black">
      {/* Sidebar */}
      <aside className="w-72 bg-pitch-dark border-r border-white/10 p-6 hidden lg:block min-h-screen">
        <Link href="/crm" className="text-xl font-bold mb-2 block">
          PITCH<span className="text-pitch-gold">CRM</span>
        </Link>
        <p className="text-gray-500 text-sm mb-8">Client Relationship Management</p>

        <nav className="space-y-1">
          {crmLinks.map((l) => (
            <Link
              key={l.name}
              href={l.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 hover:text-pitch-gold transition text-gray-300"
            >
              <span className="text-lg">{l.icon}</span>
              <span className="font-medium">{l.name}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-8 pt-8 border-t border-white/10">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-500 hover:text-gray-300 transition"
          >
            <span>←</span>
            <span className="text-sm">Back to Dashboard</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-pitch-dark/50 backdrop-blur-sm">
          <div className="lg:hidden">
            <Link href="/crm" className="text-lg font-bold">
              PITCH<span className="text-pitch-gold">CRM</span>
            </Link>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <Link
              href="/book"
              className="px-4 py-2 bg-pitch-gold text-black text-sm font-semibold rounded-lg hover:bg-yellow-400 transition"
            >
              + New Booking
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
