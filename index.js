const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const booksRoutes = require('./routes/books');
const db = require('./db'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/api', booksRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
