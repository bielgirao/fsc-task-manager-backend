const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectToDatabase = require('./src/database/mongoose.database');
const TaskRouter = require('./src/routes/task.routes');

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.APP_PORT || 8000;
app.use(express.json());

connectToDatabase();

app.use('/tasks', TaskRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT} ...`));

module.exports = app;
