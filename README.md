# Стартер для Node-SQLite сборки
	1. SQLite_Classic: require('sqlite3')
		- 
	2. Sqlite_Experimental: require('node:sqlite')
		- ⛔Экспирементальная ф-ция - возможно перестанет работать
			- ⛔Нужна Node.js version 22.5.1 или выше! для работы 'node:sqlite'
		- ⛔Здесь работает сокращенный синтаксис через prepare() -> run() 