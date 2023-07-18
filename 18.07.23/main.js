const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); 

class DataStorage {
    constructor() {
      
      this.db = new sqlite3.Database(':memory:');
    }
  
    async insertData(data) {
      // Вставка данных в базу данных
      return new Promise((resolve, reject) => {
        this.db.run('INSERT INTO table_name (column1, column2) VALUES (?, ?)', [data.value1, data.value2], function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.lastID);
          }
        });
      });
    }
  
    async updateData(id, newData) {
      // Обновление данных в базе данных по ID
      return new Promise((resolve, reject) => {
        this.db.run('UPDATE table_name SET column1 = ?, column2 = ? WHERE id = ?', [newData.value1, newData.value2, id], function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.changes); 
          }
        });
      });
    }
  
    async deleteData(id) {
      return new Promise((resolve, reject) => {
        this.db.run('DELETE FROM table_name WHERE id = ?', [id], function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.changes);
          }
        });
      });
    }
  
    async fetchData() {
      return new Promise((resolve, reject) => {
        this.db.all('SELECT * FROM table_name', (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows); 
          }
        });
      });
    }
  }
  