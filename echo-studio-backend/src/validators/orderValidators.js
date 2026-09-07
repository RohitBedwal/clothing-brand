import { z } from 'zod';

const uuidSchema = z.string().uuid('Invalid UUID');

export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        variantId: uuidSchema,
        quantity: z.number().int().positive('Quantity must be at least 1'),
      })
    )
    .min(1, 'At least one item is required'),
  addressId: uuidSchema,
  shippingMethod: z.enum(['standard', 'express'], {
    message: 'Shipping method must be standard or express',
  }),
  notes: z.string().optional(),
  couponCode: z.string().optional(),
});

export const cancelOrderSchema = z.object({
  reason: z.string().optional(),
});
