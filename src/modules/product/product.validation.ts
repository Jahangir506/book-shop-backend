import { z } from 'zod';

const productValidationSchema = z.object({
  title: z.string().nonempty({ message: 'Title is required' }),
  author: z.string().nonempty({ message: 'Author is required' }),
  price: z
    .number()
    .min(0, { message: 'Price must be a positive number' })
    .refine((value) => !isNaN(value), {
      message: 'Price must be a valid number',
    }),
  category: z.enum(
    [
      'Fiction',
      'Science',
      'SelfDevelopment',
      'Religious',
      'English',
      'Programming',
    ],
    {
      message: 'Category must be one of the predefined options',
    }
  ),
  description: z.string().nonempty({ message: 'Description is required' }),
  quantity: z
    .number()
    .min(0, { message: 'Quantity cannot be negative' })
    .refine((value) => Number.isInteger(value), {
      message: 'Quantity must be an integer',
    }),
  inStock: z
    .boolean()
    .refine((value) => typeof value === 'boolean', {
      message: 'InStock status is required',
    }),
});

export default productValidationSchema;
