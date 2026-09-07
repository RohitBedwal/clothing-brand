import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const sizes = ["XS", "S", "M", "L", "XL"];
const kidsSizes = ["2Y", "4Y", "6Y", "8Y", "10Y"];
const colors = ["Black", "White", "Navy", "Grey", "Beige"];

async function main() {
  console.log("Seeding additional products...\n");

  const categories = {};
  const allCategories = await prisma.category.findMany();
  for (const cat of allCategories) {
    categories[cat.slug] = cat;
  }

  console.log(`Found ${Object.keys(categories).length} categories.`);

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
          url: imageUrls[i],
          altText: productData.name,
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

  function makeVariants(skuPrefix, price, availableSizes, availableColors) {
    const variants = [];
    for (const color of availableColors) {
      for (const size of availableSizes) {
        const uid = crypto.randomUUID().slice(0, 8).toUpperCase();
        variants.push({
          sku: `${skuPrefix}-${uid}`,
          color,
          size,
          stock: Math.floor(Math.random() * 20) + 5,
          price,
        });
      }
    }
    return variants;
  }

  let count = 0;

  const productDefs = [
    // ═══════════════════════════════════════════════════════════
    // WOMEN / DRESSES
    // ═══════════════════════════════════════════════════════════
    {
      name: "ECHO Floral Print Maxi Dress",
      description: "Flowing floral print maxi dress with a flattering empire waist and delicate spaghetti straps. Perfect for summer occasions.",
      price: 3200, sku: "ECHO-WDR-010", categorySlug: "women-dresses",
      isNewArrival: true, isFeatured: true,
      images: ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600", "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600"],
      sizes: ["S", "M", "L", "XL"], colors: ["Floral Blue", "Floral Pink", "Floral Green"],
    },
    {
      name: "ECHO Pleated Cocktail Dress",
      description: "Elegant pleated cocktail dress with a fitted bodice and flared skirt. Ideal for evening events.",
      price: 4500, sku: "ECHO-WDR-011", categorySlug: "women-dresses",
      isFeatured: true,
      images: ["https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600", "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=600"],
      sizes: ["S", "M", "L"], colors: ["Black", "Burgundy", "Emerald"],
    },
    {
      name: "ECHO Summer Sundress",
      description: "Light and breezy summer sundress with a sweetheart neckline and tiered skirt.",
      price: 2800, sku: "ECHO-WDR-012", categorySlug: "women-dresses",
      isNewArrival: true,
      images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600"],
      sizes: ["XS", "S", "M", "L"], colors: ["White", "Lavender", "Peach"],
    },

    // ═══════════════════════════════════════════════════════════
    // WOMEN / TOPS
    // ═══════════════════════════════════════════════════════════
    {
      name: "ECHO Linen Blend Shirt",
      description: "Relaxed-fit linen blend shirt with a camp collar. Effortlessly chic for casual days.",
      price: 1600, sku: "ECHO-WTP-010", categorySlug: "women-tops",
      isNewArrival: true,
      images: ["https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600"],
      sizes: ["S", "M", "L", "XL"], colors: ["White", "Sky Blue", "Sage"],
    },
    {
      name: "ECHO Ribbed Knit Crop Top",
      description: "Body-hugging ribbed knit crop top with a square neckline. Versatile layering piece.",
      price: 1200, sku: "ECHO-WTP-011", categorySlug: "women-tops",
      images: ["https://images.unsplash.com/photo-1583496661160-fb5886a0afe0?w=600"],
      sizes: ["XS", "S", "M"], colors: ["Black", "Cream", "Rust"],
    },
    {
      name: "ECHO Oversized Graphic Tee",
      description: "Premium cotton oversized tee with an artistic graphic print. Street-style essential.",
      price: 950, sku: "ECHO-WTP-012", categorySlug: "women-tops",
      isSale: true, compareAtPrice: 1400, discountPercent: 32,
      images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600"],
      sizes: ["S", "M", "L", "XL"], colors: ["White", "Black"],
    },

    // ═══════════════════════════════════════════════════════════
    // WOMEN / BOTTOMS
    // ═══════════════════════════════════════════════════════════
    {
      name: "ECHO High-Waist Wide Leg Trousers",
      description: "Sophisticated high-waist wide leg trousers in flowing crepe. Statement bottom wear.",
      price: 2400, sku: "ECHO-WBT-010", categorySlug: "women-bottoms",
      isFeatured: true,
      images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600"],
      sizes: ["XS", "S", "M", "L"], colors: ["Black", "Cream", "Olive"],
    },
    {
      name: "ECHO Distressed Boyfriend Jeans",
      description: "Relaxed-fit boyfriend jeans with subtle distressing. Casual weekend staple.",
      price: 2100, sku: "ECHO-WBT-011", categorySlug: "women-bottoms",
      isNewArrival: true,
      images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600"],
      sizes: ["XS", "S", "M", "L", "XL"], colors: ["Light Blue", "Dark Wash", "Black"],
    },

    // ═══════════════════════════════════════════════════════════
    // WOMEN / SAREES
    // ═══════════════════════════════════════════════════════════
    {
      name: "ECHO Organza Party Saree",
      description: "Stunning organza saree with delicate embroidery and a sequin border. Comes with matching blouse piece.",
      price: 5500, sku: "ECHO-SAR-010", categorySlug: "women-sarees",
      isFeatured: true, isNewArrival: true,
      images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600", "https://images.unsplash.com/photo-1583496661160-fb5886a0afe0?w=600"],
      sizes: ["Free Size"], colors: ["Powder Pink", "Sea Green", "Lavender"],
    },
    {
      name: "ECHO Silk Blend Banarasi Saree",
      description: "Rich silk blend Banarasi saree with traditional zari work. Timeless elegance.",
      price: 7200, sku: "ECHO-SAR-011", categorySlug: "women-sarees",
      images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600"],
      sizes: ["Free Size"], colors: ["Royal Blue", "Maroon", "Gold"],
    },
    {
      name: "ECHO Georgette Printed Saree",
      description: "Lightweight georgette saree with contemporary abstract print. Easy to drape, easy to love.",
      price: 3200, sku: "ECHO-SAR-012", categorySlug: "women-sarees",
      isNewArrival: true,
      images: ["https://images.unsplash.com/photo-1583496661160-fb5886a0afe0?w=600"],
      sizes: ["Free Size"], colors: ["Multicolor", "Blue Blend", "Earthy Tones"],
    },

    // ═══════════════════════════════════════════════════════════
    // WOMEN / CO-ORD SETS
    // ═══════════════════════════════════════════════════════════
    {
      name: "ECHO Satin Cami & Shorts Set",
      description: "Luxurious satin cami top paired with matching tailored shorts. Effortless coordination.",
      price: 2600, sku: "ECHO-WCD-010", categorySlug: "women-co-ord-sets",
      isNewArrival: true,
      images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600"],
      sizes: ["XS", "S", "M", "L"], colors: ["Champagne", "Black", "Sage"],
    },
    {
      name: "ECHO Knit Lounge Set",
      description: "Soft ribbed knit matching set with a cropped cardigan and midi skirt. Luxe comfort.",
      price: 3400, sku: "ECHO-WCD-011", categorySlug: "women-co-ord-sets",
      isFeatured: true,
      images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600"],
      sizes: ["S", "M", "L"], colors: ["Oatmeal", "Charcoal", "Blush"],
    },

    // ═══════════════════════════════════════════════════════════
    // WOMEN / JUMPSUITS
    // ═══════════════════════════════════════════════════════════
    {
      name: "ECHO Tailored Palazzo Jumpsuit",
      description: "Sharp tailored jumpsuit with palazzo legs and a belted waist. Power dressing redefined.",
      price: 3800, sku: "ECHO-WJM-010", categorySlug: "women-jumpsuits",
      isFeatured: true,
      images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600"],
      sizes: ["XS", "S", "M", "L"], colors: ["Black", "Navy", "Terracotta"],
    },
    {
      name: "ECHO Utility Cargo Jumpsuit",
      description: "Edgy utility jumpsuit with cargo pockets and a cinched waist. Urban meets elegance.",
      price: 3200, sku: "ECHO-WJM-011", categorySlug: "women-jumpsuits",
      isNewArrival: true,
      images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600"],
      sizes: ["S", "M", "L", "XL"], colors: ["Olive", "Khaki", "Black"],
    },
    {
      name: "ECHO V-Neck Wide Leg Jumpsuit",
      description: "Flattering V-neck jumpsuit with a relaxed wide leg silhouette. Day-to-night versatility.",
      price: 3000, sku: "ECHO-WJM-012", categorySlug: "women-jumpsuits",
      images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600"],
      sizes: ["XS", "S", "M", "L"], colors: ["White", "Coral", "Midnight Blue"],
    },

    // ═══════════════════════════════════════════════════════════
    // WOMEN / ACCESSORIES
    // ═══════════════════════════════════════════════════════════
    {
      name: "ECHO Structured Leather Tote",
      description: "Premium structured leather tote with gold hardware. Spacious interior with zip pocket.",
      price: 4200, sku: "ECHO-WAC-010", categorySlug: "women-accessories",
      isFeatured: true,
      images: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600"],
      sizes: ["One Size"], colors: ["Black", "Tan", "Burgundy"],
    },
    {
      name: "ECHO Silk Scarf",
      description: "Hand-finished pure silk scarf with artistic print. Wear it as a headband, neck tie, or bag accessory.",
      price: 1800, sku: "ECHO-WAC-011", categorySlug: "women-accessories",
      isNewArrival: true,
      images: ["https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600"],
      sizes: ["One Size"], colors: ["Print Multicolor", "Print Floral", "Print Geometric"],
    },
    {
      name: "ECHO Chunky Gold Chain Bracelet",
      description: "Statement gold-plated chain bracelet with a secure clasp. Adds instant glamour.",
      price: 1200, sku: "ECHO-WAC-012", categorySlug: "women-accessories",
      images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600"],
      sizes: ["One Size"], colors: ["Gold"],
    },
    {
      name: "ECHO Quilted Crossbody Bag",
      description: "Compact quilted crossbody with chain strap. Evening essential with a luxe feel.",
      price: 3200, sku: "ECHO-WAC-013", categorySlug: "women-accessories",
      isSale: true, compareAtPrice: 4500, discountPercent: 29,
      images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600"],
      sizes: ["One Size"], colors: ["Black", "White", "Rose Gold"],
    },
    {
      name: "ECHO Oversized Sunglasses",
      description: "Vintage-inspired oversized sunglasses with UV400 protection. Glam meets function.",
      price: 1500, sku: "ECHO-WAC-014", categorySlug: "women-accessories",
      images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600"],
      sizes: ["One Size"], colors: ["Black Frame/Grey Lens", "Tortoise/Brown Lens", "White Frame/Blue Lens"],
    },
    {
      name: "ECHO Woven Raffia Clutch",
      description: "Handwoven raffia clutch with leather trim. Summer's perfect accessory.",
      price: 2100, sku: "ECHO-WAC-015", categorySlug: "women-accessories",
      isNewArrival: true,
      images: ["https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600"],
      sizes: ["One Size"], colors: ["Natural", "Black Trim", "Gold Trim"],
    },

    // ═══════════════════════════════════════════════════════════
    // MEN / SHIRTS
    // ═══════════════════════════════════════════════════════════
    {
      name: "ECHO Oxford Button-Down Shirt",
      description: "Classic oxford button-down in premium cotton. A smart-casual essential.",
      price: 1750, sku: "ECHO-MSH-010", categorySlug: "men-shirts",
      isFeatured: true,
      images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600"],
      sizes: ["S", "M", "L", "XL"], colors: ["White", "Light Blue", "Pink"],
    },
    {
      name: "ECHO Linen Summer Shirt",
      description: "Breathable linen shirt with a relaxed fit. Perfect for warm weather styling.",
      price: 1900, sku: "ECHO-MSH-011", categorySlug: "men-shirts",
      isNewArrival: true,
      images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600"],
      sizes: ["S", "M", "L", "XL"], colors: ["Beige", "Sky Blue", "Olive"],
    },
    {
      name: "ECHO Checked Flannel Shirt",
      description: "Cozy flannel shirt in a classic check pattern. Layer it up for colder days.",
      price: 1600, sku: "ECHO-MSH-012", categorySlug: "men-shirts",
      images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600"],
      sizes: ["M", "L", "XL", "XXL"], colors: ["Red Check", "Green Check", "Blue Check"],
    },

    // ═══════════════════════════════════════════════════════════
    // MEN / T-SHIRTS
    // ═══════════════════════════════════════════════════════════
    {
      name: "ECHO Premium Pima Cotton Tee",
      description: "Ultra-soft Pima cotton crew neck tee. The foundation of a great wardrobe.",
      price: 890, sku: "ECHO-MTS-010", categorySlug: "men-t-shirts",
      isFeatured: true,
      images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"],
      sizes: ["S", "M", "L", "XL", "XXL"], colors: ["White", "Black", "Navy", "Grey"],
    },
    {
      name: "ECHO Henley Long Sleeve",
      description: "Textured henley with a button placket. Rugged refinement for everyday wear.",
      price: 1100, sku: "ECHO-MTS-011", categorySlug: "men-t-shirts",
      isNewArrival: true,
      images: ["https://images.unsplash.com/photo-1625910513413-5fc3e91f9397?w=600"],
      sizes: ["S", "M", "L", "XL"], colors: ["Olive", "Charcoal", "Burgundy"],
    },
    {
      name: "ECHO V-Neck Slim T-Shirt",
      description: "Sleek v-neck tee in stretch cotton. Slim fit for a clean silhouette.",
      price: 790, sku: "ECHO-MTS-012", categorySlug: "men-t-shirts",
      images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"],
      sizes: ["S", "M", "L", "XL"], colors: ["Black", "White", "Charcoal"],
    },

    // ═══════════════════════════════════════════════════════════
    // MEN / TROUSERS
    // ═══════════════════════════════════════════════════════════
    {
      name: "ECHO Stretch Cotton Tapered Trousers",
      description: "Modern tapered trousers in stretch cotton. Comfort meets polished style.",
      price: 2000, sku: "ECHO-MTR-010", categorySlug: "men-trousers",
      isFeatured: true,
      images: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600"],
      sizes: ["S", "M", "L", "XL"], colors: ["Khaki", "Navy", "Black"],
    },
    {
      name: "ECHO Relaxed Fit Cargo Pants",
      description: "Utility-inspired cargo pants with multiple pockets. Streetwear essential.",
      price: 2200, sku: "ECHO-MTR-011", categorySlug: "men-trousers",
      isNewArrival: true,
      images: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600"],
      sizes: ["S", "M", "L", "XL", "XXL"], colors: ["Olive", "Black", "Sand"],
    },
    {
      name: "ECHO Classic Denim Jeans",
      description: "Timeless straight-fit jeans in premium denim. Built to last, designed to impress.",
      price: 2400, sku: "ECHO-MTR-012", categorySlug: "men-trousers",
      images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=600"],
      sizes: ["S", "M", "L", "XL"], colors: ["Dark Wash", "Mid Wash", "Black"],
    },

    // ═══════════════════════════════════════════════════════════
    // MEN / JACKETS
    // ═══════════════════════════════════════════════════════════
    {
      name: "ECHO Bomber Jacket",
      description: "Sleek bomber jacket in lightweight satin with ribbed trim. Urban edge, refined finish.",
      price: 3800, sku: "ECHO-MJK-010", categorySlug: "men-jackets",
      isNewArrival: true, isFeatured: true,
      images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600"],
      sizes: ["S", "M", "L", "XL"], colors: ["Black", "Navy", "Olive"],
    },
    {
      name: "ECHO Denim Trucker Jacket",
      description: "Classic trucker jacket in washed denim. A layering piece that never goes out of style.",
      price: 3200, sku: "ECHO-MJK-011", categorySlug: "men-jackets",
      images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600"],
      sizes: ["M", "L", "XL", "XXL"], colors: ["Light Wash", "Dark Wash", "Black"],
    },
    {
      name: "ECHO Water-Resistant Parka",
      description: "Functional parka with water-resistant shell and faux-fur lined hood. Winter ready.",
      price: 5800, sku: "ECHO-MJK-012", categorySlug: "men-jackets",
      isFeatured: true,
      images: ["https://images.unsplash.com/photo-1544923246-77307dd270b2?w=600"],
      sizes: ["M", "L", "XL"], colors: ["Black", "Olive", "Navy"],
    },

    // ═══════════════════════════════════════════════════════════
    // MEN / CO-ORD SETS
    // ═══════════════════════════════════════════════════════════
    {
      name: "ECHO Ribbed Lounge Set",
      description: "Matching ribbed knit joggers and sweatshirt. Premium comfort, effortless style.",
      price: 3200, sku: "ECHO-MCD-010", categorySlug: "men-co-ord-sets",
      isNewArrival: true, isFeatured: true,
      images: ["https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600"],
      sizes: ["S", "M", "L", "XL"], colors: ["Charcoal", "Navy", "Oatmeal"],
    },
    {
      name: "ECHO Tech Tracksuit Set",
      description: "Sleek tech-fabric tracksuit with zip-up jacket and tapered joggers. Athleisure perfected.",
      price: 3800, sku: "ECHO-MCD-011", categorySlug: "men-co-ord-sets",
      images: ["https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600"],
      sizes: ["S", "M", "L", "XL"], colors: ["All Black", "Grey Melange", "Forest Green"],
    },

    // ═══════════════════════════════════════════════════════════
    // MEN / ACCESSORIES
    // ═══════════════════════════════════════════════════════════
    {
      name: "ECHO Leather Belt",
      description: "Full-grain leather belt with brushed buckle. A quiet statement of quality.",
      price: 1400, sku: "ECHO-MAC-010", categorySlug: "men-accessories",
      images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600"],
      sizes: ["S", "M", "L", "XL"], colors: ["Black", "Brown"],
    },
    {
      name: "ECHO Canvas Weekender Bag",
      description: "Spacious canvas weekender with leather handles. Built for short getaways.",
      price: 3500, sku: "ECHO-MAC-011", categorySlug: "men-accessories",
      isNewArrival: true,
      images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600"],
      sizes: ["One Size"], colors: ["Khaki", "Navy", "Olive"],
    },
    {
      name: "ECHO Minimalist Watch",
      description: "Clean dial watch with genuine leather strap. Understated elegance for every wrist.",
      price: 4800, sku: "ECHO-MAC-012", categorySlug: "men-accessories",
      isFeatured: true,
      images: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600"],
      sizes: ["One Size"], colors: ["Black/Gold", "Silver/White", "Brown/Silver"],
    },
    {
      name: "ECHO Wool Blend Scarf",
      description: "Soft wool blend scarf in a classic plaid pattern. Warmth with sophistication.",
      price: 1200, sku: "ECHO-MAC-013", categorySlug: "men-accessories",
      images: ["https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600"],
      sizes: ["One Size"], colors: ["Grey Plaid", "Navy Plaid", "Burgundy"],
    },
    {
      name: "ECHO Classic Aviator Sunglasses",
      description: "Timeless aviator sunglasses with polarized lenses. Uncompromising clarity and style.",
      price: 2200, sku: "ECHO-MAC-014", categorySlug: "men-accessories",
      images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600"],
      sizes: ["One Size"], colors: ["Gold/Green", "Silver/Grey", "Matte Black"],
    },

    // ═══════════════════════════════════════════════════════════
    // KIDS / DRESSES
    // ═══════════════════════════════════════════════════════════
    {
      name: "ECHO Kids Party Dress",
      description: "Twirl-worthy party dress with tulle skirt and satin bow. For little princesses.",
      price: 1800, sku: "ECHO-KDR-010", categorySlug: "kids-dresses",
      isFeatured: true, isNewArrival: true,
      images: ["https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600"],
      sizes: kidsSizes.slice(0, 4), colors: ["Pink", "Lavender", "Mint"],
    },
    {
      name: "ECHO Kids Floral Summer Dress",
      description: "Cheerful floral print dress with flutter sleeves. Sunshine and smiles guaranteed.",
      price: 1400, sku: "ECHO-KDR-011", categorySlug: "kids-dresses",
      images: ["https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600"],
      sizes: kidsSizes.slice(0, 4), colors: ["Floral Yellow", "Floral Pink", "Floral Blue"],
    },

    // ═══════════════════════════════════════════════════════════
    // KIDS / T-SHIRTS
    // ═══════════════════════════════════════════════════════════
    {
      name: "ECHO Kids Dino Graphic Tee",
      description: "Fun dinosaur graphic tee in soft organic cotton. Adventure awaits!",
      price: 550, sku: "ECHO-KTS-010", categorySlug: "kids-t-shirts",
      isFeatured: true,
      images: ["https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600"],
      sizes: kidsSizes, colors: ["White", "Green", "Blue"],
    },
    {
      name: "ECHO Kids Color Block Tee",
      description: "Playful color block t-shirt in soft jersey. Mix, match, and play all day.",
      price: 500, sku: "ECHO-KTS-011", categorySlug: "kids-t-shirts",
      isNewArrival: true,
      images: ["https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600"],
      sizes: kidsSizes, colors: ["Red/Blue", "Yellow/Green", "Orange/Navy"],
    },
    {
      name: "ECHO Kids Striped Tee",
      description: "Classic nautical striped tee in breathable cotton. Timeless for little ones.",
      price: 480, sku: "ECHO-KTS-012", categorySlug: "kids-t-shirts",
      images: ["https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600"],
      sizes: kidsSizes, colors: ["Blue/White", "Red/White", "Green/White"],
    },

    // ═══════════════════════════════════════════════════════════
    // KIDS / TROUSERS
    // ═══════════════════════════════════════════════════════════
    {
      name: "ECHO Kids Jogger Pants",
      description: "Soft jogger pants with elastic waistband. Active kids, happy parents.",
      price: 750, sku: "ECHO-KTR-010", categorySlug: "kids-trousers",
      images: ["https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600"],
      sizes: kidsSizes, colors: ["Grey", "Navy", "Black"],
    },
    {
      name: "ECHO Kids Chino Shorts",
      description: "Smart chino shorts with adjustable waist. Perfect for school and play.",
      price: 650, sku: "ECHO-KTR-011", categorySlug: "kids-trousers",
      isNewArrival: true,
      images: ["https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600"],
      sizes: kidsSizes, colors: ["Khaki", "Navy", "Olive"],
    },

    // ═══════════════════════════════════════════════════════════
    // KIDS / SETS
    // ═══════════════════════════════════════════════════════════
    {
      name: "ECHO Kids Matching Tee & Shorts Set",
      description: "Coordinating graphic tee and shorts set. Cute without the effort.",
      price: 1100, sku: "ECHO-KST-010", categorySlug: "kids-sets",
      isFeatured: true, isNewArrival: true,
      images: ["https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600"],
      sizes: kidsSizes.slice(0, 4), colors: ["Sky Blue", "Lemon", "Coral"],
    },
    {
      name: "ECHO Kids Hoodie & Jogger Set",
      description: "Cozy hoodie and jogger matching set. Ready for every adventure.",
      price: 1400, sku: "ECHO-KST-011", categorySlug: "kids-sets",
      images: ["https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600"],
      sizes: kidsSizes.slice(0, 4), colors: ["Grey", "Navy", "Sage"],
    },
    {
      name: "ECHO Kids Formal Shirt & Trousers Set",
      description: "Smart formal set with crisp shirt and tailored trousers. Little gentleman approved.",
      price: 1800, sku: "ECHO-KST-012", categorySlug: "kids-sets",
      images: ["https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600"],
      sizes: kidsSizes.slice(0, 4), colors: ["White/Navy", "White/Grey", "Light Blue/Navy"],
    },
  ];

  for (const def of productDefs) {
    const catSlug = def.categorySlug;
    const cat = categories[catSlug];
    if (!cat) {
      console.log(`  ⚠ Category not found: ${catSlug} — skipping "${def.name}"`);
      continue;
    }

    await createProduct(
      {
        name: def.name,
        description: def.description,
        price: def.price,
        compareAtPrice: def.compareAtPrice || null,
        discountPercent: def.discountPercent || 0,
        sku: def.sku,
        categoryId: cat.id,
        isNewArrival: def.isNewArrival || false,
        isSale: def.isSale || false,
        isFeatured: def.isFeatured || false,
        tags: [],
      },
      def.images,
      makeVariants(def.sku, def.price, def.sizes, def.colors)
    );
    count++;
    console.log(`  ✓ ${def.name}`);
  }

  console.log(`\nSeeded ${count} additional products.`);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
