const args = process.argv.slice(2);

const num = parseInt(args[0]);

const result = num % 2 === 0 ? "Even" : "Odd";

console.log(result);
