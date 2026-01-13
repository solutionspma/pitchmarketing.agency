import Link from "next/link";
import Image from "next/image";

const services = [
  {
    title: "Website Development",
    desc: "From simple landing pages to fully custom platforms and e-commerce solutions.",
    link: "/services#web",
    icon: "🌐",
    image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Branding & Logo Design",
    desc: "Professional brand identity that commands attention and builds trust.",
    link: "/services#branding",
    icon: "🎨",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Commercial Production",
    desc: "High-impact video ads, AI avatars, and studio-quality audio production.",
    link: "/services#video",
    icon: "🎬",
    image: "https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Marketing & Automation",
    desc: "Funnels, SMS campaigns, AI chatbots, and CRM integration.",
    link: "/services#automation",
    icon: "🚀",
    image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Print Shop",
    desc: "Banners, stickers, signs, business cards, and custom print media.",
    link: "/print",
    icon: "🖨️",
    image: "https://images.pexels.com/photos/4792285/pexels-photo-4792285.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "SaaS Platforms",
    desc: "Level10 CRM, BeCovered.life, SaxtaxPro, and Pitch Modular OS.",
    link: "/platforms",
    icon: "💻",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
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
              className="group relative bg-pitch-dark border border-white/10 rounded-xl shadow overflow-hidden hover:scale-[1.02] hover:border-pitch-gold/50 transition-all"
            >
              {/* Image Background */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pitch-dark via-pitch-dark/60 to-transparent"></div>
                <div className="absolute top-4 left-4 text-4xl">{s.icon}</div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white">{s.title}</h3>
                <p className="text-gray-400">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
