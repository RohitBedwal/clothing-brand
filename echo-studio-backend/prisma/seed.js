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
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();
  console.log("Existing data cleared.\n");

  // ─── Categories (Parent → Subcategory hierarchy) ─────────
  console.log("Seeding categories...");

  const parentCategories = [
    { name: "Women", description: "Women's fashion collection" },
    { name: "Men", description: "Men's fashion collection" },
    { name: "Kids", description: "Kids' fashion collection" },
  ];

  const womenSubcategories = [
    "Dresses", "Tops", "Bottoms", "Sarees", "Co-ord Sets", "Jumpsuits", "Accessories"
  ];
  const menSubcategories = [
    "Shirts", "T-Shirts", "Trousers", "Jackets", "Co-ord Sets", "Accessories"
  ];
  const kidsSubcategories = [
    "Dresses", "T-Shirts", "Trousers", "Sets"
  ];

  const categories = {};
  for (const p of parentCategories) {
    const cat = await prisma.category.create({
      data: { name: p.name, slug: slugify(p.name), description: p.description },
    });
    categories[p.name] = cat;
  }

  const subcategoryMap = {
    Women: womenSubcategories,
    Men: menSubcategories,
    Kids: kidsSubcategories,
  };

  for (const [parentName, subs] of Object.entries(subcategoryMap)) {
    for (const subName of subs) {
      const subSlug = slugify(`${parentName}-${subName}`);
      const sub = await prisma.category.create({
        data: {
          name: subName,
          slug: subSlug,
          description: `${subName} for ${parentName.toLowerCase()}`,
          parentId: categories[parentName].id,
        },
      });
      categories[`${parentName}/${subName}`] = sub;
    }
  }
  console.log(`  Created ${Object.keys(categories).length} categories (3 parents + subcategories).`);

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
        slug: slugify(productData.name) + "-" + Math.random().toString(36).slice(2, 6),
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
  let productCount = 0;

  // Women / Dresses
  const lunaDress = await createProduct(
    { name: "ECHO Luna Dress", description: "The signature ECHO Luna dress featuring an asymmetrical hem, architectural draping, and a luxe crepe fabric. A showstopper for any event.", price: 3800, sku: "ECHO-DRS-001", categoryId: categories["Women/Dresses"].id, isNewArrival: true, isFeatured: true, tags: ["dress", "crepe", "signature"] },
    [
      { url: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600", alt: "Luna Dress front" },
      { url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600", alt: "Luna Dress side" },
      { url: "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=600", alt: "Luna Dress detail" },
    ],
    [
      { sku: "ECHO-DRS-001-BLK-S", color: "Black", size: "S", stock: 20, price: 3800 },
      { sku: "ECHO-DRS-001-BLK-M", color: "Black", size: "M", stock: 25, price: 3800 },
      { sku: "ECHO-DRS-001-BLK-L", color: "Black", size: "L", stock: 18, price: 3800 },
      { sku: "ECHO-DRS-001-RST-M", color: "Rust", size: "M", stock: 15, price: 3800 },
    ]
  );
  productCount++;

  const silkWrapDress = await createProduct(
    { name: "ECHO Silk Wrap Dress", description: "Luxurious silk wrap dress with a flattering V-neckline and adjustable waist tie. Perfect for cocktail events.", price: 4200, sku: "ECHO-DRS-002", categoryId: categories["Women/Dresses"].id, isFeatured: true, tags: ["dress", "silk", "wrap"] },
    [
      { url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600", alt: "Silk Wrap Dress" },
      { url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600", alt: "Silk Wrap Dress detail" },
    ],
    [
      { sku: "ECHO-DRS-002-IVR-S", color: "Ivory", size: "S", stock: 12, price: 4200 },
      { sku: "ECHO-DRS-002-IVR-M", color: "Ivory", size: "M", stock: 18, price: 4200 },
      { sku: "ECHO-DRS-002-BLK-M", color: "Black", size: "M", stock: 14, price: 4200 },
    ]
  );
  productCount++;

  // Women / Tops
  const drapedBlouse = await createProduct(
    { name: "ECHO Draped Satin Blouse", description: "Effortlessly elegant draped blouse in premium satin. Features a relaxed fit with a subtle sheen.", price: 1800, sku: "ECHO-TOP-001", categoryId: categories["Women/Tops"].id, isNewArrival: true, tags: ["top", "satin", "blouse"] },
    [
      { url: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600", alt: "Draped Satin Blouse" },
    ],
    [
      { sku: "ECHO-TOP-001-CHM-S", color: "Champagne", size: "S", stock: 20, price: 1800 },
      { sku: "ECHO-TOP-001-CHM-M", color: "Champagne", size: "M", stock: 22, price: 1800 },
      { sku: "ECHO-TOP-001-BLK-M", color: "Black", size: "M", stock: 18, price: 1800 },
    ]
  );
  productCount++;

  // Women / Bottoms
  const pleatedSkirt = await createProduct(
    { name: "ECHO Pleated Midi Skirt", description: "Classic pleated midi skirt in lightweight fabric. Flows beautifully with every step.", price: 2200, sku: "ECHO-BTM-001", categoryId: categories["Women/Bottoms"].id, tags: ["skirt", "pleated", "midi"] },
    [
      { url: "https://images.unsplash.com/photo-1583496661160-fb5886a0afe0?w=600", alt: "Pleated Midi Skirt" },
    ],
    [
      { sku: "ECHO-BTM-001-NVY-S", color: "Navy", size: "S", stock: 15, price: 2200 },
      { sku: "ECHO-BTM-001-NVY-M", color: "Navy", size: "M", stock: 20, price: 2200 },
      { sku: "ECHO-BTM-001-BLK-M", color: "Black", size: "M", stock: 16, price: 2200 },
    ]
  );
  productCount++;

  // Men / Shirts
  const cottonShirt = await createProduct(
    { name: "ECHO Cotton Poplin Shirt", description: "Premium cotton poplin shirt with a tailored fit. A wardrobe essential for the modern man.", price: 1650, sku: "ECHO-SHT-001", categoryId: categories["Men/Shirts"].id, isFeatured: true, tags: ["shirt", "cotton", "poplin"] },
    [
      { url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600", alt: "Cotton Poplin Shirt" },
    ],
    [
      { sku: "ECHO-SHT-001-WHT-S", color: "White", size: "S", stock: 25, price: 1650 },
      { sku: "ECHO-SHT-001-WHT-M", color: "White", size: "M", stock: 30, price: 1650 },
      { sku: "ECHO-SHT-001-WHT-L", color: "White", size: "L", stock: 20, price: 1650 },
      { sku: "ECHO-SHT-001-BLU-M", color: "Blue", size: "M", stock: 18, price: 1650 },
    ]
  );
  productCount++;

  // Men / T-Shirts
  const ribbedPolo = await createProduct(
    { name: "ECHO Ribbed Knit Polo", description: "Smart casual ribbed knit polo in soft cotton blend. Subtle texture for elevated everyday wear.", price: 1350, sku: "ECHO-TSH-001", categoryId: categories["Men/T-Shirts"].id, tags: ["polo", "knit", "ribbed"] },
    [
      { url: "https://images.unsplash.com/photo-1625910513413-5fc3e91f9397?w=600", alt: "Ribbed Knit Polo" },
    ],
    [
      { sku: "ECHO-TSH-001-GRY-S", color: "Grey", size: "S", stock: 20, price: 1350 },
      { sku: "ECHO-TSH-001-GRY-M", color: "Grey", size: "M", stock: 25, price: 1350 },
      { sku: "ECHO-TSH-001-NVY-M", color: "Navy", size: "M", stock: 22, price: 1350 },
    ]
  );
  productCount++;

  // Men / Trousers
  const slimChinos = await createProduct(
    { name: "ECHO Slim Fit Chinos", description: "Tailored slim fit chinos in stretch cotton. Clean lines for a polished look.", price: 1850, sku: "ECHO-TRN-001", categoryId: categories["Men/Trousers"].id, tags: ["chinos", "slim", "trousers"] },
    [
      { url: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600", alt: "Slim Fit Chinos" },
    ],
    [
      { sku: "ECHO-TRN-001-KHK-S", color: "Khaki", size: "S", stock: 18, price: 1850 },
      { sku: "ECHO-TRN-001-KHK-M", color: "Khaki", size: "M", stock: 22, price: 1850 },
      { sku: "ECHO-TRN-001-BLK-M", color: "Black", size: "M", stock: 20, price: 1850 },
    ]
  );
  productCount++;

  // Men / Jackets
  const woolBlazer = await createProduct(
    { name: "ECHO Tailored Wool Blazer", description: "Impeccably tailored wool blazer. A statement piece for formal and semi-formal occasions.", price: 5500, sku: "ECHO-JKT-001", categoryId: categories["Men/Jackets"].id, isNewArrival: true, isFeatured: true, tags: ["blazer", "wool", "tailored"] },
    [
      { url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600", alt: "Wool Blazer" },
      { url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600", alt: "Wool Blazer detail" },
    ],
    [
      { sku: "ECHO-JKT-001-CHM-S", color: "Charcoal", size: "S", stock: 10, price: 5500 },
      { sku: "ECHO-JKT-001-CHM-M", color: "Charcoal", size: "M", stock: 14, price: 5500 },
      { sku: "ECHO-JKT-001-NVY-M", color: "Navy", size: "M", stock: 12, price: 5500 },
    ]
  );
  productCount++;

  // Women / Co-ord Sets
  const coordSet = await createProduct(
    { name: "ECHO Linen Flare Co-ord", description: "Relaxed linen co-ord set with a crop top and flare pants. Summer perfection.", price: 3200, sku: "ECHO-CRD-001", categoryId: categories["Women/Co-ord Sets"].id, isNewArrival: true, tags: ["coord", "linen", "summer"] },
    [
      { url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600", alt: "Linen Flare Co-ord" },
    ],
    [
      { sku: "ECHO-CRD-001-WHT-S", color: "White", size: "S", stock: 12, price: 3200 },
      { sku: "ECHO-CRD-001-WHT-M", color: "White", size: "M", stock: 16, price: 3200 },
      { sku: "ECHO-CRD-001-SND-M", color: "Sand", size: "M", stock: 14, price: 3200 },
    ]
  );
  productCount++;

  // Women / Jumpsuits
  const wrapJumpsuit = await createProduct(
    { name: "ECHO Wrap Front Jumpsuit", description: "Flattering wrap-front jumpsuit in crepe. One piece, endless style.", price: 3500, sku: "ECHO-JMP-001", categoryId: categories["Women/Jumpsuits"].id, tags: ["jumpsuit", "wrap", "crepe"] },
    [
      { url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600", alt: "Wrap Front Jumpsuit" },
    ],
    [
      { sku: "ECHO-JMP-001-BLK-S", color: "Black", size: "S", stock: 10, price: 3500 },
      { sku: "ECHO-JMP-001-BLK-M", color: "Black", size: "M", stock: 14, price: 3500 },
    ]
  );
  productCount++;

  // Kids / T-Shirts
  const kidsTee = await createProduct(
    { name: "ECHO Kids Cotton Tee", description: "Soft organic cotton t-shirt for kids. Fun colors, lasting comfort.", price: 650, sku: "ECHO-KID-001", categoryId: categories["Kids/T-Shirts"].id, tags: ["kids", "t-shirt", "cotton"] },
    [
      { url: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600", alt: "Kids Cotton Tee" },
    ],
    [
      { sku: "ECHO-KID-001-WHT-4Y", color: "White", size: "4Y", stock: 20, price: 650 },
      { sku: "ECHO-KID-001-WHT-6Y", color: "White", size: "6Y", stock: 18, price: 650 },
      { sku: "ECHO-KID-001-BLU-6Y", color: "Blue", size: "6Y", stock: 15, price: 650 },
    ]
  );
  productCount++;

  console.log(`  Created ${productCount} products.`);

  // ─── Coupons ─────────────────────────────────────────────
  console.log("Seeding coupons...");
  const coupons = [
    { code: "WELCOME10", discountType: "PERCENTAGE", discountValue: 10, minimumOrderAmount: 1000, usageLimit: 100 },
    { code: "FLAT500", discountType: "FIXED_AMOUNT", discountValue: 500, minimumOrderAmount: 3000, usageLimit: 50 },
  ];
  for (const c of coupons) {
    await prisma.coupon.create({ data: c });
  }
  console.log(`  Created ${coupons.length} coupons.`);

  console.log("\nSeed complete!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
