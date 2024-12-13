"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const productValidationSchema = zod_1.z.object({
    title: zod_1.z.string().nonempty({ message: 'Title is required' }),
    author: zod_1.z.string().nonempty({ message: 'Author is required' }),
    price: zod_1.z
        .number()
        .min(0, { message: 'Price must be a positive number' })
        .refine((value) => !isNaN(value), {
        message: 'Price must be a valid number',
    }),
    category: zod_1.z.enum([
        'Fiction',
        'Science',
        'SelfDevelopment',
        'Religious',
        'English',
        'Programming',
    ], {
        message: 'Category must be one of the predefined options',
    }),
    description: zod_1.z.string().nonempty({ message: 'Description is required' }),
    quantity: zod_1.z
        .number()
        .min(0, { message: 'Quantity cannot be negative' })
        .refine((value) => Number.isInteger(value), {
        message: 'Quantity must be an integer',
    }),
    inStock: zod_1.z.boolean().refine((value) => typeof value === 'boolean', {
        message: 'InStock status is required',
    }),
});
exports.default = productValidationSchema;
