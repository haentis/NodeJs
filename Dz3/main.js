const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/calculate', (req, res) => {
  const { num1, num2 } = req.body;
  const sum = num1 + num2;
  res.json({ result: sum });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
