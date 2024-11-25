# GearSphere

An Express application built with TypeScript, integrating MongoDB via Mongoose to manage a Car Store. This API supports managing cars and orders with CRUD operations, inventory management, and revenue calculation.

# Features

## Car Management

- Create a Car: Add a new car to the database with brand, model, year, price, category, description, quantity, and stock status.
- Retrieve All Cars: Fetch all cars or filter them by search terms (brand, model, or category).
- Retrieve a Specific Car: Get detailed information about a specific car by ID.
- Update a Car: Modify car details, such as price and quantity.
- Delete a Car: Remove a car from the database.

## Order Management

- Place an Order: Create a new order, update car inventory, and validate stock availability.
- Revenue Calculation: Aggregate and calculate the total revenue generated from all orders.
- Validation & Error Handling
- Mongoose schema validation for Cars and Orders.
- Generic error response structure for validation errors, resource not found, and insufficient stock.

# Technologies Used

- Backend Framework: Express.js
- Database: MongoDB with Mongoose
- Programming Language: TypeScript

# Installation

#### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or later)
- npm or yarn
- MongoDB

# Steps to Run the Project Locally

1. Clone the repository:

```
git clone <repository-url>
cd <repository-folder>
```

2. Install dependencies:

```
npm install
```

3. Create a .env file in the root directory with the following variables:

```
PORT=3000
MONGO_URI=<your-mongodb-connection-string>
```

4. Start the server:

```
npm run dev
```

The server will start on http://localhost:5000.

# API Endpoints

## Cars

- **POST** `/api/cars` : Create a new car.
- **GET** `/api/cars`: Retrieve all cars or filter by search terms (brand, model, or category).
- **GET** `/api/cars/:carId` : Retrieve a specific car by ID.
- **PUT** `/api/cars/:carId` : Update car details.
- **DELETE** `/api/cars/:carId` : Delete a car.

## Orders

- **POST** `/api/orders` : Place an order for a car.
- **GET** `/api/orders/revenue`: Calculate total revenue from all orders.
