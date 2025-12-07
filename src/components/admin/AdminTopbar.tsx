"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AdminTopbar() {
  const [user, setUser] = useState<any>(null);
  const [org, setOrg] = useState<any>(null);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        // Get user's organization
        const { data: membership } = await supabase
          .from("organization_members")
          .select("org_id, organizations(*)")
          .eq("user_id", user.id)
          .single();

        if (membership) {
          setOrg(membership.organizations);
        }
      }
    }

    loadUser();
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = "/auth/login";
  }

  return (
    <header className="w-full bg-pitch-black border-b border-white/10 p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {org && (
          <span className="text-sm bg-pitch-dark px-3 py-1 rounded-lg">
            {org.name}
          </span>
        )}
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
