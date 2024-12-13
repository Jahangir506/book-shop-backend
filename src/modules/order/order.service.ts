import Product from '../product/product.model';
import { TOrder } from './order.interface';
import Order from './order.model';

const orderBook = async (order: TOrder) => {
  const { email, product, quantity, totalPrice } = order;

  const productDoc = await Product.findById(product);
  console.log(!productDoc)
  if (!productDoc) {
    throw new Error('Product not found');
  }

  if (productDoc.quantity < quantity) {
    throw new Error('Product is out of stock');
  }
  console.log('2nd Product ID:', product);
  console.log('2nd Product Document:', productDoc);

  productDoc.quantity -= quantity;
  productDoc.inStock = productDoc.quantity > 0;

  await productDoc.save();

  const newOrder = await Order.create({
    email,
    product: productDoc._id,
    quantity,
    totalPrice,
  });
  return newOrder;
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
