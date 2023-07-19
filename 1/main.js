const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.get('/register', (req, res) => {
  const registerPath = path.join(__dirname, 'register.html');
  res.sendFile(registerPath);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use(express.json());

app.post('/users', (req, res) => {
  const newUser = req.body;
  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading users.json:', err);
      return res.status(500).send('Internal Server Error');
    }

    const users = JSON.parse(data);
    users.push(newUser);

    fs.writeFile('users.json', JSON.stringify(users), (err) => {
      if (err) {
        console.error('Error writing users.json:', err);
        return res.status(500).send('Internal Server Error');
      }

      const redirectUrl = `/users?name=${encodeURIComponent(newUser.username)}`;
      res.send(`<html><head><meta http-equiv="refresh" content="0;url=${redirectUrl}"></head></html>`);
    });
  });
});


app.get('/users', (req, res) => {
  const name = req.query.name;

  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading users.json:', err);
      return res.status(500).send('Internal Server Error');
    }

    const users = JSON.parse(data);
    const userExists = users.some(user => user.username === name);

    if (userExists) {
      const usersPagePath = path.join(__dirname, 'users.html');
      return res.sendFile(usersPagePath);
    } else {
      return res.status(404).send('User not found');
    }
  });
});
