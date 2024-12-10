import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';

// product schema
const productSchema = new Schema<TProduct>(
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

// product model
const Product = model<TProduct>('Product', productSchema);


export default Product;
