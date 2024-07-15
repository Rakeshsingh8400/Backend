Setup

Clone the repository:

git clone <repository-url>
cd library-api
Install dependencies:


npm install
Set up PostgreSQL:

Install PostgreSQL if not already installed.
Create a new database and note down the connection details (host, port, database, user, password).
Environment variables:
Create a .env file in the root directory and add the following:

makefile

PORT=3000
DB_HOST=<database-host>
DB_PORT=<database-port>
DB_DATABASE=<database-name>
DB_USER=<database-user>
DB_PASSWORD=<database-password>
JWT_SECRET=<your-jwt-secret>

Database Schema

users Table:

id SERIAL PRIMARY KEY
username VARCHAR(255) UNIQUE NOT NULL
password TEXT NOT NULL (hashed using bcrypt)

books Table:

id SERIAL PRIMARY KEY
title VARCHAR(255) NOT NULL
author VARCHAR(255) NOT NULL
published_date DATE
isbn VARCHAR(50)

User Authentication

POST /register: Register a new user.
http://localhost:3000/auth/register

Request body: { "username": "<username>", "password": "<password>" }
Stores hashed password in the users table.

POST /login: Authenticate a user and generate a JWT token.
http://localhost:3000/auth/login

Request body: { "username": "<username>", "password": "<password>" }
Returns a JWT token on successful authentication.

API Endpoints

All endpoints except /register and /login require a valid JWT token in the Authorization header (Bearer <token>).

GET /books: Retrieve all books.
http://localhost:3000/api/books

GET /books/:id: Retrieve a book by ID.
http://localhost:3000/api/books:id

POST /books: Add a new book.
http://localhost:3000/api/books

Request body: { "title": "<title>", "author": "<author>", "published_date": "<published_date>", "isbn": "<isbn>" }
PUT /books/:id: Update a book by ID.
http://localhost:3000/api/books:id

Request body: { "title": "<new-title>", "author": "<new-author>", "published_date": "<new-published_date>", "isbn": "<new-isbn>" }
DELETE /books/:id: Delete a book by ID.
http://localhost:3000/api/books:id

Implementation Details
Uses express for routing and middleware.
Interacts with PostgreSQL using pg module for database operations.
bcrypt for hashing passwords.
jsonwebtoken for generating and verifying JWT tokens.
Error handling and input validation are implemented for robustness.

Bonus Features

Pagination for the /books endpoint.
Unit tests using jest or mocha for API endpoints.

Usage

Start the server:
npm start
npm run dev

Access API endpoints: Use tools like Postman or curl to interact with the API.

Testing
Run tests using jest or mocha:
npm test
