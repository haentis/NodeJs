// VN: чтобы этот файл серьёзно мог называться модулем, нужно, чтобы он просто содержал и
// экспортировал  функции (или классы, генераторы, данные и тд.) но ничего не выполнял.
// ^^^^^^^^^^^^^
// По заданию, функция должна быть похожа на cow.say, т.е. принимать в качестве аргумента текст,
// который потом отобразит в консоли вместе с ascii-картинкой. Т.е. определение функции в вашем
// случае могло быть таким: exports.dogSay = function(message) {...

function DogSay(){
// VN: не называйте функции с большой буквы. Одно из правил `хорошего тона` среди разработчиков:
// с большой буквы именуются только классы или импортированные объекты
    let log = console.log('')
    console.log('     \\');
    console.log('      \\');
    console.log('       \\');
    console.log('           __');
    console.log('  \\ ______/ V`-,');
    console.log('   }        /~~');
    console.log('  /_)^ --,r\'');
    console.log(' |b      |b');
}

let Dogsays = console.log(DogSay())
// VN: значение Dogsays здесь undefined. Зачем вам оно?