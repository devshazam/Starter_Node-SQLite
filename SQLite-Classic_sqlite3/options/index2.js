// https://github.com/dev-soufiane/todo-list-app/tree/master
const express = require('express');
const path = require('path');
const db = require('./database');

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Get all todos
app.get('/api/todos', (req, res) => {
  db.all('SELECT * FROM todos', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Add a new todo
app.post('/api/todos', (req, res) => {
  const { title } = req.body;
  db.run('INSERT INTO todos (title) VALUES (?)', [title], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  db.run('DELETE FROM todos WHERE id = ?', req.params.id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Todo deleted successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});