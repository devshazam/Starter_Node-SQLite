// https://github.com/Lucas8448/Todo-list/tree/main
const express = require('express');
const database = require('sqlite3');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = new database.Database('./database.db');

db.run('CREATE TABLE IF NOT EXISTS todolist (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, done BOOLEAN DEFAULT FALSE)')

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/todolist', (req, res) => {
  db.all('SELECT * FROM todolist', (err, rows) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(rows);
    }
  });
});

app.get('/todolist/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM todolist WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(row);
    }
  });
});

app.post('/todolist', (req, res) => {
  const { title, content } = req.body;
  db.run('INSERT INTO todolist (title, content) VALUES (?, ?)', [title, content], (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.put('/todolist/:id', (req, res) => {
  const id = req.params.id;
  const { title, content, done } = req.body;
  db.run('UPDATE todolist SET title = ?, content = ?, done = ? WHERE id = ?', [title, content, done ? 1 : 0, id], (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.delete('/todolist/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM todolist WHERE id = ?', [id], (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(port, () => {
  console.log(`Serving GUI at http://localhost:${port}`);
  console.log(`Serving API at http://localhost:${port}/todolist`);
});