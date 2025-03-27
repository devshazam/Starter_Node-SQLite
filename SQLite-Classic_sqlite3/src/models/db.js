const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('src/db/todos.db');

// Initialize SQLite database

const initDatabase = `
CREATE TABLE IF NOT EXISTS todos (
	id INTEGER PRIMARY KEY,
	email TEXT,
	link TEXT
);

CREATE TABLE IF NOT EXISTS emails (
	id INTEGER PRIMARY KEY,
	email TEXT,
	email_link INTEGER,
	FOREIGN KEY (email_link) REFERENCES todos (id)
);
`;

db.exec(initDatabase);

module.exports = db;

