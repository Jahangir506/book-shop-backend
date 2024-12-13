import { TOrder } from './order.interface';
import Order from './order.model';

const orderBook = async (orderData: TOrder) => {
  const orderBook = await Order.create(orderData)
  return orderBook;
};

const orderTotalPrice = async () => {
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
  return result
}

export const orderService = {
  orderBook,
  orderTotalPrice
};
