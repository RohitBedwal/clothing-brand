import prisma from '../config/database.js';

export async function validateCoupon(req, res, next) {
  try {
    const { code, orderTotal } = req.body;

    const coupon = await prisma.coupon.findFirst({
      where: {
        code: code.toUpperCase(),
        isActive: true,
      },
    });

    if (!coupon) {
      return res.status(404).json({ message: 'Invalid coupon code' });
    }

    if (coupon.startsAt && new Date(coupon.startsAt) > new Date()) {
      return res.status(400).json({ message: 'Coupon is not yet active' });
    }

    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return res.status(400).json({ message: 'Coupon has expired' });
    }

    if (coupon.minimumOrderAmount && orderTotal < Number(coupon.minimumOrderAmount)) {
      return res.status(400).json({
        message: `Minimum order amount ₹${coupon.minimumOrderAmount} required`,
      });
    }

    if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
      return res.status(400).json({ message: 'Coupon usage limit reached' });
    }

    let discount = 0;
    if (coupon.discountType === 'PERCENTAGE') {
      discount = (orderTotal * Number(coupon.discountValue)) / 100;
      if (coupon.maximumDiscount && discount > Number(coupon.maximumDiscount)) {
        discount = Number(coupon.maximumDiscount);
      }
    } else {
      discount = Number(coupon.discountValue);
    }

    discount = Math.min(discount, orderTotal);

    res.json({
      coupon: {
        id: coupon.id,
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
      },
      discount: Math.round(discount * 100) / 100,
      message: 'Coupon applied successfully',
    });
  } catch (error) {
    next(error);
  }
}

export async function createCoupon(req, res, next) {
  try {
    const {
      code,
      description,
      discountType,
      discountValue,
      minimumOrderAmount,
      maximumDiscount,
      usageLimit,
      startsAt,
      expiresAt,
    } = req.body;

    const coupon = await prisma.coupon.create({
      data: {
        code: code.toUpperCase(),
        description,
        discountType,
        discountValue,
        minimumOrderAmount,
        maximumDiscount,
        usageLimit,
        startsAt: startsAt ? new Date(startsAt) : null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    });

    res.status(201).json(coupon);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'Coupon code already exists' });
    }
    next(error);
  }
}

export async function updateCoupon(req, res, next) {
  try {
    const { id } = req.params;
    const {
      code,
      description,
      discountType,
      discountValue,
      minimumOrderAmount,
      maximumDiscount,
      usageLimit,
      startsAt,
      expiresAt,
      isActive,
    } = req.body;

    const coupon = await prisma.coupon.update({
      where: { id },
      data: {
        ...(code && { code: code.toUpperCase() }),
        ...(description !== undefined && { description }),
        ...(discountType && { discountType }),
        ...(discountValue !== undefined && { discountValue }),
        ...(minimumOrderAmount !== undefined && { minimumOrderAmount }),
        ...(maximumDiscount !== undefined && { maximumDiscount }),
        ...(usageLimit !== undefined && { usageLimit }),
        ...(startsAt !== undefined && { startsAt: startsAt ? new Date(startsAt) : null }),
        ...(expiresAt !== undefined && { expiresAt: expiresAt ? new Date(expiresAt) : null }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    res.json(coupon);
  } catch (error) {
    next(error);
  }
}

export async function deleteCoupon(req, res, next) {
  try {
    const { id } = req.params;

    await prisma.coupon.delete({ where: { id } });

    res.json({ message: 'Coupon deleted' });
  } catch (error) {
    next(error);
  }
}

export async function getCoupons(req, res, next) {
  try {
    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.json(coupons);
  } catch (error) {
    next(error);
  }
}
