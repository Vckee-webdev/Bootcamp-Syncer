const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 4000;
const usersFile = path.join(__dirname, "users.json");

// Middleware to parse JSON request bodies
app.use(express.json());

// Helper function to read users from file
const readUsers = () => {
    try {
        const data = fs.readFileSync(usersFile, "utf8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Helper function to write users to file
const writeUsers = (users) => {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), "utf8");
};

// Home Route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// ✅ GET All Users
app.get("/users", (req, res) => {
    const users = readUsers();
    res.send(users);
});

// ✅ GET User by ID
app.get("/users/:id", (req, res) => {
    const users = readUsers();
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (user) {
        res.send(user);
    } else {
        res.status(404).send({ message: "User not found" });
    }
});

// ✅ POST - Add a New User
app.post("/users", (req, res) => {
    const users = readUsers();
    const { id, name } = req.body;

    // ✅ Validate required fields
    if (!id || !name) {
        return res.status(400).send({ message: "Both 'id' and 'name' are required." });
    }

    // ✅ Validate data types
    if (typeof id !== "number" || typeof name !== "string") {
        return res.status(400).send({ message: "'id' must be a number and 'name' must be a string." });
    }

    // ✅ Check if ID already exists
    if (users.find(u => u.id === id)) {
        return res.status(400).send({ message: "User ID already exists." });
    }

    // ✅ Save new user
    const newUser = { id, name };
    users.push(newUser);
    writeUsers(users);

    res.status(201).send({ message: "User added successfully", user: newUser });
});


// ✅ PUT - Update a User
app.put("/users/:id", (req, res) => {
    let users = readUsers();
    const userId = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === userId);

    if (index === -1) {
        return res.status(404).send({ message: "User not found" });
    }

    users[index] = { ...users[index], ...req.body };
    writeUsers(users);

    res.send({ message: "User updated successfully", user: users[index] });
});

// ✅ DELETE - Remove a User
app.delete("/users/:id", (req, res) => {
    let users = readUsers();
    const userId = parseInt(req.params.id);
    const filteredUsers = users.filter(u => u.id !== userId);

    if (users.length === filteredUsers.length) {
        return res.status(404).send({ message: "User not found" });
    }

    writeUsers(filteredUsers);
    res.send({ message: "User deleted successfully" });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
