// src/app.js

const express = require('express');
const bodyParser = require('body-parser');
const loginRoute = require('./routes/login');
const signupRoute = require('./routes/signup');
const apiKeyRoute = require('./routes/api-key');
const chatRoute = require('./routes/chat');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/login', loginRoute);
app.use('/signup', signupRoute);
app.use('/api-key', apiKeyRoute);
app.use('/chat', chatRoute);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});