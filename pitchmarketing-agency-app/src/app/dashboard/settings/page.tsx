export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="max-w-2xl space-y-8">
        {/* Organization Settings */}
        <section className="bg-pitch-dark border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Organization</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Organization Name</label>
              <input
                type="text"
                className="w-full bg-pitch-black border border-white/10 p-3 rounded-lg focus:border-pitch-gold focus:outline-none"
                placeholder="Your Organization"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Website</label>
              <input
                type="url"
                className="w-full bg-pitch-black border border-white/10 p-3 rounded-lg focus:border-pitch-gold focus:outline-none"
                placeholder="https://example.com"
              />
            </div>
          </div>
        </section>

        {/* Billing Settings */}
        <section className="bg-pitch-dark border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Billing</h2>
          <p className="text-gray-400 mb-4">
            Manage your subscription and payment methods
          </p>
          <button className="px-4 py-2 bg-pitch-gold text-black rounded-lg font-semibold hover:bg-yellow-400 transition">
            Manage Billing
          </button>
        </section>

        {/* Team Settings */}
        <section className="bg-pitch-dark border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Team Members</h2>
          <p className="text-gray-400 mb-4">
            Invite team members to your organization
          </p>
          <button className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition">
            + Invite Member
          </button>
        </section>

        {/* API Settings */}
        <section className="bg-pitch-dark border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">API Keys</h2>
          <p className="text-gray-400 mb-4">
            Manage your API keys for integrations
          </p>
          <div className="bg-pitch-black p-4 rounded-lg font-mono text-sm text-gray-400">
            pk_live_•••••••••••••••••••
          </div>
        </section>

        {/* Danger Zone */}
        <section className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-red-500">
            Danger Zone
          </h2>
          <p className="text-gray-400 mb-4">
            Permanently delete your organization and all associated data
          </p>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition">
            Delete Organization
          </button>
        </section>
      </div>
    </div>
  );
}
