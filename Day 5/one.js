const args = process.argv.slice(2);
const num1 = parseFloat(args[0]);
const num2 = parseFloat(args[1]);

const sum = num1 + num2;

console.log(`The sum of ${num1} and ${num2} is ${sum}`);
