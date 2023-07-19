const express = require('express');
const app = express();
const port = 3000;


app.get('/', async (req, res) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    res.send('Привет, это главная страница!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Что-то пошло не так...');
  }
});

app.get('/about', (req, res) => {
  res.send('Это страница "О нас"');
});
app.use((req, res) => {
  res.status(404).send('Страница не найдена');
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
