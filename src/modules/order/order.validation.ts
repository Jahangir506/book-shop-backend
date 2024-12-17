import { Types } from 'mongoose';
import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z
    .string()
    .email({ message: 'Email is not valid' })
    .nonempty({ message: 'Email is required' }),

  product: z
    .string()
    .refine((id) => Types.ObjectId.isValid(id), {
      message: 'Product ID is not valid',
    }),

  quantity: z
    .number({ message: 'Quantity must be a number' })
    .int({ message: 'Quantity must be an integer' })
    .min(1, { message: 'Quantity must be at least 1' }),

  totalPrice: z
    .number({ message: 'Total price must be a number' })
    .min(0, { message: 'Total price must be a positive number' }),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});


export default orderValidationSchema;
