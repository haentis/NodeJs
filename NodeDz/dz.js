import { prompt } from './main.js';

prompt("Сколько вам лет?")
  .then(Number)
  .then(val => {
    let userAge = val;
    console.log("Ваш возраст:", userAge);
  });
getUserAge();
