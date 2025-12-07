import Link from "next/link";

const services = [
  {
    title: "Website Development",
    desc: "From simple landing pages to fully custom platforms and e-commerce solutions.",
    link: "/services#web",
    icon: "🌐",
  },
  {
    title: "Branding & Logo Design",
    desc: "Professional brand identity that commands attention and builds trust.",
    link: "/services#branding",
    icon: "🎨",
  },
  {
    title: "Commercial Production",
    desc: "High-impact video ads, AI avatars, and studio-quality audio production.",
    link: "/services#video",
    icon: "🎬",
  },
  {
    title: "Marketing & Automation",
    desc: "Funnels, SMS campaigns, AI chatbots, and CRM integration.",
    link: "/services#automation",
    icon: "🚀",
  },
  {
    title: "Print Shop",
    desc: "Banners, stickers, signs, business cards, and custom print media.",
    link: "/print",
    icon: "🖨️",
  },
  {
    title: "SaaS Platforms",
    desc: "Level10 CRM, BeCovered.life, SaxtaxPro, and Pitch Modular OS.",
    link: "/platforms",
    icon: "💻",
  },
];

export default function ServiceCards() {
  return (
    <section className="py-20 bg-pitch-black">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          What We <span className="text-pitch-gold">Build</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <Link
              key={s.title}
              href={s.link}
              className="bg-pitch-dark border border-white/10 p-6 rounded-xl shadow hover:scale-[1.02] hover:border-pitch-gold/50 transition-all"
            >
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-gray-400">{s.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
