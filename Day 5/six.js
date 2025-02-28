const users = [
    { name: "Ram", age: 30 },
    { name: "Janu", age: 20 },
    { name: "Viks", age: 35 },
    { name: "Somu", age: 25 }
];

const args = process.argv.slice(2);
const ageLimit = parseInt(args[0]);

const filteredUsers = users.filter(user => user.age >= ageLimit);

console.log(filteredUsers);
