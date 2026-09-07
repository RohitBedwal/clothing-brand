import { z } from 'zod';

export const createAddressSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Phone must be 10 digits starting with 6-9'),
  address: z.string().min(1, 'Address is required'),
  apartment: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  pinCode: z
    .string()
    .regex(/^\d{6}$/, 'PIN code must be exactly 6 digits'),
  country: z.string().default('India'),
  isDefault: z.boolean().optional(),
});

export const updateAddressSchema = z.object({
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Phone must be 10 digits starting with 6-9')
    .optional(),
  address: z.string().min(1, 'Address is required').optional(),
  apartment: z.string().optional(),
  city: z.string().min(1, 'City is required').optional(),
  state: z.string().min(1, 'State is required').optional(),
  pinCode: z
    .string()
    .regex(/^\d{6}$/, 'PIN code must be exactly 6 digits')
    .optional(),
  country: z.string().optional(),
  isDefault: z.boolean().optional(),
});
