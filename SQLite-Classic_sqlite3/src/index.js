require('dotenv').config();
const express = require('express');


// const sqlite3 = require('sqlite3').verbose(); - выводит дополнительную информацию

const app = express();
const todoRoutes = require('./routes/todoRoutes');
const { errorHandler } = require('./middleware/errorHandling');

// Initialize SQLite database


// Middleware for JSON body parsing
// app.use(bodyParser.json()); // устарел с Express 4.16
app.use(express.json());

// Routes
app.use('/todos', todoRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
