const fs = require('fs');

fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Ошибка при чтении файла:', err);
    return;
  }

  let jsonData = JSON.parse(data);
  let count = jsonData.count;

  console.log('Текущее значение count:', count);

  count++;

  jsonData.count = count;

  fs.writeFile('data.json', JSON.stringify(jsonData), (err) => {
    if (err) {
      console.error('Ошибка при записи файла:', err);
    } else {
      console.log('Значение count успешно обновлено и записано в файл.');
    }
  });
});
