const express = require('express');
const dotenv = require('dotenv');

const connectToDatabase = require('./src/database/mongoose.database');

dotenv.config();
const app = express();
const PORT = process.env.APP_PORT || 8000;

connectToDatabase();

app.get('/tasks', (req, res) => {
    const tasks = [{ description: 'Study coding', isCompleted: false }];
    res.status(200).send(tasks);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT} ...`));
