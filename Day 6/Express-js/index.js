var express = require("express");

var app = express();

var port = 3000;

app.use(express.json());

var users = [
    { id: 1, name: 'viks' },
    { id: 2, name: 'des' },
    { id: 3, name: 'keer' }
];

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", (req, res) => {
    res.send(users);
});

app.get("/users/:id", (req, res) => {
    var userId = parseInt(req.params.id);
    var user = users.find(u => u.id === userId);

    if (user) {
        res.send(user);
    } else {
        res.status(404).send({ message: "User not found" });
    }
});

app.post('/users', (req, res) => {
    var newUser = req.body; 
       
    if (users.find(u => u.id === newUser.id)) {
        return res.status(400).send({ message: "User ID already exists" });
    }

    users.push(newUser); // Add the new user to the array
    res.status(201).send({ message: "User added successfully", user: newUser });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
