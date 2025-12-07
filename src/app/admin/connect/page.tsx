"use client";

import { useState } from "react";

export default function ConnectAccountsPage() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAccount, setNewAccount] = useState({
    display_name: "",
    contact_email: "",
  });

  // Create new connected account
  async function createAccount(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/connect/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAccount),
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
      } else {
        setAccounts([...accounts, data]);
        setShowCreateModal(false);
        setNewAccount({ display_name: "", contact_email: "" });
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Start onboarding for account
  async function startOnboarding(accountId: string) {
    try {
      const res = await fetch("/api/connect/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId }),
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
      } else {
        window.open(data.url, "_blank");
      }
    } catch (err: any) {
      alert(err.message);
    }
  }

  // Check account status
  async function checkStatus(accountId: string) {
    try {
      const res = await fetch(`/api/connect/accounts?accountId=${accountId}`);
      const data = await res.json();

      if (data.error) {
        alert(data.error);
      } else {
        alert(JSON.stringify(data, null, 2));
      }
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Stripe Connect</h1>
          <p className="text-gray-400 mt-1">Manage connected accounts and marketplace</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-pitch-gold text-black rounded-lg font-semibold hover:bg-yellow-400 transition"
        >
          + Create Account
        </button>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-pitch-dark border border-white/10 rounded-xl p-6">
          <h3 className="font-bold mb-2">V2 Connected Accounts</h3>
          <p className="text-gray-400 text-sm">
            Using Stripe Connect V2 API with full dashboard access, merchant capabilities, and direct charges.
          </p>
        </div>
        <div className="bg-pitch-dark border border-white/10 rounded-xl p-6">
          <h3 className="font-bold mb-2">Application Fees</h3>
          <p className="text-gray-400 text-sm">
            5% application fee on all transactions. Platform monetization through direct charges.
          </p>
        </div>
        <div className="bg-pitch-dark border border-white/10 rounded-xl p-6">
          <h3 className="font-bold mb-2">Thin Event Webhooks</h3>
          <p className="text-gray-400 text-sm">
            V2 accounts use thin events for real-time capability and requirements updates.
          </p>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="bg-pitch-dark border border-white/10 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h2 className="font-bold">Connected Accounts</h2>
        </div>

        {accounts.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <p>No connected accounts yet</p>
            <p className="text-sm mt-2">Create your first connected account to get started</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase">Account ID</th>
                <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.accountId} className="border-t border-white/5">
                  <td className="px-4 py-3 font-mono text-sm">{account.accountId}</td>
                  <td className="px-4 py-3">{account.account?.display_name || "-"}</td>
                  <td className="px-4 py-3">{account.account?.contact_email || "-"}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded">
                      Pending Onboarding
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => startOnboarding(account.accountId)}
                        className="text-xs px-3 py-1 bg-pitch-gold text-black rounded hover:bg-yellow-400 transition"
                      >
                        Onboard
                      </button>
                      <button
                        onClick={() => checkStatus(account.accountId)}
                        className="text-xs px-3 py-1 bg-white/10 rounded hover:bg-white/20 transition"
                      >
                        Status
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* CLI Instructions */}
      <div className="mt-8 bg-pitch-dark border border-white/10 rounded-xl p-6">
        <h3 className="font-bold mb-4">Webhook Setup</h3>
        <p className="text-gray-400 text-sm mb-4">
          For V2 accounts, set up thin event webhooks in your Stripe Dashboard:
        </p>
        <ol className="text-gray-400 text-sm space-y-2 list-decimal list-inside mb-4">
          <li>Go to Developers → Webhooks</li>
          <li>Click "+ Add destination"</li>
          <li>Select "Connected accounts" in Events from section</li>
          <li>Select "Show advanced options" → Payload style: "Thin"</li>
          <li>Add v2.core.account events</li>
        </ol>
        <p className="text-gray-400 text-sm mb-2">Local testing with Stripe CLI:</p>
        <code className="block bg-pitch-black p-3 rounded text-xs text-green-400 overflow-x-auto">
          stripe listen --thin-events 'v2.core.account[requirements].updated,v2.core.account[configuration.merchant].capability_status_updated' --forward-thin-to http://localhost:3000/api/webhooks/thin
        </code>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-pitch-dark border border-white/10 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create Connected Account</h2>
            <form onSubmit={createAccount} className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Display Name</label>
                <input
                  type="text"
                  value={newAccount.display_name}
                  onChange={(e) =>
                    setNewAccount({ ...newAccount, display_name: e.target.value })
                  }
                  className="w-full bg-pitch-black border border-white/10 p-3 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Contact Email</label>
                <input
                  type="email"
                  value={newAccount.contact_email}
                  onChange={(e) =>
                    setNewAccount({ ...newAccount, contact_email: e.target.value })
                  }
                  className="w-full bg-pitch-black border border-white/10 p-3 rounded-lg"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2 bg-pitch-gold text-black rounded-lg font-semibold hover:bg-yellow-400 transition disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
