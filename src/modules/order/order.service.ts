import { TOrderBook } from './order.interface';
import Order from './order.model';

const createOrderBook = async (orderData: TOrderBook) => {
  const orderBook = await Order.create(orderData);
  return orderBook;
};

const orderTotalRevenue = async () => {
  const [result] = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);
  return result;
};

export const orderService = {
  createOrderBook,
  orderTotalRevenue,
};
