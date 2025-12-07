"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, isSupabaseReady, isGenesisAccount } from "@/lib/supabase";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkAccess() {
      if (!isSupabaseReady() || !supabase) {
        setLoading(false);
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/auth/login");
        return;
      }

      // Only genesis account has admin access
      if (!isGenesisAccount(user.email)) {
        router.push("/dashboard");
        return;
      }

      setAuthorized(true);
      setLoading(false);
    }

    checkAccess();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pitch-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pitch-gold mx-auto mb-4"></div>
          <p className="text-gray-400">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pitch-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h1>
          <p className="text-gray-400">You do not have permission to access this area.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-pitch-black">
      <GenesisAdminSidebar />
      <div className="flex flex-col flex-1">
        <GenesisTopbar />
        <main className="p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}

function GenesisAdminSidebar() {
  const links = [
    { name: "Command Center", href: "/admin", icon: "🎯" },
    { name: "CMS Studio", href: "/admin/cms", icon: "🖼️" },
    { name: "CRM System", href: "/admin/crm", icon: "👥" },
    { name: "Ad Manager", href: "/admin/ads", icon: "📢" },
    { name: "Email System", href: "/admin/email", icon: "📧" },
    { name: "Marketing Hub", href: "/admin/marketing", icon: "📈" },
    { name: "Financial Suite", href: "/admin/finance", icon: "💰" },
    { name: "Connect Accounts", href: "/admin/connect", icon: "🔗" },
    { name: "Webhooks", href: "/admin/webhooks", icon: "🔔" },
    { name: "API Keys", href: "/admin/keys", icon: "🔑" },
    { name: "All Users", href: "/admin/users", icon: "👤" },
    { name: "All Orgs", href: "/admin/organizations", icon: "🏢" },
    { name: "Platform Settings", href: "/admin/settings", icon: "⚙️" },
  ];

  return (
    <aside className="w-72 bg-pitch-dark border-r border-white/10 p-6 hidden md:block min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xl font-bold">
          PITCH<span className="text-pitch-gold">ADMIN</span>
        </span>
        <span className="text-xs bg-pitch-gold text-black px-2 py-0.5 rounded font-bold">
          GENESIS
        </span>
      </div>

      <nav className="space-y-1">
        {links.map((l) => (
          <a
            key={l.name}
            href={l.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 hover:text-pitch-gold transition text-sm"
          >
            <span className="text-lg">{l.icon}</span>
            <span>{l.name}</span>
          </a>
        ))}
      </nav>

      <div className="mt-8 pt-8 border-t border-white/10">
        <p className="text-xs text-gray-500 mb-2">Quick Access</p>
        <a
          href="/dashboard"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-sm text-gray-400"
        >
          <span>📋</span>
          <span>User Dashboard</span>
        </a>
        <a
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-sm text-gray-400"
        >
          <span>🌐</span>
          <span>Public Site</span>
        </a>
      </div>
    </aside>
  );
}

function GenesisTopbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function loadUser() {
      if (!isSupabaseReady() || !supabase) return;
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    loadUser();
  }, []);

  async function handleSignOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    window.location.href = "/auth/login";
  }

  return (
    <header className="w-full bg-pitch-black border-b border-white/10 p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="text-sm bg-gradient-to-r from-pitch-gold to-yellow-300 text-black px-3 py-1 rounded-full font-bold">
          GENESIS COMMAND
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-gray-400 text-sm">{user?.email}</span>
        <button
          onClick={handleSignOut}
          className="text-sm text-gray-400 hover:text-pitch-gold transition"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}
