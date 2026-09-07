import { z } from 'zod';

const uuidSchema = z.string().uuid('Invalid UUID');

export const createProductSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  price: z.number().positive('Price must be greater than 0'),
  compareAtPrice: z.number().positive().optional(),
  sku: z.string().min(1, 'SKU is required'),
  categoryId: uuidSchema,
  isActive: z.boolean().default(true),
  isNewArrival: z.boolean().default(false),
  isSale: z.boolean().default(false),
  isReadyToShip: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
});

export const updateProductSchema = z.object({
  name: z.string().min(1, 'Product name is required').optional(),
  slug: z.string().min(1, 'Slug is required').optional(),
  description: z.string().optional(),
  price: z.number().positive('Price must be greater than 0').optional(),
  compareAtPrice: z.number().positive().optional(),
  sku: z.string().min(1, 'SKU is required').optional(),
  categoryId: uuidSchema.optional(),
  isActive: z.boolean().optional(),
  isNewArrival: z.boolean().optional(),
  isSale: z.boolean().optional(),
  isReadyToShip: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

export const createVariantSchema = z.object({
  productId: uuidSchema,
  sku: z.string().min(1, 'SKU is required'),
  color: z.string().optional(),
  size: z.string().optional(),
  stock: z.number().int().min(0, 'Stock cannot be negative'),
  price: z.number().positive('Price must be greater than 0'),
});

export const createProductImageSchema = z.object({
  productId: uuidSchema,
  url: z.string().url('Invalid URL'),
  altText: z.string().optional(),
  sortOrder: z.number().int().default(0),
  isPrimary: z.boolean().default(false),
});
