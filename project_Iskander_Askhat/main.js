// const fs = require('fs');

// fs.readFile('data.json', 'utf8', (err, data) => {
//   if (err) {
//     console.error('Ошибка при чтении файла:', err);
//     return;
//   }

//   let jsonData = JSON.parse(data);
//   let count = jsonData.count;

//   console.log('Текущее значение count:', count);

//   count++;

//   jsonData.count = count;

//   fs.writeFile('data.json', JSON.stringify(jsonData), (err) => {
//     if (err) {
//       console.error('Ошибка при записи файла:', err);
//     } else {
//       console.log('Значение count успешно обновлено и записано в файл.');
//     }
//   });
// });




// const fs = require('fs');
// const path = require('path');
// const convert = require('xml-js');

// const args = process.argv.slice(2);
// const sourceFile = args[0];
// const destinationFile = args[1];

// const sourceExtension = path.extname(sourceFile).toLowerCase();
// const destinationExtension = path.extname(destinationFile).toLowerCase();

// if (sourceExtension === '.json' && destinationExtension === '.xml') {
//   fs.readFile(sourceFile, 'utf8', (err, data) => {
//     if (err) {
//       console.error('Ошибка при чтении файла:', err);
//       return;
//     }

//     const jsonData = JSON.parse(data);
//     const xmlData = convert.js2xml(jsonData, { compact: true, spaces: 2 });

//     fs.writeFile(destinationFile, xmlData, (err) => {
//       if (err) {
//         console.error('Ошибка при записи файла:', err);
//       } else {
//         console.log('Файл успешно конвертирован в XML:', destinationFile);
//       }
//     });
//   });
// } else if (sourceExtension === '.xml' && destinationExtension === '.json') {
//   fs.readFile(sourceFile, 'utf8', (err, data) => {
//     if (err) {
//       console.error('Ошибка при чтении файла:', err);
//       return;
//     }

//     const xmlData = data;
//     const jsonData = convert.xml2js(xmlData, { compact: true, spaces: 2 });

//     fs.writeFile(destinationFile, JSON.stringify(jsonData), (err) => {
//       if (err) {
//         console.error('Ошибка при записи файла:', err);
//       } else {
//         console.log('Файл успешно конвертирован в JSON:', destinationFile);
//       }
//     });
//   });
// } else {
//   console.error('Неверное расширение файлов. Пожалуйста, укажите исходный файл в формате JSON и файл назначения в формате XML, или наоборот.');
// }


// const express = require('express');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const port = 3000;

// app.get('/register', (req, res) => {
//   const registerPath = path.join(__dirname, 'register.html');
//   res.sendFile(registerPath);
// });

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

// app.use(express.json());

// app.post('/users', (req, res) => {
//   const newUser = req.body;
//   fs.readFile('users.json', 'utf8', (err, data) => {
//     if (err) {
//       console.error('Error reading users.json:', err);
//       return res.status(500).send('Internal Server Error');
//     }

//     const users = JSON.parse(data);
//     users.push(newUser);

//     fs.writeFile('users.json', JSON.stringify(users), (err) => {
//       if (err) {
//         console.error('Error writing users.json:', err);
//         return res.status(500).send('Internal Server Error');
//       }

//       const redirectUrl = `/users?name=${encodeURIComponent(newUser.username)}`;
//       res.send(`<html><head><meta http-equiv="refresh" content="0;url=${redirectUrl}"></head></html>`);
//     });
//   });
// });


// app.get('/users', (req, res) => {
//   const name = req.query.name;

//   fs.readFile('users.json', 'utf8', (err, data) => {
//     if (err) {
//       console.error('Error reading users.json:', err);
//       return res.status(500).send('Internal Server Error');
//     }

//     const users = JSON.parse(data);
//     const userExists = users.some(user => user.username === name);

//     if (userExists) {
//       const usersPagePath = path.join(__dirname, 'users.html');
//       return res.sendFile(usersPagePath);
//     } else {
//       return res.status(404).send('User not found');
//     }
//   });
// });


// const express = require('express');
// const app = express();
// const port = 3000;


// app.get('/', async (req, res) => {
//   try {
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     res.send('Привет, это главная страница!');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Что-то пошло не так...');
//   }
// });

// app.get('/about', (req, res) => {
//   res.send('Это страница "О нас"');
// });
// app.use((req, res) => {
//   res.status(404).send('Страница не найдена');
// });

// app.listen(port, () => {
//   console.log(`Сервер запущен на http://localhost:${port}`);
// });


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
  