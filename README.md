
# PROJECT LINK ---> 

# 🛠️ How the Shopping Cart API Project Works – Step-by-Step Explanation
## 🔁 Overview Workflow
User Registers or Logs In

Receives JWT Token on Login

Fetches Products from MongoDB

Adds Products to Cart

Updates or Removes Items in Cart

Cart is stored per user (secured via token)


# 1. User Registration & Login (Authentication)
## ✅ Register (POST /register)
User sends name, email, and password.

Password is hashed using bcrypt.

New user is saved to the MongoDB users collection.

Response confirms registration.

## ✅ Login (POST /login)
User sends email and password.

Password is compared with the hashed password in DB.

If valid, a JWT token is generated.

This token is sent in the response and will be used for future protected requests.

### 📦 Purpose: To identify and authenticate users securely.


# 2. Product Management (Public)
## ✅ Get All Products (GET /products)
No authentication needed.

Fetches all products from the products collection in MongoDB.

Returns an array of product objects.

## ✅ Get Product by ID (GET /products/:id)
Accepts a product ID as a parameter.

Searches MongoDB for that product.

Returns full product details (name, price, stock, description).

### 📦 Purpose: Allow users to view available products before shopping.


# 3. Shopping Cart Operations (Protected)
## 🛡️ All cart routes are protected by JWT authentication. The token must be sent in the Authorization header (Bearer <token>).

## ✅ Add Product to Cart (POST /cart)
Requires product ID and quantity in request body.

Validates that product exists and is in stock.

Adds item to the user's cart (creates entry in the cart collection with userId, productId, and quantity).

If the product is already in the cart, it can optionally increase quantity.

### 📦 Logic:

Input: { productId, quantity }

Check if product exists

Create cart item with user's ID

## ✅ Update Cart Item (PUT /cart/:id)
Updates the quantity of a specific cart item.

Validates cart item ID and checks if it belongs to the authenticated user.

Modifies the quantity in MongoDB.

### 📦 Logic:

Input: { quantity }

Check cart item by ID and user

Update quantity if valid

## ✅ Remove Product from Cart (DELETE /cart/:id)
Deletes a cart item from MongoDB.

Ensures user is authenticated and owns the cart item.

### 📦 Logic:

Input: cart item ID in URL

Find and delete if owned by user

# 🛡️ JWT Token Middleware
Middleware function (authMiddleware.js) runs before protected routes.

Extracts JWT token from Authorization header.

Verifies token and attaches user ID to req.user.

# ✅ Secures the cart operations

## ⚠️ Error Handling
Centralized error handler catches all errors.

Returns consistent JSON responses with:

status codes

error messages

## ✅ Input Validation
Checks for missing or invalid fields (like wrong IDs or empty names).

Ensures quantities are positive numbers.

Avoids corrupted or unexpected data in the database.


## 🧪 API Testing with ThunderClient
Each route is tested:

Registration & Login

Get products

Add/update/delete cart items

Token from login is used in header:
Authorization: Bearer <JWT token>

Responses checked for:

Correct data

Proper status codes (200, 201, 401, 404, etc.)

### ✅ Screenshots of ThunderClient tests are taken for documentation.


# 📬 Final Flow Summary (Diagram Style)

[User Registers/Login]
        |
        v
[Receives JWT Token]
        |
        v
[Fetch Products] <----- Public
        |
        v
[Add to Cart] --------> [JWT Secured]
        |
        v
[Update/Delete Cart Item] ---> MongoDB Updates





# 1. 🌐 Node.js and Express API Setup (DEFINITIONS)
## 📌 What is Node.js?
Node.js is a JavaScript runtime built on Chrome’s V8 engine. It allows you to run JavaScript on the server side, making it possible to build scalable and fast network applications.

## 📌 What is Express.js?
Express.js is a minimal and flexible Node.js web application framework. It provides robust features for building RESTful APIs.

### 🧱 Role in Project:
Handle HTTP requests (GET, POST, PUT, DELETE)

Define routes like /products, /cart, /register, etc.

Send responses to client based on operations

# 2. 🛢️ MongoDB Integration
## 📌 What is MongoDB?
MongoDB is a NoSQL document-based database. It stores data in flexible, JSON-like documents (BSON), allowing dynamic schemas.

## 📌 What is Mongoose?
Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js. It provides schema validation and a simple API to interact with the database.

### 🧱 Role in Project:
Products Collection: Stores product data (name, price, description, stock quantity)

Cart Collection: Stores user cart items (user ID, product ID, quantity)

Supports CRUD operations via Mongoose models


# 3. ⚠️ API Error Handling and Validation
📌 What is Error Handling?
It ensures that the API responds with meaningful messages and status codes when something goes wrong (e.g., bad request, server error).

## 📌 What is Validation?
It ensures that the incoming data is in the correct format and all required fields are present.

### 🧱 Role in Project:
Prevents invalid data (e.g., non-existing product IDs, negative quantities)

Uses HTTP status codes:

400: Bad input

404: Resource not found

500: Internal server error

Improves reliability and user experience

# 4. 🔐 Authentication & Authorization
📌 What is Authentication?
It’s the process of verifying who a user is (e.g., login with email/password).

## 📌 What is Authorization?
It determines what resources a user can access (e.g., allowing only logged-in users to access cart operations).

## 📌 What is JWT (JSON Web Token)?
JWT is a compact, URL-safe token used for securely transmitting information between parties. It is used for stateless authentication.

### 🧱 Role in Project:
/register route: Creates a new user

/login route: Authenticates user and issues JWT token

Protected routes (e.g., /cart):

Require a valid token in the Authorization header

Uses middleware to decode and verify the token

Ensures only the owner can access their cart


# 5. 🧪 Testing with ThunderClient
## 📌 What is ThunderClient?
ThunderClient is a lightweight REST client extension for Visual Studio Code, used to test and debug APIs.

### 🧱 Role in Project:
Test all API endpoints (GET, POST, PUT, DELETE)

Validate:

Correct status codes

Proper data returned

Authorization protection

Screenshot evidence required for submission


# ScreenShorts are in a Saperate Folder.