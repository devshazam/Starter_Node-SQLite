const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');



// GET all todos
router.get('/', todoController.getAllTodos);

// GET todo by ID
router.get('/:id', todoController.getTodoById);

// Create todo
router.post('/', todoController.createTodo);

// Update todo
router.put('/:id', todoController.updateTodo);

// Delete todo
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
