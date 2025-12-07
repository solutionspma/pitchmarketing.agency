"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orgName, setOrgName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 1. Sign up the user
    const { data: signupData, error: signupError } = await supabase.auth.signUp(
      {
        email,
        password,
      }
    );

    if (signupError) {
      setError(signupError.message);
      setLoading(false);
      return;
    }

    const user = signupData.user;
    if (!user) {
      setError("Failed to create user");
      setLoading(false);
      return;
    }

    // 2. Create the organization
    const { data: org, error: orgError } = await supabase
      .from("organizations")
      .insert([
        {
          name: orgName,
          owner: user.id,
          slug: orgName.toLowerCase().replace(/\s+/g, "-"),
        },
      ])
      .select()
      .single();

    if (orgError) {
      setError(orgError.message);
      setLoading(false);
      return;
    }

    // 3. Add user as organization owner
    await supabase.from("organization_members").insert([
      {
        org_id: org.id,
        user_id: user.id,
        role: "owner",
      },
    ]);

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            Create Your <span className="text-pitch-gold">Account</span>
          </h1>
          <p className="text-gray-400 mt-2">
            Start building your empire today
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm mb-2">Organization Name</label>
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="w-full bg-pitch-dark border border-white/10 p-3 rounded-lg focus:border-pitch-gold focus:outline-none"
              placeholder="Your Company Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-pitch-dark border border-white/10 p-3 rounded-lg focus:border-pitch-gold focus:outline-none"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-pitch-dark border border-white/10 p-3 rounded-lg focus:border-pitch-gold focus:outline-none"
              placeholder="••••••••"
              minLength={6}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-pitch-gold text-black font-semibold rounded-lg hover:bg-yellow-400 transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-pitch-gold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
