import prisma from '../config/database.js';

export async function getProductReviews(req, res, next) {
  try {
    const { productId } = req.params;

    const reviews = await prisma.review.findMany({
      where: {
        productId,
        isApproved: true,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(reviews);
  } catch (error) {
    next(error);
  }
}

export async function createReview(req, res, next) {
  try {
    const { productId, rating, title, comment } = req.body;

    const hasPurchased = await prisma.orderItem.findFirst({
      where: {
        productId,
        order: {
          userId: req.user.id,
          status: 'DELIVERED',
        },
      },
    });

    const review = await prisma.review.create({
      data: {
        userId: req.user.id,
        productId,
        rating,
        title,
        comment,
        isVerifiedPurchase: !!hasPurchased,
        isApproved: false,
      },
    });

    res.status(201).json(review);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }
    next(error);
  }
}

export async function updateReview(req, res, next) {
  try {
    const { id } = req.params;
    const { rating, title, comment } = req.body;

    const review = await prisma.review.findUnique({ where: { id } });

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updated = await prisma.review.update({
      where: { id },
      data: { rating, title, comment },
    });

    res.json(updated);
  } catch (error) {
    next(error);
  }
}

export async function deleteReview(req, res, next) {
  try {
    const { id } = req.params;

    const review = await prisma.review.findUnique({ where: { id } });

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await prisma.review.delete({ where: { id } });

    res.json({ message: 'Review deleted' });
  } catch (error) {
    next(error);
  }
}

export async function getAllReviews(req, res, next) {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(reviews);
  } catch (error) {
    next(error);
  }
}
