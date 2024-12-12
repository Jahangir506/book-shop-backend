// product interface
export type TBook = {
  title: string;
  author: string;
  price: number;
  category:
    | 'Fiction'
    | 'Science'
    | 'SelfDevelopment'
    | 'Religious'
    | 'English'
    | 'Programming';
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

// // creating static
// export interface ProductModel extends Model<TProduct> {
//     isBookExists(id: string): Promise<TProduct | null>
// }
