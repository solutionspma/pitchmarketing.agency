import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-gray-400 mb-8">
          Thank you for your purchase. You will receive a confirmation email
          shortly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-pitch-gold text-black rounded-lg font-semibold hover:bg-yellow-400 transition"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/"
            className="px-6 py-3 border border-white/30 rounded-lg hover:bg-white/10 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
