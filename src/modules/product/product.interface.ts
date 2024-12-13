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
