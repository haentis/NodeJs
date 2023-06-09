let dogsay = require('./main.js')
// VN: свои локальные модули нужно подключать, указывая полный или относительный путь к файлу,
// иначе node его не найдёт. в вашем случае main.js лежит в этом же каталоге, поэтому путь к нему
// будет таким: './main.js'
// Точка означает "текущий каталог"

console.log(Dogsays)
// VN: в текущем файле нет такой переменной Dogsays и node выдаёт ошибку:
// ReferenceError: Dogsays is not defined

// В целом, после подключения модуля, вам просто нужно вызвать функцию из этого модуля. Например:
// dogsay.say("Hello")