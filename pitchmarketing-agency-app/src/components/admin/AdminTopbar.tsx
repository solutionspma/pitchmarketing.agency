"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseReady, isGenesisAccount } from "@/lib/supabase";
import Link from "next/link";

export default function AdminTopbar() {
  const [user, setUser] = useState<any>(null);
  const [org, setOrg] = useState<any>(null);
  const [isGenesis, setIsGenesis] = useState(false);

  useEffect(() => {
    async function loadUser() {
      if (!isSupabaseReady() || !supabase) return;
      
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setIsGenesis(isGenesisAccount(user?.email));

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
    if (!supabase) return;
    await supabase.auth.signOut();
    window.location.href = "/auth/login";
  }

  return (
    <header className="w-full bg-pitch-black border-b border-white/10 p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {isGenesis && (
          <span className="text-xs bg-pitch-gold text-black px-2 py-1 rounded font-semibold">
            GENESIS
          </span>
        )}
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
