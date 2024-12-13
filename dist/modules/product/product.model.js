"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number'],
    },
    category: {
        type: String,
        enum: [
            'Fiction',
            'Science',
            'SelfDevelopment',
            'Religious',
            'English',
            'Programming',
        ],
        required: [true, 'Category is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [0, 'Quantity cannot be negative'],
    },
    inStock: {
        type: Boolean,
        required: [true, 'InStock status is required'],
    },
}, {
    timestamps: true,
});
const Product = (0, mongoose_1.model)('Product', bookSchema);
exports.default = Product;
