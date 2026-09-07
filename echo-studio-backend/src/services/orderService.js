import prisma from '../config/database.js';
import { generateOrderNumber } from '../utils/generateOrderNumber.js';

export async function createOrder(userId, { items, addressId, shippingMethod, couponCode, notes }) {
  return prisma.$transaction(async (tx) => {
    // 1. Validate address
    const address = await tx.address.findFirst({ where: { id: addressId, userId } });
    if (!address) throw new Error('Address not found');

    // 2. Validate items, calculate subtotal from DB prices
    const orderItems = [];
    let subtotal = 0;

    for (const item of items) {
      const variant = await tx.productVariant.findUnique({
        where: { id: item.variantId },
        include: { product: true },
      });
      if (!variant) throw new Error(`Variant not found: ${item.variantId}`);
      if (!variant.isActive) throw new Error(`Variant is no longer available: ${variant.sku}`);
      if (variant.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${variant.product.name} (${variant.color || ''} ${variant.size || ''})`);
      }

      const unitPrice = Number(variant.price);
      const totalPrice = unitPrice * item.quantity;
      subtotal += totalPrice;

      orderItems.push({
        productId: variant.productId,
        variantId: variant.id,
        name: variant.product.name,
        sku: variant.sku,
        color: variant.color,
        size: variant.size,
        unitPrice,
        quantity: item.quantity,
        totalPrice,
      });
    }

    // 3. Calculate coupon discount
    let discount = 0;
    let couponId = null;

    if (couponCode) {
      const coupon = await tx.coupon.findFirst({
        where: { code: couponCode.toUpperCase(), isActive: true },
      });
      if (!coupon) throw new Error('Invalid coupon');
      if (coupon.startsAt && new Date(coupon.startsAt) > new Date()) throw new Error('Coupon is not yet active');
      if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) throw new Error('Coupon expired');
      if (coupon.minimumOrderAmount && subtotal < Number(coupon.minimumOrderAmount)) {
        throw new Error(`Minimum order amount ₹${coupon.minimumOrderAmount} required`);
      }
      if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
        throw new Error('Coupon usage limit reached');
      }

      couponId = coupon.id;
      if (coupon.discountType === 'PERCENTAGE') {
        discount = (subtotal * Number(coupon.discountValue)) / 100;
        if (coupon.maximumDiscount && discount > Number(coupon.maximumDiscount)) {
          discount = Number(coupon.maximumDiscount);
        }
      } else {
        discount = Number(coupon.discountValue);
      }
      discount = Math.min(discount, subtotal);
    }

    // 4. Calculate shipping
    const shippingCost = shippingMethod === 'express' ? 150 : 0;

    // 5. Calculate tax on discounted subtotal
    const afterDiscount = subtotal - discount;
    const taxAmount = Math.round(afterDiscount * 0.18 * 100) / 100;

    // 6. Calculate final total
    const total = Math.round((afterDiscount + shippingCost + taxAmount) * 100) / 100;

    // 7. Create order with correct field names
    const order = await tx.order.create({
      data: {
        userId,
        orderNumber: generateOrderNumber(),
        subtotal,
        discountAmount: discount,
        shippingCost,
        taxAmount,
        total,
        shippingAddressSnapshot: JSON.parse(JSON.stringify(address)),
        notes: notes || null,
        status: 'PENDING',
        items: { create: orderItems },
      },
      include: { items: true },
    });

    // 8. Decrease stock
    for (const item of orderItems) {
      await tx.productVariant.update({
        where: { id: item.variantId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    // 9. Record coupon usage
    if (couponId) {
      await tx.couponUsage.create({
        data: { userId, couponId, orderId: order.id },
      });
      await tx.coupon.update({
        where: { id: couponId },
        data: { usageCount: { increment: 1 } },
      });
    }

    return order;
  });
}

export async function cancelOrder(orderId, userId) {
  return prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({ where: { id: orderId } });
    if (!order) throw new Error('Order not found');
    if (order.userId !== userId) throw new Error('Not authorized');
    if (!['PENDING', 'CONFIRMED'].includes(order.status)) {
      throw new Error('Order cannot be cancelled');
    }

    const orderItems = await tx.orderItem.findMany({ where: { orderId } });
    for (const item of orderItems) {
      await tx.productVariant.update({
        where: { id: item.variantId },
        data: { stock: { increment: item.quantity } },
      });
    }

    return tx.order.update({
      where: { id: orderId },
      data: { status: 'CANCELLED' },
      include: { items: true },
    });
  });
}
