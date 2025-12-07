"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Product categories with Pexels images
const categories = [
  {
    id: "business-cards",
    name: "Business Cards",
    description: "Make a lasting first impression",
    image: "https://images.pexels.com/photos/6177607/pexels-photo-6177607.jpeg?auto=compress&cs=tinysrgb&w=800",
    products: [
      { name: "Standard Business Cards", price: 19.99, unit: "250 cards", bestseller: true },
      { name: "Premium Thick Cards", price: 34.99, unit: "250 cards" },
      { name: "Matte Finish Cards", price: 24.99, unit: "250 cards" },
      { name: "Glossy Finish Cards", price: 24.99, unit: "250 cards" },
      { name: "Rounded Corner Cards", price: 29.99, unit: "250 cards" },
      { name: "Spot UV Business Cards", price: 49.99, unit: "250 cards" },
      { name: "Foil Stamped Cards", price: 79.99, unit: "250 cards", premium: true },
      { name: "Die-Cut Business Cards", price: 89.99, unit: "250 cards", premium: true },
    ]
  },
  {
    id: "banners-signs",
    name: "Banners & Signs",
    description: "Stand out at any event",
    image: "https://images.pexels.com/photos/7413915/pexels-photo-7413915.jpeg?auto=compress&cs=tinysrgb&w=800",
    products: [
      { name: "Vinyl Banner (3x6 ft)", price: 49.99, unit: "each", bestseller: true },
      { name: "Vinyl Banner (4x8 ft)", price: 79.99, unit: "each" },
      { name: "Retractable Banner Stand", price: 129.99, unit: "each" },
      { name: "X-Banner Stand", price: 89.99, unit: "each" },
      { name: "Yard Signs (18x24)", price: 24.99, unit: "each" },
      { name: "A-Frame Signs", price: 149.99, unit: "each" },
      { name: "Foam Board Signs", price: 34.99, unit: "each" },
      { name: "Acrylic Signs", price: 89.99, unit: "each", premium: true },
    ]
  },
  {
    id: "stickers-labels",
    name: "Stickers & Labels",
    description: "Brand everything you touch",
    image: "https://images.pexels.com/photos/4792285/pexels-photo-4792285.jpeg?auto=compress&cs=tinysrgb&w=800",
    products: [
      { name: "Die-Cut Stickers", price: 29.99, unit: "100 stickers", bestseller: true },
      { name: "Circle Stickers (2\")", price: 19.99, unit: "100 stickers" },
      { name: "Rectangle Stickers", price: 24.99, unit: "100 stickers" },
      { name: "Bumper Stickers", price: 39.99, unit: "50 stickers" },
      { name: "Product Labels", price: 49.99, unit: "250 labels" },
      { name: "Roll Labels", price: 79.99, unit: "500 labels" },
      { name: "Clear Stickers", price: 34.99, unit: "100 stickers" },
      { name: "Holographic Stickers", price: 59.99, unit: "100 stickers", premium: true },
    ]
  },
  {
    id: "apparel",
    name: "Apparel & Clothing",
    description: "Wear your brand with pride",
    image: "https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=800",
    products: [
      { name: "Custom T-Shirts", price: 14.99, unit: "each", bestseller: true },
      { name: "Custom Polo Shirts", price: 24.99, unit: "each" },
      { name: "Custom Hoodies", price: 34.99, unit: "each" },
      { name: "Custom Hats", price: 19.99, unit: "each" },
      { name: "Custom Jackets", price: 49.99, unit: "each" },
      { name: "Custom Aprons", price: 24.99, unit: "each" },
      { name: "Embroidered Shirts", price: 29.99, unit: "each", premium: true },
      { name: "All-Over Print Shirts", price: 39.99, unit: "each", premium: true },
    ]
  },
  {
    id: "marketing-materials",
    name: "Marketing Materials",
    description: "Promote your business effectively",
    image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
    products: [
      { name: "Flyers (8.5x11)", price: 49.99, unit: "500 flyers", bestseller: true },
      { name: "Brochures (Tri-fold)", price: 99.99, unit: "250 brochures" },
      { name: "Postcards (4x6)", price: 39.99, unit: "250 cards" },
      { name: "Door Hangers", price: 79.99, unit: "250 hangers" },
      { name: "Rack Cards", price: 69.99, unit: "250 cards" },
      { name: "Booklets", price: 149.99, unit: "100 booklets" },
      { name: "Catalogs", price: 299.99, unit: "100 catalogs", premium: true },
      { name: "Presentation Folders", price: 199.99, unit: "100 folders", premium: true },
    ]
  },
  {
    id: "promotional",
    name: "Promotional Products",
    description: "Giveaways that get remembered",
    image: "https://images.pexels.com/photos/5632397/pexels-photo-5632397.jpeg?auto=compress&cs=tinysrgb&w=800",
    products: [
      { name: "Custom Pens", price: 49.99, unit: "100 pens", bestseller: true },
      { name: "Custom Mugs", price: 9.99, unit: "each" },
      { name: "Custom Tote Bags", price: 7.99, unit: "each" },
      { name: "Custom Keychains", price: 39.99, unit: "50 keychains" },
      { name: "Custom Magnets", price: 29.99, unit: "100 magnets" },
      { name: "Custom Mouse Pads", price: 12.99, unit: "each" },
      { name: "Custom USB Drives", price: 8.99, unit: "each" },
      { name: "Custom Notebooks", price: 6.99, unit: "each" },
    ]
  },
  {
    id: "packaging",
    name: "Packaging & Boxes",
    description: "Unboxing experiences that wow",
    image: "https://images.pexels.com/photos/4498124/pexels-photo-4498124.jpeg?auto=compress&cs=tinysrgb&w=800",
    products: [
      { name: "Custom Mailer Boxes", price: 2.99, unit: "each", bestseller: true },
      { name: "Product Boxes", price: 1.99, unit: "each" },
      { name: "Shipping Boxes", price: 0.99, unit: "each" },
      { name: "Gift Boxes", price: 3.99, unit: "each" },
      { name: "Tissue Paper (branded)", price: 49.99, unit: "500 sheets" },
      { name: "Packing Tape (branded)", price: 39.99, unit: "6 rolls" },
      { name: "Thank You Cards", price: 29.99, unit: "100 cards" },
      { name: "Hang Tags", price: 39.99, unit: "250 tags" },
    ]
  },
  {
    id: "large-format",
    name: "Large Format Printing",
    description: "Go big or go home",
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800",
    products: [
      { name: "Posters (18x24)", price: 14.99, unit: "each", bestseller: true },
      { name: "Posters (24x36)", price: 24.99, unit: "each" },
      { name: "Canvas Prints", price: 49.99, unit: "each" },
      { name: "Window Clings", price: 79.99, unit: "each" },
      { name: "Wall Graphics", price: 99.99, unit: "each" },
      { name: "Floor Graphics", price: 149.99, unit: "each" },
      { name: "Vehicle Wraps", price: 499.99, unit: "partial wrap", premium: true },
      { name: "Trade Show Displays", price: 299.99, unit: "each", premium: true },
    ]
  },
];

