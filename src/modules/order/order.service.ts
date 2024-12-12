import { TOrder } from './order.interface';
import Order from './order.model';

const orderBook = async (order: TOrder) => {
  const result = await Order.create(order);
  return result;
};

const totalPrice = async () => {
  const result = await Order.find();
  return result;
};

export const orderService = {
  orderBook,
  totalPrice
};
