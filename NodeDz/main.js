export function prompt(message) {
  return new Promise((resolve, reject) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.question(message, (input) => {
      readline.close();
      resolve(input);
    });
  });
}
