import prisma from '../config/database.js';

export async function getWishlist(req, res, next) {
  try {
    const wishlist = await prisma.wishlist.findUnique({
      where: { userId: req.user.id },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: { where: { isPrimary: true }, take: 1 },
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    res.json(wishlist || { items: [] });
  } catch (error) {
    next(error);
  }
}

export async function addToWishlist(req, res, next) {
  try {
    const { productId } = req.body;

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const wishlist = await prisma.wishlist.upsert({
      where: { userId: req.user.id },
      update: {},
      create: { userId: req.user.id },
    });

    const existingItem = await prisma.wishlistItem.findUnique({
      where: {
        wishlistId_productId: {
          wishlistId: wishlist.id,
          productId,
        },
      },
    });

    if (existingItem) {
      return res.status(400).json({ success: false, message: 'Product already in wishlist' });
    }

    await prisma.wishlistItem.create({
      data: {
        wishlistId: wishlist.id,
        productId,
      },
    });

    const updatedWishlist = await prisma.wishlist.findUnique({
      where: { userId: req.user.id },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: { where: { isPrimary: true }, take: 1 },
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    res.status(201).json({ success: true, data: updatedWishlist });
  } catch (error) {
    next(error);
  }
}

export async function removeFromWishlist(req, res, next) {
  try {
    const { productId } = req.params;

    const wishlist = await prisma.wishlist.findUnique({
      where: { userId: req.user.id },
    });

    if (!wishlist) {
      return res.status(404).json({ success: false, message: 'Wishlist not found' });
    }

    await prisma.wishlistItem.delete({
      where: {
        wishlistId_productId: {
          wishlistId: wishlist.id,
          productId,
        },
      },
    });

    const updatedWishlist = await prisma.wishlist.findUnique({
      where: { userId: req.user.id },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: { where: { isPrimary: true }, take: 1 },
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    res.json({ success: true, data: updatedWishlist });
  } catch (error) {
    next(error);
  }
}
