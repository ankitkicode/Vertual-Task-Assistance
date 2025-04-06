require('dotenv').config();
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dbConnection = require('./dbConnection/dbConnection')

dotenv.config();

// App setup
const app = express();
app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Database connection
dbConnection()

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/tasksRoutes'));
app.use('/api/chatbot', require('./routes/chatbotRoutes'));
// Test Route
app.get('/', (req, res) => {
    res.send('API Running...');
});

// Listen on Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
