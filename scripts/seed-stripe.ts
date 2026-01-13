import "dotenv/config";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

async function upsertProduct(name: string, description: string) {
  const list = await stripe.products.list({ limit: 100 });
  const existing = list.data.find((p) => p.name === name);

  if (existing) {
    console.log(`✔ Product exists: ${name}`);
    return existing.id;
  }

  const created = await stripe.products.create({ name, description });
  console.log(`➕ Product created: ${name}`);
  return created.id;
}

async function upsertPrice(
  productId: string,
  amount: number,
  interval: "month" | "year" | "one_time",
  nickname?: string
) {
  const list = await stripe.prices.list({ product: productId, limit: 100 });
  const existing = list.data.find(
    (p) =>
      p.unit_amount === amount * 100 &&
      (interval === "one_time"
        ? !p.recurring
        : p.recurring?.interval === interval)
  );

  if (existing) {
    console.log(`  ✔ Price exists: $${amount}/${interval}`);
    return existing.id;
  }

  const priceData: Stripe.PriceCreateParams = {
    product: productId,
    unit_amount: amount * 100,
    currency: "usd",
    nickname,
  };

  if (interval !== "one_time") {
    priceData.recurring = { interval };
  }

  const price = await stripe.prices.create(priceData);
  console.log(`  ➕ Price created: $${amount}/${interval}`);
  return price.id;
}

