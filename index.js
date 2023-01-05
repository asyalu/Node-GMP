import express from 'express';
import { schema, validator } from './schema.js';
import { v4 as uuidv4 } from 'uuid';

const PORT = 3000;

const app = express();

const users = [
    {
        id: '1',
        login: 'admin',
        password: 'admin123',
        age: 33,
        isDeleted: false
    }
];

app.use(express.json());

app.get('/', (req, res) => {
    const loginSubstring = req.query.loginSubstring;
    const limit = req.query.limit;
    const filteredUsers = users.filter((user) => user.login === loginSubstring);

    if (filteredUsers.length) {
        return res.json(filteredUsers.slice(0, limit ?? filteredUsers.length));
    }

    return res.json(users.slice(0, limit ?? users.length));
});

app.get('/:id', (req, res) => {
    const user = users.find((u) => u.id === req.params.id);

    if (user) {
        return res.json(user);
    }

    res.status(404).json('not found');
});

app.post('/', validator.body(schema), (req, res) => {
    const id = uuidv4();
    const newUser = { ...req.body, id, isDeleted: false };
    users.push(newUser);
    res.json(newUser);
});

app.put('/', validator.body(schema), (req, res) => {
    const index = users.findIndex((u) => u.id === req.query.id);
    users[index] = { ...users[index], ...req.body };
    res.json(users);
});

app.delete('/', (req, res) => {
    const index = users.findIndex((u) => u.id === req.query.id);
    users[index].isDeleted = true;
    res.json('user deleted');
});

app.listen(PORT);
