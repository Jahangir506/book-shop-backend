import { model, Schema } from 'mongoose';
import { TBook } from './product.interface';

// product schema
const bookSchema = new Schema<TBook>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
    },
    category: {
      type: String,
      enum: [
        'Fiction',
        'Science',
        'SelfDevelopment',
        'Religious',
        'English',
        'Programming',
      ],
      required: [true, 'Category is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'InStock status is required'],
    },
  },
  {
    timestamps: true,
  }
);

// // creating a custom static method
// productSchema.statics.isBookExists = async function (id: string) {
//     const existingBook = await Product.findOne({ id })
//     return existingBook;
// }

// bookSchema.pre('find', function (this: any, next: NextFunction) {
//   this.find({ inStock: 'false' })
//   next()
// })

// product model
const Product = model<TBook>('Product', bookSchema);

export default Product;
