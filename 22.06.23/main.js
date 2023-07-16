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




const fs = require('fs');
const path = require('path');
const convert = require('xml-js');

const args = process.argv.slice(2);
const sourceFile = args[0];
const destinationFile = args[1];

const sourceExtension = path.extname(sourceFile).toLowerCase();
const destinationExtension = path.extname(destinationFile).toLowerCase();

if (sourceExtension === '.json' && destinationExtension === '.xml') {
  fs.readFile(sourceFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка при чтении файла:', err);
      return;
    }

    const jsonData = JSON.parse(data);
    const xmlData = convert.js2xml(jsonData, { compact: true, spaces: 2 });

    fs.writeFile(destinationFile, xmlData, (err) => {
      if (err) {
        console.error('Ошибка при записи файла:', err);
      } else {
        console.log('Файл успешно конвертирован в XML:', destinationFile);
      }
    });
  });
} else if (sourceExtension === '.xml' && destinationExtension === '.json') {
  fs.readFile(sourceFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка при чтении файла:', err);
      return;
    }

    const xmlData = data;
    const jsonData = convert.xml2js(xmlData, { compact: true, spaces: 2 });

    fs.writeFile(destinationFile, JSON.stringify(jsonData), (err) => {
      if (err) {
        console.error('Ошибка при записи файла:', err);
      } else {
        console.log('Файл успешно конвертирован в JSON:', destinationFile);
      }
    });
  });
} else {
  console.error('Неверное расширение файлов. Пожалуйста, укажите исходный файл в формате JSON и файл назначения в формате XML, или наоборот.');
}
