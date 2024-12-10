// Interface for Product Model
interface IProduct extends Document {
    title: string;
    author: string;
    price: number;
    category: BookCategory;
    description: string;
    quantity: number;
    inStock: boolean;
}