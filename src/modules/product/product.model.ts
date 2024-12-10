import mongoose, { Schema } from 'mongoose';

// product schema
const productSchema = new Schema(
    {
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
            enum: ['Fiction', 'Science', 'SelfDevelopment', 'Religious'],
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
    },
);


// order schema
const orderSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            match: [/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Please enter a valid email address'],
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'Product is required'],
        },
        quantity: {
            type: Number,
            required: [true, 'Quantity is required'],
            min: [1, 'Quantity must be at least 1'],
        },
        totalPrice: {
            type: Number,
            required: [true, 'Total price is required'],
            min: [0, 'Total price must be a positive number'],
        },
    },
);


// product model
const Product = mongoose.model('Product', productSchema);

// order model
const Order = mongoose.model('Order', orderSchema);


export default {
    Product,
    Order
};
