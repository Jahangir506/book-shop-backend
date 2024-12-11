import { TProduct } from "./product.interface";
import Product from "./product.model";

const createProduct = async (payload: TProduct) => {
    const result = await Product.create(payload)
    return result;
}

const getAllProduct = async () => {
    const result = await Product.find();
    return result;
}

const getSingleProduct = async (id: string) => {
    const result = await Product.findById(id);
    return result;
}


const updateProduct = async (id: string, data: TProduct) => {
    const result = await Product.findByIdAndUpdate(id, data, { upsert: true, new: true });
    return result;
}

export const productService = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct
}