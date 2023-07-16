const sqlite3 = require('sqlite3').verbose();

class DataStorage {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath);
    this.createTable();
  }

  createTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        login TEXT,
        passwd TEXT,
        email TEXT
      )
    `;
    this.db.run(createTableQuery);
  }

  addUser(login, passwd, email) {
    const insertQuery = `
      INSERT INTO Users (login, passwd, email)
      VALUES (?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
      this.db.run(insertQuery, [login, passwd, email], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }

  getUser(id) {
    const selectQuery = `
      SELECT * FROM Users WHERE id = ?
    `;
    return new Promise((resolve, reject) => {
      this.db.get(selectQuery, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
}

// Пример использования класса DataStorage
const dataStorage = new DataStorage('database.db');
dataStorage.addUser('john_doe', 'pass123', 'john@example.com')
  .then(userId => {
    console.log('New user added. User ID:', userId);
    return dataStorage.getUser(userId);
  })
  .then(user => {
    console.log('Retrieved user:', user);
  })
  .catch(err => {
    console.error('Error:', err);
  });
