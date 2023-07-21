// datastorage.js
class DataStorage {
    constructor(databaseConfig) {
        
        const sqlite3 = require('sqlite3').verbose();
        this.db = new sqlite3.Database(databaseConfig.file, (err) => {
            if (err) {
                console.error('Error connecting to the database:', err.message);
            } else {
                console.log('Connected to the database');
            }
        });

        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                age INTEGER NOT NULL
            )
        `;
        this.db.run(createTableQuery, (err) => {
            if (err) {
                console.error('Error creating table:', err.message);
            } else {
                console.log('Table "users" created or already exists');
            }
        });
    }
    getUserById(userId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE id = ?';
            this.db.get(query, [userId], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    createUser(name, email, age) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO users (name, email, age) VALUES (?, ?, ?)';
            this.db.run(query, [name, email, age], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID, name, email, age });
                }
            });
        });
    }
}

export default DataStorage;
