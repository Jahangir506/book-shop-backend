import { TProduct } from "./product.interface";
import Product from "./product.model";

const createBook = async (product: TProduct) => {
    const result = await Product.create(product)
    return result;
}

const getAllBook = async () => {
    const result = await Product.find();
    return result;
}

const getSingleBook = async (id: string) => {
    const result = await Product.findById(id);
    return result;
}


const updateBook = async (id: string, data: TProduct) => {
    const result = await Product.findByIdAndUpdate(id, data, { upsert: true, new: true });
    return result;
}

const deleteBook = async (id: string) => {
    const result = await Product.findByIdAndDelete(id);
    return result;
}

export const productService = {
    createBook,
    getAllBook,
    getSingleBook,
    updateBook,
    deleteBook
}