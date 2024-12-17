import { model, Schema } from 'mongoose';
import { TOrderBook } from './order.interface';

const orderSchema = new Schema<TOrderBook>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      validate: {
        validator: (value: string) => {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        },
        message: '{VALUE} is not a valid email!',
      },
    },
    product: {
      type: String,
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
      min: [0, 'Please, total price must be a positive number'],
    },
  },
  {
    timestamps: true,
  }
);


const Order = model<TOrderBook>('Order', orderSchema);

export default Order;
