import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  console.log("Seeding database...\n");

  // ─── Clear all data ──────────────────────────────────────
  console.log("Clearing existing data...");
  await prisma.couponUsage.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.shipment.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productCollection.deleteMany();
  await prisma.product.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.category.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();
  console.log("Existing data cleared.\n");

  // ─── Categories ──────────────────────────────────────────
  console.log("Seeding categories...");
  const categoryData = [
    { name: "Dresses", slug: "dresses", description: "Elegant dresses for every occasion" },
    { name: "Sarees", slug: "sarees", description: "Traditional and contemporary sarees" },
    { name: "Co-ord Sets", slug: "co-ord-sets", description: "Matching co-ord sets for effortless style" },
    { name: "Tops", slug: "tops", description: "Stylish tops for everyday wear" },
    { name: "Bottoms", slug: "bottoms", description: "Trousers, skirts, and more" },
    { name: "Accessories", slug: "accessories", description: "Complete your look with our accessories" },
    { name: "Ready to Ship", slug: "ready-to-ship", description: "Quick delivery items in stock" },
  ];
  const categories = [];
  for (const cat of categoryData) {
    categories.push(await prisma.category.create({ data: cat }));
  }
  console.log(`  Created ${categories.length} categories.`);

  // ─── Collections ─────────────────────────────────────────
  console.log("Seeding collections...");
  const collectionData = [
    { name: "Signature Collection", slug: "signature-collection", description: "Our iconic signature pieces" },
    { name: "Festive Edit", slug: "festive-edit", description: "Curated for festive celebrations" },
    { name: "Occasion Wear", slug: "occasion-wear", description: "Perfect for special occasions" },
    { name: "Evening Edit", slug: "evening-edit", description: "Sophisticated evening wear" },
    { name: "New Collection", slug: "new-collection", description: "Fresh arrivals just for you" },
  ];
  const collections = [];
  for (const col of collectionData) {
    collections.push(await prisma.collection.create({ data: col }));
  }
  console.log(`  Created ${collections.length} collections.`);

  // ─── Users ───────────────────────────────────────────────
  console.log("Seeding users...");
  const adminPasswordHash = await argon2.hash("admin123");
  const customerPasswordHash = await argon2.hash("customer123");

  const admin = await prisma.user.create({
    data: {
      firstName: "Admin",
      lastName: "Echo",
      email: "admin@echostudio.in",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
      isVerified: true,
    },
  });

  const customer = await prisma.user.create({
    data: {
      firstName: "Priya",
      lastName: "Sharma",
      email: "customer@echostudio.in",
      passwordHash: customerPasswordHash,
      role: "CUSTOMER",
      isVerified: true,
    },
  });
  console.log("  Created admin and customer users.");

  // ─── Helper: create product with images + variants ───────
  async function createProduct(productData, imageUrls, variants) {
    const product = await prisma.product.create({
      data: {
        name: productData.name,
        slug: slugify(productData.name),
        description: productData.description,
        price: productData.price,
        compareAtPrice: productData.compareAtPrice || null,
        discountPercent: productData.discountPercent || 0,
        sku: productData.sku,
        categoryId: productData.categoryId,
        isNewArrival: productData.isNewArrival || false,
        isSale: productData.isSale || false,
        isReadyToShip: productData.isReadyToShip || false,
        isFeatured: productData.isFeatured || false,
        tags: productData.tags || [],
      },
    });

    // Create images
    for (let i = 0; i < imageUrls.length; i++) {
      await prisma.productImage.create({
        data: {
          productId: product.id,
          url: imageUrls[i].url,
          altText: imageUrls[i].alt,
          sortOrder: i,
          isPrimary: i === 0,
        },
      });
    }

    // Create variants
    for (const v of variants) {
      await prisma.productVariant.create({
        data: {
          productId: product.id,
          sku: v.sku,
          color: v.color,
          size: v.size,
          stock: v.stock,
          price: v.price || productData.price,
        },
      });
    }

    return product;
  }

  // ─── Products ────────────────────────────────────────────
  console.log("Seeding products...");

  const dressCatId = categories[0].id;
  const sareeCatId = categories[1].id;
  const accessoryCatId = categories[5].id;
  const bottomCatId = categories[4].id;

  const sigCollection = collections[0].id;
  const festiveCollection = collections[1].id;
  const occasionCollection = collections[2].id;
  const eveningCollection = collections[3].id;
  const newCollection = collections[4].id;

  // 1. Silk Wrap Dress
  const p1 = await createProduct(
    {
      name: "Silk Wrap Dress",
      description:
        "Luxurious silk wrap dress with a flattering silhouette. Features a self-tie waist belt and elegant V-neckline. Perfect for cocktail parties and evening events.",
      price: 2890,
      sku: "ECHO-DRS-001",
      categoryId: dressCatId,
      isReadyToShip: true,
      isFeatured: true,
      tags: ["silk", "wrap", "party-wear", "elegant"],
    },
    [
      { url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600", alt: "Silk Wrap Dress front" },
      { url: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600", alt: "Silk Wrap Dress side" },
    ],
    [
      { sku: "ECHO-DRS-001-BLK-S", color: "Black", size: "S", stock: 25, price: 2890 },
      { sku: "ECHO-DRS-001-BLK-M", color: "Black", size: "M", stock: 30, price: 2890 },
      { sku: "ECHO-DRS-001-BLK-L", color: "Black", size: "L", stock: 20, price: 2890 },
      { sku: "ECHO-DRS-001-WIN-M", color: "Wine", size: "M", stock: 15, price: 2890 },
    ]
  );
  console.log("  1. Silk Wrap Dress created.");

  // 2. Tailored Wool Blazer
  const p2 = await createProduct(
    {
      name: "Tailored Wool Blazer",
      description:
        "Impeccably tailored wool blazer with a modern slim fit. Features notch lapels, single-button closure, and fully lined interior.",
      price: 4250,
      sku: "ECHO-BLZ-001",
      tags: ["wool", "blazer", "formal", "tailored"],
    },
    [
      { url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600", alt: "Tailored Wool Blazer front" },
      { url: "https://images.unsplash.com/photo-1607675796890-5d3b71b3c54a?w=600", alt: "Tailored Wool Blazer detail" },
      { url: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600", alt: "Tailored Wool Blazer back" },
    ],
    [
      { sku: "ECHO-BLZ-001-NAV-S", color: "Navy", size: "S", stock: 18, price: 4250 },
      { sku: "ECHO-BLZ-001-NAV-M", color: "Navy", size: "M", stock: 22, price: 4250 },
      { sku: "ECHO-BLZ-001-NAV-L", color: "Navy", size: "L", stock: 15, price: 4250 },
    ]
  );
  console.log("  2. Tailored Wool Blazer created.");

  // 3. Cashmere Oversized Sweater (SALE)
  const p3 = await createProduct(
    {
      name: "Cashmere Oversized Sweater",
      description:
        "Ultra-soft cashmere oversized sweater for ultimate comfort. Relaxed drop-shoulder design with ribbed hem and cuffs.",
      price: 1950,
      compareAtPrice: 2600,
      discountPercent: 25,
      sku: "ECHO-SWT-001",
      isSale: true,
      isFeatured: true,
      tags: ["cashmere", "sweater", "oversized", "winter"],
    },
    [
      { url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600", alt: "Cashmere Oversized Sweater front" },
      { url: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600", alt: "Cashmere Oversized Sweater detail" },
    ],
    [
      { sku: "ECHO-SWT-001-CRM-S", color: "Cream", size: "S", stock: 35, price: 1950 },
      { sku: "ECHO-SWT-001-CRM-M", color: "Cream", size: "M", stock: 40, price: 1950 },
      { sku: "ECHO-SWT-001-CRM-L", color: "Cream", size: "L", stock: 30, price: 1950 },
      { sku: "ECHO-SWT-001-GRY-M", color: "Grey", size: "M", stock: 25, price: 1950 },
    ]
  );
  console.log("  3. Cashmere Oversized Sweater created.");

  // 4. Linen Wide-Leg Trousers
  const p4 = await createProduct(
    {
      name: "Linen Wide-Leg Trousers",
      description:
        "Breathable linen wide-leg trousers with a high waist and front pleats. Perfect for warm-weather elegance.",
      price: 1750,
      sku: "ECHO-BTM-001",
      categoryId: bottomCatId,
      isReadyToShip: true,
      tags: ["linen", "trousers", "wide-leg", "summer"],
    },
    [
      { url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600", alt: "Linen Wide-Leg Trousers front" },
      { url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600", alt: "Linen Wide-Leg Trousers side" },
    ],
    [
      { sku: "ECHO-BTM-001-WHT-S", color: "White", size: "S", stock: 20, price: 1750 },
      { sku: "ECHO-BTM-001-WHT-M", color: "White", size: "M", stock: 28, price: 1750 },
      { sku: "ECHO-BTM-001-WHT-L", color: "White", size: "L", stock: 18, price: 1750 },
    ]
  );
  console.log("  4. Linen Wide-Leg Trousers created.");

  // 5. Structured Leather Jacket
  const p5 = await createProduct(
    {
      name: "Structured Leather Jacket",
      description:
        "Bold structured leather jacket with asymmetric zip closure. Quilted shoulder panels and inner pocket detail.",
      price: 5950,
      sku: "ECHO-JKT-001",
      isFeatured: true,
      tags: ["leather", "jacket", "biker", "edgy"],
    },
    [
      { url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600", alt: "Structured Leather Jacket front" },
      { url: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=600", alt: "Structured Leather Jacket back" },
      { url: "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=600", alt: "Structured Leather Jacket detail" },
    ],
    [
      { sku: "ECHO-JKT-001-BLK-S", color: "Black", size: "S", stock: 12, price: 5950 },
      { sku: "ECHO-JKT-001-BLK-M", color: "Black", size: "M", stock: 15, price: 5950 },
      { sku: "ECHO-JKT-001-BRK-M", color: "Brown", size: "M", stock: 10, price: 5950 },
    ]
  );
  console.log("  5. Structured Leather Jacket created.");

  // 6. Embroidered Organza Saree
  const p6 = await createProduct(
    {
      name: "Embroidered Organza Saree",
      description:
        "Stunning embroidered organza saree with intricate floral motifs. Includes matching blouse piece. Lightweight and ethereal.",
      price: 8500,
      sku: "ECHO-SAR-001",
      categoryId: sareeCatId,
      isFeatured: true,
      tags: ["organza", "saree", "embroidered", "festive"],
    },
    [
      { url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600", alt: "Embroidered Organza Saree front" },
      { url: "https://images.unsplash.com/photo-1614701371860-d0ad8bbfe8f7?w=600", alt: "Embroidered Organza Saree drape" },
      { url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600", alt: "Embroidered Organza Saree detail" },
    ],
    [
      { sku: "ECHO-SAR-001-PIK-OS", color: "Pink", size: "OS", stock: 10, price: 8500 },
      { sku: "ECHO-SAR-001-IVR-OS", color: "Ivory", size: "OS", stock: 8, price: 8500 },
      { sku: "ECHO-SAR-001-BLU-OS", color: "Powder Blue", size: "OS", stock: 12, price: 8500 },
    ]
  );
  console.log("  6. Embroidered Organza Saree created.");

  // 7. Merino Wool Turtleneck (SALE)
  const p7 = await createProduct(
    {
      name: "Merino Wool Turtleneck",
      description:
        "Classic merino wool turtleneck with a refined knit texture. Slim fit with ribbed cuffs and hem for a polished look.",
      price: 1450,
      compareAtPrice: 1950,
      discountPercent: 26,
      sku: "ECHO-SWT-002",
      isSale: true,
      tags: ["merino", "turtleneck", "winter", "classic"],
    },
    [
      { url: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a5f?w=600", alt: "Merino Wool Turtleneck front" },
      { url: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600", alt: "Merino Wool Turtleneck detail" },
    ],
    [
      { sku: "ECHO-SWT-002-BLK-S", color: "Black", size: "S", stock: 30, price: 1450 },
      { sku: "ECHO-SWT-002-BLK-M", color: "Black", size: "M", stock: 35, price: 1450 },
      { sku: "ECHO-SWT-002-BLK-L", color: "Black", size: "L", stock: 25, price: 1450 },
      { sku: "ECHO-SWT-002-CML-M", color: "Camel", size: "M", stock: 20, price: 1450 },
    ]
  );
  console.log("  7. Merino Wool Turtleneck created.");

  // 8. Pleated Midi Skirt
  const p8 = await createProduct(
    {
      name: "Pleated Midi Skirt",
      description:
        "Graceful pleated midi skirt in fluid satin fabric. Elasticated waistband for comfort with a flirty hemline.",
      price: 1650,
      sku: "ECHO-SKT-001",
      categoryId: bottomCatId,
      isReadyToShip: true,
      tags: ["pleated", "midi", "skirt", "feminine"],
    },
    [
      { url: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600", alt: "Pleated Midi Skirt front" },
      { url: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600", alt: "Pleated Midi Skirt movement" },
    ],
    [
      { sku: "ECHO-SKT-001-BLK-S", color: "Black", size: "S", stock: 22, price: 1650 },
      { sku: "ECHO-SKT-001-BLK-M", color: "Black", size: "M", stock: 28, price: 1650 },
      { sku: "ECHO-SKT-001-OLV-M", color: "Olive", size: "M", stock: 18, price: 1650 },
    ]
  );
  console.log("  8. Pleated Midi Skirt created.");

  // 9. Classic Denim Jacket
  const p9 = await createProduct(
    {
      name: "Classic Denim Jacket",
      description:
        "Timeless denim jacket in premium selvedge denim. Button-front closure with chest pockets. A wardrobe essential.",
      price: 3200,
      sku: "ECHO-JKT-002",
      isReadyToShip: true,
      tags: ["denim", "jacket", "casual", "classic"],
    },
    [
      { url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600", alt: "Classic Denim Jacket front" },
      { url: "https://images.unsplash.com/photo-1604026456831-4c1e1b6b1f1e?w=600", alt: "Classic Denim Jacket back" },
    ],
    [
      { sku: "ECHO-JKT-002-BLU-S", color: "Blue", size: "S", stock: 20, price: 3200 },
      { sku: "ECHO-JKT-002-BLU-M", color: "Blue", size: "M", stock: 25, price: 3200 },
      { sku: "ECHO-JKT-002-BLU-L", color: "Blue", size: "L", stock: 18, price: 3200 },
    ]
  );
  console.log("  9. Classic Denim Jacket created.");

  // 10. Chiffon Floral Maxi Dress
  const p10 = await createProduct(
    {
      name: "Chiffon Floral Maxi Dress",
      description:
        "Dreamy chiffon floral maxi dress with flowing layers. Features a flattering empire waist and delicate print.",
      price: 4500,
      sku: "ECHO-DRS-002",
      categoryId: dressCatId,
      isFeatured: true,
      tags: ["chiffon", "floral", "maxi", "romantic"],
    },
    [
      { url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600", alt: "Chiffon Floral Maxi Dress front" },
      { url: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600", alt: "Chiffon Floral Maxi Dress flow" },
      { url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600", alt: "Chiffon Floral Maxi Dress detail" },
    ],
    [
      { sku: "ECHO-DRS-002-BLU-S", color: "Blue Floral", size: "S", stock: 15, price: 4500 },
      { sku: "ECHO-DRS-002-BLU-M", color: "Blue Floral", size: "M", stock: 20, price: 4500 },
      { sku: "ECHO-DRS-002-PNK-M", color: "Pink Floral", size: "M", stock: 18, price: 4500 },
      { sku: "ECHO-DRS-002-PNK-L", color: "Pink Floral", size: "L", stock: 12, price: 4500 },
    ]
  );
  console.log("  10. Chiffon Floral Maxi Dress created.");

  // 11. Pearl Embellished Clutch
  const p11 = await createProduct(
    {
      name: "Pearl Embellished Clutch",
      description:
        "Elegant pearl-embellished clutch with satin lining. Detachable chain strap for versatile carrying options.",
      price: 2200,
      sku: "ECHO-ACC-001",
      categoryId: accessoryCatId,
      isReadyToShip: true,
      tags: ["clutch", "pearl", "evening", "accessory"],
    },
    [
      { url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600", alt: "Pearl Embellished Clutch front" },
      { url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600", alt: "Pearl Embellished Clutch detail" },
    ],
    [
      { sku: "ECHO-ACC-001-WHT-OS", color: "White", size: "OS", stock: 40, price: 2200 },
      { sku: "ECHO-ACC-001-BLK-OS", color: "Black", size: "OS", stock: 35, price: 2200 },
    ]
  );
  console.log("  11. Pearl Embellished Clutch created.");

  // 12. ECHO Luna Dress (NEW)
  const p12 = await createProduct(
    {
      name: "ECHO Luna Dress",
      description:
        "The signature ECHO Luna dress featuring an asymmetrical hem, architectural draping, and a luxe crepe fabric. A showstopper for any event.",
      price: 3800,
      sku: "ECHO-DRS-003",
      categoryId: dressCatId,
      isNewArrival: true,
      isFeatured: true,
      tags: ["luna", "signature", "new", "statement"],
    },
    [
      { url: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600", alt: "ECHO Luna Dress front" },
      { url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600", alt: "ECHO Luna Dress side" },
      { url: "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=600", alt: "ECHO Luna Dress detail" },
    ],
    [
      { sku: "ECHO-DRS-003-BLK-S", color: "Black", size: "S", stock: 20, price: 3800 },
      { sku: "ECHO-DRS-003-BLK-M", color: "Black", size: "M", stock: 25, price: 3800 },
      { sku: "ECHO-DRS-003-BLK-L", color: "Black", size: "L", stock: 18, price: 3800 },
      { sku: "ECHO-DRS-003-RST-M", color: "Rust", size: "M", stock: 15, price: 3800 },
    ]
  );
  console.log("  12. ECHO Luna Dress created.");

  // ─── Assign products to collections ──────────────────────
  console.log("Assigning products to collections...");

  // Signature Collection: p1 (Silk Wrap), p6 (Organza Saree), p12 (Luna)
  await prisma.productCollection.createMany({
    data: [
      { productId: p1.id, collectionId: sigCollection },
      { productId: p6.id, collectionId: sigCollection },
      { productId: p12.id, collectionId: sigCollection },
    ],
  });

  // Festive Edit: p6 (Organza Saree), p10 (Chiffon Maxi)
  await prisma.productCollection.createMany({
    data: [
      { productId: p6.id, collectionId: festiveCollection },
      { productId: p10.id, collectionId: festiveCollection },
    ],
  });

  // Occasion Wear: p1 (Silk Wrap), p5 (Leather Jacket), p10 (Chiffon Maxi), p12 (Luna)
  await prisma.productCollection.createMany({
    data: [
      { productId: p1.id, collectionId: occasionCollection },
      { productId: p5.id, collectionId: occasionCollection },
      { productId: p10.id, collectionId: occasionCollection },
      { productId: p12.id, collectionId: occasionCollection },
    ],
  });

  // Evening Edit: p1 (Silk Wrap), p2 (Blazer), p5 (Leather Jacket), p11 (Clutch)
  await prisma.productCollection.createMany({
    data: [
      { productId: p1.id, collectionId: eveningCollection },
      { productId: p2.id, collectionId: eveningCollection },
      { productId: p5.id, collectionId: eveningCollection },
      { productId: p11.id, collectionId: eveningCollection },
    ],
  });

  // New Collection: p12 (Luna), p4 (Linen Trousers), p8 (Pleated Skirt)
  await prisma.productCollection.createMany({
    data: [
      { productId: p12.id, collectionId: newCollection },
      { productId: p4.id, collectionId: newCollection },
      { productId: p8.id, collectionId: newCollection },
    ],
  });
  console.log("  Products assigned to collections.");

  // ─── Coupons ─────────────────────────────────────────────
  console.log("Seeding coupons...");
  await prisma.coupon.createMany({
    data: [
      {
        code: "ECHO10",
        description: "10% off on your order",
        discountType: "PERCENTAGE",
        discountValue: 10,
        minimumOrderAmount: 1000,
        maximumDiscount: 500,
        isActive: true,
      },
      {
        code: "FLAT500",
        description: "Flat ₹500 off on orders above ₹3000",
        discountType: "FIXED_AMOUNT",
        discountValue: 500,
        minimumOrderAmount: 3000,
        isActive: true,
      },
    ],
  });
  console.log("  Created 2 coupons.");

  // ─── Done ────────────────────────────────────────────────
  console.log("\nSeeding complete!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
