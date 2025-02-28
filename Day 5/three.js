const args = process.argv.slice(2);

const reversedString = args[0].split('').reverse().join('');

console.log(reversedString);
