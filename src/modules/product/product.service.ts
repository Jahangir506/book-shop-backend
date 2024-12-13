import { TBook } from './product.interface';
import Product from './product.model';

const createBook = async (bookData: TBook) => {
  const product = await Product.create(bookData);
  return product;
};

const getAllBook = async (query: TBook) => {
  const product = await Product.find(query);
  return product;
};

const getSingleBook = async (id: string) => {
  const product = await Product.findById(id);
  return product;
};

const updateBook = async (id: string, data: TBook) => {
  const product = await Product.findByIdAndUpdate(id, data, {
    upsert: true,
    new: true,
  });
  return product;
};

const deleteBook = async (id: string) => {
  const product = await Product.findByIdAndDelete(id);
  return product;
};

export const productService = {
  createBook,
  getAllBook,
  getSingleBook,
  updateBook,
  deleteBook,
};
