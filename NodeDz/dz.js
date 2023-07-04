import { prompt } from './main.js';

prompt("Сколько вам лет?")
  .then(Number)
  .then(val => {  // VN: можно вместо этого просто .then(console.log)
    let userAge = val;
    console.log("Ваш возраст:", userAge);
  });
getUserAge();
