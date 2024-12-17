"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const orderValidationSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email({ message: 'Email is not valid' })
        .nonempty({ message: 'Email is required' }),
    product: zod_1.z
        .string()
        .refine((id) => mongoose_1.Types.ObjectId.isValid(id), {
        message: 'Product ID is not valid',
    }),
    quantity: zod_1.z
        .number({ message: 'Quantity must be a number' })
        .int({ message: 'Quantity must be an integer' })
        .min(1, { message: 'Quantity must be at least 1' }),
    totalPrice: zod_1.z
        .number({ message: 'Total price must be a number' })
        .min(0, { message: 'Total price must be a positive number' }),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
exports.default = orderValidationSchema;
