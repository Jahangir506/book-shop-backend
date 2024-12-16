
# Book shop backend API


## Project discription
This is a backend app for managing a book store. It helps with tasks like adding books, updating book details, placing orders, and calculating sales. The app is built using Express.js, TypeScript, and MongoDB, making it easy to use and well-organized.


## Table of Contents

    1. Features 
    2. Technologies
    3. Installation
    4. Project Structure
    5. Usage
    6. Questions
## Features and Implement

1. **Product Management (books)**:

- Create a new book.
- Retrieve all books or filter books by title, author, or category.
- Retrieve a specific book by it by ID.
- Update a book's details.
- Delete a book.

2. **Order Management**:

- Place an order for a book.
- Manage inventory (update book quantity and stock status based on orders).
- Calculate total revenue from all orders using MongoDB aggregation.

***Error Handling***

- Validates request inputs and provides detailed error messages.
- Handles insufficient stock
## Technologies Used

- **Backend Framework:** Express.js
- **Programming Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **Third Party Package:** Use to dev Dependencies
## Installation

### Prerequisites

```bash
- Node.js (v16 or above)
- MongoDB with ( Connect Mongoose )
```

1. Clone repository:
   ```bash
   git clone - https://github.com/Jahangir506/book-shop-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   npm run dev
   ```
4. Access the API:
   ```bash
    Base URL: `https://book-shop-backend-snowy.vercel.app/`

    ```
## Project Structure

```plaintext
book-shop-api/
├── dist/                                   # Compiled JavaScript code
├── src/                                    # src file to
│   ├── app                                 # App folder and Config file
│   ├── modules/                            # Modulers pattern
        └── Product                         # All Product file
            └── Product.interface.ts
            └── Product.model.ts
            └── Product.controler.ts
            └── Product.route.ts            
            └── Product.service.ts
            └── order.validation.ts          
         └── Order                          # All Order file
            └── order.interface.ts
            └── order.model.ts
            └── order.controler.ts
            └── order.route.ts            
            └── order.service.ts
            └── order.validation.ts           
│   └── app.ts                              # Application setup
    └── server.ts                           # server and others connection setup
├── .env                                    # Environment variables
├── tsconfig.json                           # TypeScript configuration
└── package.json                            # Project dependencies
```
## Usage

**Products (Books)**
### 1. Create a Book
- **Endpoint:** `/api/products`
- **Method:** `POST`
- **Request Body:**
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "price": 10,
  "category": "Fiction",
  "description": "A story about the American dream.",
  "quantity": 100,
  "inStock": true
}
```

```json
{
  "message": "Book created successfully",
  "success": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "price": 10,
    "category": "Fiction",
    "description": "A story about the American dream.",
    "quantity": 100,
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z",
  }
}
```

#### 2. Get All Books
- **Endpoint:** `/api/products`
- **Method:** `GET`
- **Query Parameters:**
  - `searchTerm`: Filter books by title, author, or category.
- **Response:**
  ```json
 {
  "message": "Books retrieved successfully",
  "status": true,
  "data": [
    {
      "_id": "648a45e5f0123c45678d9012",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "price": 10,
      "category": "Fiction",
      "description": "A story about the American dream.",
      "quantity": 100,
      "inStock": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z",
    },
    // ... rest data
  ]
}
  ```

#### 3. Get a Specific Book
- **Endpoint:** `/api/products/:productId`
- **Method:** `GET`
- **Response:**
  ```json
 {
  "message": "Book retrieved successfully",
  "status": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "price": 10,
    "category": "Fiction",
    "description": "A story about the American dream.",
    "quantity": 100,
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z",
  }
}
  ```

#### 4. Update a Book
- **Endpoint:** `/api/products/:productId`
- **Method:** `PUT`
- **Request Body:** Partial updates allowed, e.g.,
  ```json
  {
    "price": 15,
    "quantity": 25
  }
  ```
- **Response:**
  ```json
  {
  "message": "Book updated successfully",
  "status": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "name": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "price": 15,  // Price updated
    "category": "Fiction",
    "description": "A story about the American dream.",
    "quantity": 25,  // Quantity updated
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T11:00:00.000Z",  // Updated timestamp
  }
}
  ```

#### 5. Delete a Book
- **Endpoint:** `/api/products/:productId`
- **Method:** `DELETE`
- **Response:**
  ```json
  {
  "message": "Book deleted successfully",
  "status": true,
  "data": {}
}
  ```

### Orders

#### 1. Place an Order
- **Endpoint:** `/api/orders`
- **Method:** `POST`
- **Request Body:**
  ```json
 {
  "email": "customer@example.com",
  "product": "648a45e5f0123c45678d9012",
  "quantity": 2,
  "totalPrice": 30
}
  ```
- **Response:**
  ```json
 {
  "message": "Order created successfully",
  "status": true,
  "data": {
    "_id": "648b45f5e1234b56789a6789",
    "email": "customer@example.com",
    "product": "648a45e5f0123c45678d9012",
    "quantity": 2,
    "totalPrice": 30,
    "createdAt": "2024-11-19T12:00:00.000Z",
    "updatedAt": "2024-11-19T12:00:00.000Z",
  }
}
  ```

#### 2. Calculate Total Revenue
- **Endpoint:** `/api/orders/revenue`
- **Method:** `GET`
- **Response:**
  ```json
 {
  "message": "Revenue calculated successfully",
  "status": true,
  "data": {
    "totalRevenue": 450  // Total revenue calculated from all orders
  }
}
  ```
## Contact

If you have any questions or feedback, feel free to reach out:
- **Email:**md.jahangir.alam9649@gmail.com
- **Github:**https://github.com/Jahangir506