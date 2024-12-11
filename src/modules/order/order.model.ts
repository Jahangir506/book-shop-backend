import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

// order schema
const orderSchema = new Schema<TOrder>(
    {
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required'],
            validate: {
                validator: function (value: string) {
                    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
                },
                message: '{VALUE} is not a valid email',
            },
        },
        product: {
            type: String,
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
    {
        timestamps: true,
    }
);

// order model
const Order = model('Order', orderSchema);

export default Order;
