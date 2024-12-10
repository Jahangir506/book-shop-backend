import { TProduct } from "./product.interface";
import Product from "./product.model";

const createProduct = async (payload: TProduct) => {
    const result = await Product.create(payload)
    return result;
}

const getAllProduct = async () => {
    const products = await Product.find();
    return products
}

const getSpecificProduct = async () => {
    const product = await Product.findOne();
    return product
}

export const productService = {
    createProduct,
    getAllProduct,
    getSpecificProduct
}