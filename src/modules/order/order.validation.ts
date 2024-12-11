import { z } from 'zod';

const orderValidationSchema = z.object({
    email: z.string()
        .email({ message: 'Email is not valid' })
        .nonempty({ message: 'Email is required' }),
    product: z.string()
        .nonempty({ message: 'Product is required' }),
    quantity: z.number()
        .min(1, { message: 'Quantity must be at least 1' })
        .refine(value => Number.isInteger(value), { message: 'Quantity must be an integer' }),
    totalPrice: z.number()
        .min(0, { message: 'Total price must be a positive number' })
        .refine(value => !isNaN(value), { message: 'Total price must be a valid number' }),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export default orderValidationSchema;