export default function PrintShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<{product: string, qty: number, price: number}[]>([]);

  const addToCart = (productName: string, price: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.product === productName);
      if (existing) {
        return prev.map(item => 
          item.product === productName 
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { product: productName, qty: 1, price }];
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <main className="pt-20 min-h-screen bg-pitch-black">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-black to-pitch-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.pexels.com/photos/4792285/pexels-photo-4792285.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Print Shop"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-pitch-gold/20 text-pitch-gold text-sm font-semibold rounded-full mb-6">
            Professional Print Services
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Pitch <span className="text-pitch-gold">Print Shop</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Premium quality printing at competitive prices. From business cards to banners, 
            apparel to packaging — we print it all.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="#products" 
              className="px-8 py-4 bg-pitch-gold text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
            >
              Shop Now
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition"
            >
              Custom Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-pitch-dark/50 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-pitch-gold text-2xl mb-2">🚀</div>
              <p className="text-sm text-gray-300">Fast Turnaround</p>
              <p className="text-xs text-gray-500">2-5 Business Days</p>
            </div>
            <div>
              <div className="text-pitch-gold text-2xl mb-2">✨</div>
              <p className="text-sm text-gray-300">Premium Quality</p>
              <p className="text-xs text-gray-500">Professional Grade</p>
            </div>
            <div>
              <div className="text-pitch-gold text-2xl mb-2">📦</div>
              <p className="text-sm text-gray-300">Free Shipping</p>
              <p className="text-xs text-gray-500">Orders $50+</p>
            </div>
            <div>
              <div className="text-pitch-gold text-2xl mb-2">💯</div>
              <p className="text-sm text-gray-300">Satisfaction Guarantee</p>
              <p className="text-xs text-gray-500">100% Guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Summary (if items in cart) */}
      {cart.length > 0 && (
        <div className="fixed top-24 right-6 z-50 bg-pitch-dark border border-pitch-gold/30 rounded-xl p-4 shadow-xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🛒</span>
            <div>
              <p className="text-white font-semibold">{cartCount} items</p>
              <p className="text-pitch-gold font-bold">${cartTotal.toFixed(2)}</p>
            </div>
          </div>
          <Link 
            href="/contact"
            className="block w-full text-center px-4 py-2 bg-pitch-gold text-black font-semibold rounded-lg hover:bg-yellow-400 transition text-sm"
          >
            Get Quote
          </Link>
        </div>
      )}

      {/* Product Categories */}
      <section id="products" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Shop by <span className="text-pitch-gold">Category</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Click on any category to explore our products. All items can be customized with your logo, 
            artwork, or design.
          </p>

          {/* Category Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )}
                className={`group relative h-48 rounded-xl overflow-hidden text-left transition-all duration-300 ${
                  selectedCategory === category.id 
                    ? 'ring-2 ring-pitch-gold scale-[1.02]' 
                    : 'hover:scale-[1.02]'
                }`}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-bold text-white">{category.name}</h3>
                  <p className="text-sm text-gray-300">{category.description}</p>
                </div>
                {selectedCategory === category.id && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-pitch-gold rounded-full flex items-center justify-center">
                    <span className="text-black text-sm">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Selected Category Products */}
          {selectedCategory && (
            <div className="bg-pitch-dark rounded-xl p-8 border border-white/10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">
                  {categories.find(c => c.id === selectedCategory)?.name}
                </h3>
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="text-gray-400 hover:text-white transition"
                >
                  ✕ Close
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories
                  .find(c => c.id === selectedCategory)
                  ?.products.map((product, idx) => (
                    <div 
                      key={idx}
                      className="bg-pitch-black rounded-lg p-4 border border-white/5 hover:border-pitch-gold/30 transition group"
                    >
                      {product.bestseller && (
                        <span className="inline-block px-2 py-1 bg-pitch-gold text-black text-xs font-semibold rounded mb-2">
                          BESTSELLER
                        </span>
                      )}
                      {product.premium && (
                        <span className="inline-block px-2 py-1 bg-purple-600 text-white text-xs font-semibold rounded mb-2">
                          PREMIUM
                        </span>
                      )}
                      <h4 className="font-semibold text-white mb-1">{product.name}</h4>
                      <p className="text-sm text-gray-400 mb-3">{product.unit}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-pitch-gold font-bold text-lg">
                          ${product.price.toFixed(2)}
                        </span>
                        <button
                          onClick={() => addToCart(product.name, product.price)}
                          className="px-3 py-1 bg-white/10 hover:bg-pitch-gold hover:text-black text-white text-sm font-medium rounded transition"
                        >
                          Add +
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* All Categories Preview (when none selected) */}
          {!selectedCategory && (
            <div className="space-y-12">
              {categories.slice(0, 4).map((category) => (
                <div key={category.id} className="bg-pitch-dark rounded-xl p-6 border border-white/10">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">{category.name}</h3>
                    <button 
                      onClick={() => setSelectedCategory(category.id)}
                      className="text-pitch-gold text-sm hover:underline"
                    >
                      View All →
                    </button>
                  </div>
                  <div className="grid md:grid-cols-4 gap-4">
                    {category.products.slice(0, 4).map((product, idx) => (
                      <div 
                        key={idx}
                        className="bg-pitch-black rounded-lg p-4 border border-white/5 hover:border-pitch-gold/30 transition"
                      >
                        {product.bestseller && (
                          <span className="inline-block px-2 py-1 bg-pitch-gold text-black text-xs font-semibold rounded mb-2">
                            BESTSELLER
                          </span>
                        )}
                        <h4 className="font-semibold text-white text-sm mb-1">{product.name}</h4>
                        <p className="text-xs text-gray-400 mb-2">{product.unit}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-pitch-gold font-bold">
                            ${product.price.toFixed(2)}
                          </span>
                          <button
                            onClick={() => addToCart(product.name, product.price)}
                            className="px-2 py-1 bg-white/10 hover:bg-pitch-gold hover:text-black text-white text-xs font-medium rounded transition"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-pitch-dark">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It <span className="text-pitch-gold">Works</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Choose Products", desc: "Browse our catalog and select what you need" },
              { step: "2", title: "Upload Design", desc: "Upload your artwork or use our design tools" },
              { step: "3", title: "Review & Approve", desc: "We'll send a proof for your approval" },
              { step: "4", title: "Fast Delivery", desc: "Receive your prints in 2-5 business days" },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 bg-pitch-gold text-black font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bulk Pricing */}
      <section className="py-16 px-6 bg-pitch-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Bulk Orders? <span className="text-pitch-gold">Let's Talk</span>
          </h2>
          <p className="text-gray-400 mb-8">
            Need large quantities? We offer significant discounts on bulk orders. 
            Contact us for custom pricing on orders of 1,000+ units.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-pitch-dark rounded-lg p-6 border border-white/10">
              <p className="text-3xl font-bold text-pitch-gold mb-2">10%</p>
              <p className="text-gray-300">Off orders 500+</p>
            </div>
            <div className="bg-pitch-dark rounded-lg p-6 border border-white/10">
              <p className="text-3xl font-bold text-pitch-gold mb-2">20%</p>
              <p className="text-gray-300">Off orders 1,000+</p>
            </div>
            <div className="bg-pitch-dark rounded-lg p-6 border border-white/10">
              <p className="text-3xl font-bold text-pitch-gold mb-2">30%</p>
              <p className="text-gray-300">Off orders 5,000+</p>
            </div>
          </div>
          <Link 
            href="/contact"
            className="inline-block px-8 py-4 bg-pitch-gold text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
          >
            Request Bulk Quote
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-pitch-dark">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our <span className="text-pitch-gold">Customers</span> Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { quote: "Best print quality I've ever received. The business cards look absolutely stunning!", author: "Sarah M.", role: "Startup Founder" },
              { quote: "Fast turnaround and excellent customer service. They handled my rush order perfectly.", author: "Marcus T.", role: "Event Planner" },
              { quote: "We've been using Pitch for all our merch. The quality is consistent every single time.", author: "Jennifer L.", role: "Marketing Director" },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-pitch-black rounded-xl p-6 border border-white/10">
                <div className="text-pitch-gold text-3xl mb-4">"</div>
                <p className="text-gray-300 mb-4">{testimonial.quote}</p>
                <div>
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-b from-pitch-dark to-pitch-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to <span className="text-pitch-gold">Print</span>?
          </h2>
          <p className="text-gray-400 mb-8">
            Don't see what you need? We can print almost anything. Contact us for custom solutions.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/contact"
              className="px-8 py-4 bg-pitch-gold text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
            >
              Get Custom Quote
            </Link>
            <a 
              href="mailto:solutions@pitchmarketing.agency"
              className="px-8 py-4 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition"
            >
              Email Us Directly
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
