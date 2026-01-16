"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseReady } from "@/lib/supabase";

export default function AdminCommandCenter() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrgs: 0,
    totalRevenue: "$0.00",
    activeSubscriptions: 0,
  });

  useEffect(() => {
    // Load platform stats
    async function loadStats() {
      if (!isSupabaseReady() || !supabase) return;
      
      // Get user count
      const { count: userCount } = await supabase
        .from("auth.users")
        .select("*", { count: "exact", head: true });

      // Get org count  
      const { count: orgCount } = await supabase
        .from("organizations")
        .select("*", { count: "exact", head: true });

      setStats({
        totalUsers: userCount || 0,
        totalOrgs: orgCount || 0,
        totalRevenue: "$0.00",
        activeSubscriptions: 0,
      });
    }
    
    loadStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Genesis Command Center</h1>
      <p className="text-gray-400 mb-8">
        Full platform control for Pitch Market Strategies & Public Relations, LLC
      </p>

      {/* Platform Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toString()}
          icon="👥"
        />
        <StatCard
          title="Organizations"
          value={stats.totalOrgs.toString()}
          icon="🏢"
        />
        <StatCard
          title="Platform Revenue"
          value={stats.totalRevenue}
          icon="💰"
        />
        <StatCard
          title="Active Subscriptions"
          value={stats.activeSubscriptions.toString()}
          icon="💳"
        />
      </div>

      {/* Quick Actions Grid */}
      <h2 className="text-xl font-bold mb-4">Platform Systems</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <SystemCard
          title="CMS Studio"
          description="Drag-and-drop page builder for all platform sites"
          href="/admin/cms"
          icon="🖼️"
          status="Ready"
        />
        <SystemCard
          title="CRM System"
          description="Customer relationship management and pipeline"
          href="/admin/crm"
          icon="👥"
          status="Ready"
        />
        <SystemCard
          title="Ad Manager"
          description="Create and manage advertising campaigns"
          href="/admin/ads"
          icon="📢"
          status="Ready"
        />
        <SystemCard
          title="Email System"
          description="Email marketing and transactional emails"
          href="/admin/email"
          icon="📧"
          status="Ready"
        />
        <SystemCard
          title="Marketing Hub"
          description="Campaign automation and analytics"
          href="/admin/marketing"
          icon="📈"
          status="Ready"
        />
        <SystemCard
          title="Financial Suite"
          description="Invoicing, payments, and financial reports"
          href="/admin/finance"
          icon="💰"
          status="Coming Soon"
        />
      </div>

      {/* Stripe Connect Section */}
      <h2 className="text-xl font-bold mb-4">Payment Infrastructure</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-pitch-dark border border-white/10 rounded-xl p-6">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <span>🔗</span> Stripe Connect
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Manage connected accounts and marketplace payments
          </p>
          <div className="space-y-2">
            <a
              href="/admin/connect"
              className="block p-3 bg-white/5 rounded-lg hover:bg-white/10 transition text-sm"
            >
              View Connected Accounts
            </a>
            <a
              href="/admin/connect/create"
              className="block p-3 bg-white/5 rounded-lg hover:bg-white/10 transition text-sm"
            >
              Create New Account
            </a>
          </div>
        </div>

        <div className="bg-pitch-dark border border-white/10 rounded-xl p-6">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <span>🔔</span> Webhook Status
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Monitor webhook events and delivery status
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg text-sm">
              <span>Standard Webhooks</span>
              <span className="text-green-500">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg text-sm">
              <span>Thin Events (V2)</span>
              <span className="text-green-500">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Info */}
      <div className="bg-pitch-dark border border-white/10 rounded-xl p-6">
        <h3 className="font-bold mb-4">Platform Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between p-3 bg-white/5 rounded-lg">
            <span className="text-gray-400">Genesis Email</span>
            <span>solutions@pitchmarketing.agency</span>
          </div>
          <div className="flex justify-between p-3 bg-white/5 rounded-lg">
            <span className="text-gray-400">Public Email</span>
            <span>helloworld@pitchmarketing.agency</span>
          </div>
          <div className="flex justify-between p-3 bg-white/5 rounded-lg">
            <span className="text-gray-400">Personal Email</span>
            <span>jason.harris@pitchmarketing.agency</span>
          </div>
          <div className="flex justify-between p-3 bg-white/5 rounded-lg">
            <span className="text-gray-400">Backup Code</span>
            <span className="font-mono text-xs">yllz-rupy-hffu-wdaf-rdxa</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="bg-pitch-dark border border-white/10 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <p className="text-gray-400 text-sm">{title}</p>
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

function SystemCard({
  title,
  description,
  href,
  icon,
  status,
}: {
  title: string;
  description: string;
  href: string;
  icon: string;
  status: string;
}) {
  return (
    <a
      href={href}
      className="bg-pitch-dark border border-white/10 rounded-xl p-6 hover:border-pitch-gold/50 transition block"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        <span
          className={`text-xs px-2 py-1 rounded ${
            status === "Ready"
              ? "bg-green-500/20 text-green-500"
              : "bg-yellow-500/20 text-yellow-500"
          }`}
        >
          {status}
        </span>
      </div>
      <h3 className="font-bold mb-1">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </a>
  );
}