async function seed() {
  console.log("🚀 Starting Stripe seed...\n");

  // ==============================================
  // SaaS SUBSCRIPTION TIERS (LEVEL10)
  // ==============================================
  console.log("📦 Creating SaaS subscription tiers...");

  const saasPlans = [
    { name: "LEVEL10 Starter", desc: "Starter SaaS plan - Perfect for solopreneurs", monthly: 39, yearly: 399 },
    { name: "LEVEL10 Business", desc: "Business SaaS plan - Growing businesses", monthly: 79, yearly: 799 },
    { name: "LEVEL10 Pro", desc: "Pro SaaS plan - Professional agencies", monthly: 149, yearly: 1499 },
    { name: "LEVEL10 Enterprise", desc: "Enterprise SaaS plan - Large organizations", monthly: 249, yearly: 2499 },
  ];

  for (const plan of saasPlans) {
    const productId = await upsertProduct(plan.name, plan.desc);
    await upsertPrice(productId, plan.monthly, "month", `${plan.name} Monthly`);
    await upsertPrice(productId, plan.yearly, "year", `${plan.name} Annual`);
  }

  // ==============================================
  // ADD-ONS
  // ==============================================
  console.log("\n📦 Creating add-ons...");

  const addons = [
    { name: "Additional User Seat", desc: "Extra user license for your organization", price: 15, interval: "month" as const },
    { name: "AI Avatar Engine", desc: "AI-powered avatar video creation", price: 29, interval: "month" as const },
    { name: "Marketing Package", desc: "Monthly marketing retainer", price: 149, interval: "month" as const },
    { name: "SMS Bundle 1,000", desc: "1,000 SMS credits", price: 20, interval: "one_time" as const },
    { name: "SMS Bundle 5,000", desc: "5,000 SMS credits", price: 75, interval: "one_time" as const },
  ];

  for (const addon of addons) {
    const productId = await upsertProduct(addon.name, addon.desc);
    await upsertPrice(productId, addon.price, addon.interval);
  }

  // ==============================================
  // AGENCY ONE-TIME SERVICES
  // ==============================================
  console.log("\n📦 Creating agency services...");

  const services = [
    { name: "Website Design — Starter", desc: "Basic branding + landing page", price: 500 },
    { name: "Website Design — Business", desc: "Full business website with 5-7 pages", price: 1000 },
    { name: "Website Design — Premium", desc: "Advanced professional website with integrations", price: 2500 },
    { name: "Website Design — Elite", desc: "Enterprise-level site + full branding package", price: 3500 },
    { name: "Logo Design (Standard)", desc: "Professional logo with 2 revisions", price: 150 },
    { name: "Logo Design (Premium)", desc: "Full brand identity package", price: 350 },
    { name: "Brand Kit Add-on", desc: "Colors, fonts, and brand guidelines", price: 97 },
    { name: "Social Media Setup", desc: "Complete social media profile optimization", price: 197 },
    { name: "Video Commercial — Basic", desc: "30-second promotional video", price: 500 },
    { name: "Video Commercial — Pro", desc: "60-second premium video production", price: 1200 },
    { name: "AI Avatar Video", desc: "Custom AI spokesperson video", price: 97 },
    { name: "Consulting Session — 1 Hour", desc: "One-on-one business strategy session", price: 197 },
    { name: "Consulting Session — Half Day", desc: "4-hour intensive workshop", price: 497 },
  ];

  for (const svc of services) {
    const productId = await upsertProduct(svc.name, svc.desc);
    await upsertPrice(productId, svc.price, "one_time");
  }

  // ==============================================
  // PRINT PRODUCTS (From Pitch Market Strategies Price Book)
  // ==============================================
  console.log("\n📦 Creating print products...");

  const printProducts = [
    // Banners
    { name: "Vinyl Banner 2x4", desc: "2ft x 4ft outdoor vinyl banner with grommets", price: 35 },
    { name: "Vinyl Banner 3x6", desc: "3ft x 6ft outdoor vinyl banner with grommets", price: 55 },
    { name: "Vinyl Banner 4x8", desc: "4ft x 8ft outdoor vinyl banner with grommets", price: 85 },
    { name: "Retractable Banner Stand", desc: "33\" x 81\" retractable banner with stand", price: 125 },
    { name: "X-Frame Banner Stand", desc: "24\" x 63\" X-frame banner with stand", price: 65 },

    // Stickers & Labels
    { name: "Stickers — 100 Pack (2\")", desc: "100 custom die-cut vinyl stickers 2\"", price: 45 },
    { name: "Stickers — 250 Pack (2\")", desc: "250 custom die-cut vinyl stickers 2\"", price: 85 },
    { name: "Stickers — 500 Pack (2\")", desc: "500 custom die-cut vinyl stickers 2\"", price: 125 },
    { name: "Stickers — 1000 Pack (2\")", desc: "1000 custom die-cut vinyl stickers 2\"", price: 175 },
    { name: "Label Sheets — 100", desc: "100 custom product labels", price: 35 },
    { name: "Label Sheets — 500", desc: "500 custom product labels", price: 95 },

    // Business Cards
    { name: "Business Cards — 250", desc: "250 premium business cards 16pt matte", price: 35 },
    { name: "Business Cards — 500", desc: "500 premium business cards 16pt matte", price: 55 },
    { name: "Business Cards — 1000", desc: "1000 premium business cards 16pt matte", price: 85 },
    { name: "Business Cards Foil — 250", desc: "250 foil-accented business cards", price: 65 },

    // Flyers & Postcards
    { name: "Flyers 8.5x11 — 100", desc: "100 full-color flyers", price: 45 },
    { name: "Flyers 8.5x11 — 500", desc: "500 full-color flyers", price: 95 },
    { name: "Flyers 8.5x11 — 1000", desc: "1000 full-color flyers", price: 145 },
    { name: "Postcards 4x6 — 250", desc: "250 full-color postcards", price: 55 },
    { name: "Postcards 4x6 — 500", desc: "500 full-color postcards", price: 85 },
    { name: "Postcards 4x6 — 1000", desc: "1000 full-color postcards", price: 125 },

    // Signs
    { name: "Yard Sign 18x24", desc: "Coroplast yard sign with H-stake", price: 25 },
    { name: "Yard Signs 18x24 — 10 Pack", desc: "10 coroplast yard signs with H-stakes", price: 175 },
    { name: "Yard Signs 18x24 — 25 Pack", desc: "25 coroplast yard signs with H-stakes", price: 375 },
    { name: "Foam Board Sign 18x24", desc: "3/16\" foam board sign", price: 35 },
    { name: "Aluminum Sign 18x24", desc: "Durable aluminum composite sign", price: 55 },

    // Posters
    { name: "Poster 18x24", desc: "Full-color poster print", price: 15 },
    { name: "Poster 24x36", desc: "Large format poster print", price: 25 },
    { name: "Canvas Print 16x20", desc: "Gallery-wrapped canvas print", price: 65 },
    { name: "Canvas Print 24x36", desc: "Large gallery-wrapped canvas", price: 125 },

    // Vehicle & Window
    { name: "Vehicle Magnet 12x18", desc: "Magnetic car sign", price: 35 },
    { name: "Vehicle Magnet 18x24", desc: "Large magnetic car sign", price: 55 },
    { name: "Window Decal — Small", desc: "Custom window cling up to 12\"", price: 25 },
    { name: "Window Decal — Large", desc: "Custom window cling up to 36\"", price: 65 },
    { name: "Vehicle Wrap — Partial", desc: "Partial vehicle wrap installation", price: 750 },
    { name: "Vehicle Wrap — Full", desc: "Full vehicle wrap design and installation", price: 2500 },

    // Apparel
    { name: "Custom T-Shirt", desc: "Single custom printed t-shirt", price: 25 },
    { name: "Custom T-Shirts — 12 Pack", desc: "12 custom printed t-shirts", price: 180 },
    { name: "Custom T-Shirts — 25 Pack", desc: "25 custom printed t-shirts", price: 325 },
    { name: "Custom Hoodie", desc: "Single custom printed hoodie", price: 45 },
    { name: "Custom Hat — Embroidered", desc: "Embroidered custom cap", price: 25 },
    { name: "Custom Hats — 12 Pack", desc: "12 embroidered custom caps", price: 240 },

    // Promotional Items
    { name: "Custom Pens — 100 Pack", desc: "100 custom printed pens", price: 95 },
    { name: "Custom Notepads — 25 Pack", desc: "25 custom notepads", price: 125 },
    { name: "Custom Mugs — 12 Pack", desc: "12 custom printed mugs", price: 145 },
    { name: "Custom Tote Bags — 25 Pack", desc: "25 custom canvas tote bags", price: 225 },
  ];

  for (const product of printProducts) {
    const productId = await upsertProduct(product.name, product.desc);
    await upsertPrice(productId, product.price, "one_time");
  }

  // ==============================================
  // BeCovered.life INSURANCE PLANS
  // ==============================================
  console.log("\n📦 Creating BeCovered.life plans...");

  const insurancePlans = [
    { name: "BeCovered Basic", desc: "Basic coverage consultation", monthly: 10, yearly: 99 },
    { name: "BeCovered Standard", desc: "Standard coverage with support", monthly: 19, yearly: 199 },
    { name: "BeCovered Premium", desc: "Premium full-service coverage", monthly: 39, yearly: 399 },
    { name: "BeCovered Elite", desc: "Elite concierge coverage service", monthly: 97, yearly: 997 },
  ];

  for (const plan of insurancePlans) {
    const productId = await upsertProduct(plan.name, plan.desc);
    await upsertPrice(productId, plan.monthly, "month");
    await upsertPrice(productId, plan.yearly, "year");
  }

  // ==============================================
  // SaxtaxPro PLANS
  // ==============================================
  console.log("\n📦 Creating SaxtaxPro plans...");

  const taxPlans = [
    { name: "SaxtaxPro Basic", desc: "Basic tax preparation support", monthly: 10, yearly: 99 },
    { name: "SaxtaxPro Pro", desc: "Professional tax services", monthly: 97, yearly: 997 },
    { name: "SaxtaxPro Business", desc: "Business tax services", monthly: 197, yearly: 1997 },
  ];

  for (const plan of taxPlans) {
    const productId = await upsertProduct(plan.name, plan.desc);
    await upsertPrice(productId, plan.monthly, "month");
    await upsertPrice(productId, plan.yearly, "year");
  }

  console.log("\n🎉 Stripe catalog seeded successfully!");
  console.log("📊 Total products created across all categories");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
