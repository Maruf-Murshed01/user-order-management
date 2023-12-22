#user-order-management

#This project is a Node.js Express application built with TypeScript, integrated with MongoDB using Mongoose for user data and order management. Data integrity is maintained through validation using Joi/Zod.

#Setup
Prerequisites
Make sure you have the following installed:

Node.js
MongoDB

1. Clone the repository
2. Install dependencies

Endpoints
The API exposes the following endpoints:

GET /api/users: Get all users.
GET /api/users/:userId: Get a specific user by ID.
POST /api/users: Create a new user.
PUT /api/users/:userId: Update a user by ID.
DELETE /api/users/:userId: Delete a user by ID.
