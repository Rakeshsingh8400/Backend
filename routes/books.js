// routes/books.js
const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db/index.js'); // Database connection module

const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }
    try {
        const decoded = jwt.verify(token, 'secret_key');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

// Protected routes
router.get('/books', verifyToken, async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM books');
        const books = result.rows;
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).send('Error fetching books');
    }
});

router.get('/books/:id', verifyToken, async (req, res) => {
    const bookId = req.params.id;
    try {
        const result = await db.query('SELECT * FROM books WHERE id = $1', [bookId]);
        const book = result.rows[0];
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).send('Error fetching book');
    }
});

router.post('/books', verifyToken, async (req, res) => {
    const { title, author, published_date, isbn } = req.body;
    try {
        const result = await db.query('INSERT INTO books (title, author, published_date, isbn) VALUES ($1, $2, $3, $4) RETURNING *', [title, author, published_date, isbn]);
        const newBook = result.rows[0];
        res.status(201).json(newBook);
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).send('Error adding book');
    }
});

router.put('/books/:id', verifyToken, async (req, res) => {
    const bookId = req.params.id;
    const { title, author, published_date, isbn } = req.body;
    try {
        const result = await db.query('UPDATE books SET title = $1, author = $2, published_date = $3, isbn = $4 WHERE id = $5 RETURNING *', [title, author, published_date, isbn, bookId]);
        const updatedBook = result.rows[0];
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(updatedBook);
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).send('Error updating book');
    }
});

router.delete('/books/:id', verifyToken, async (req, res) => {
    const bookId = req.params.id;
    try {
        const result = await db.query('DELETE FROM books WHERE id = $1 RETURNING *', [bookId]);
        const deletedBook = result.rows[0];
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).send('Error deleting book');
    }
});

module.exports = router;
