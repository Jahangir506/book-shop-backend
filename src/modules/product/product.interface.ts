
// product interface
export type TProduct = {
    title: string;
    author: string;
    price: number;
    category: 'Fiction' | 'Science' | 'SelfDevelopment' | 'Religious' | 'English' | 'Programming';
    description: string;
    quantity: number;
    inStock: boolean;
}

// order interface
export type TOrder = {
    email: string;
    product: string;
    quantity: number;
    totalPrice: number;
}
