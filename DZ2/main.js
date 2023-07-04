const readline = require('readline');
const EventEmitter = require('events');

class InputReader extends EventEmitter {
  constructor() {
    super();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  start() {
    this.rl.on('line', (input) => {
      if (input === 'exit') {
        this.emit('exit');
      } else if (input.startsWith('solve')) {
        const expression = input.slice(6);
        this.emit('solve', expression);
      } else {
        this.emit('input', input);
      }
    });
  }

  stop() {
    this.rl.close();
  }
}

const reader = new InputReader();

reader.on('input', (input) => {
  console.log(input);
});

reader.on('solve', (expression) => {
  try {
    const result = eval(expression);
    console.log(result);
  } catch (error) {
    console.log('Не могу вычислить');
  }
});

reader.on('exit', () => {
  reader.stop();
  process.exit();
});

reader.start();
