import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const banners = [
  {
    title: "Summer Collection",
    subtitle: "Discover the latest trends for the season",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&h=800&fit=crop",
    link: "/new-arrivals",
    position: 0,
  },
  {
    title: "Elevate Your Style",
    subtitle: "Premium essentials crafted for the modern wardrobe",
    imageUrl: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=800&fit=crop",
    link: "/shop",
    position: 1,
  },
  {
    title: "The New Edit",
    subtitle: "Fresh arrivals you won't want to miss",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&h=800&fit=crop&q=80",
    link: "/new-arrivals",
    position: 2,
  },
  {
    title: "Sale Up To 50% Off",
    subtitle: "Limited time offers on selected styles",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=800&fit=crop",
    link: "/sale",
    position: 3,
  },
  {
    title: "Free Shipping",
    subtitle: "On all orders above ₹2,999",
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&h=800&fit=crop",
    link: "/ready-to-ship",
    position: 4,
  },
  {
    title: "Echo Studio Basics",
    subtitle: "Timeless pieces for everyday wear",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1920&h=800&fit=crop",
    link: "/categories",
    position: 5,
  },
];

async function main() {
  try {
    console.log("Seeding banners...");

    // Clear existing banners
    await prisma.banner.deleteMany();

    for (const banner of banners) {
      await prisma.banner.create({ data: banner });
      console.log(`  ✓ ${banner.title}`);
    }

    console.log(`Seeded ${banners.length} banners.`);
  } catch (error) {
    console.error("Seed error:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
