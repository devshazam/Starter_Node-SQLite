const Todo = require('../models/Todo');
const db = require('../models/db');



exports.getAllTodos = async (req, res) => {
    try {
        db.all('SELECT * FROM todos', (err, rows) => {
            if (err) {
                console.error('Error fetching todos:', err.message);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            const todos = rows.map(row => new Todo(row.id, row.title, row.description, row.completed));
            res.json(todos);
        });
    } catch (error) {
        console.error('Error getting all todos:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get todo by ID
exports.getTodoById = async (req, res) => {
    try {
        const id = req.params.id;
        db.get('SELECT * FROM todos WHERE id = ?', [id], (err, row) => {
            if (err) {
                console.error('Error fetching todo by ID:', err.message);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            if (!row) {
                console.error('Todo not found');
                res.status(404).json({ message: 'Todo not 3' });
                return;
            }
            const todo = new Todo(row.id, row.title, row.description, row.completed);
            res.json(todo);
        });
    } catch (error) {
        console.error('Error getting todo by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create todo
exports.createTodo = async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const sql = 'INSERT INTO todos (title, description, completed) VALUES (?, ?, ?)';
        db.run(sql, [title, description, completed], function (err) {
            if (err) {
                console.error('Error creating todo:', err.message);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            res.status(201).json({ id: this.lastID });
        });
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update todo
exports.updateTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description, completed } = req.body;
        const sql = 'UPDATE todos SET title = ?, description = ?, completed = ? WHERE id = ?';
        db.run(sql, [title, description, completed, id], function (err) {
            if (err) {
                console.error('Error updating todo:', err.message);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            res.status(200).json({ message: 'Todo updated successfully' });
        });
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete todo
exports.deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = 'DELETE FROM todos WHERE id = ?';
        db.run(sql, [id], function (err) {
            if (err) {
                console.error('Error deleting todo:', err.message);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            res.status(204).end();
        });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
