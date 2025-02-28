const args = process.argv.slice(2);

const num = parseInt(args[0]);

for (let i = 1; i <= 10; i++) {
    console.log(`${num} x ${i} = ${num * i}`);
}
