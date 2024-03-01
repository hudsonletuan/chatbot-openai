// routes/login.js

const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const conversationService = require('../services/conversationService');

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid username or password.' });
    }
    // Session handling logic here
    // Start a session for the user
    req.session.userId = user._id;
    req.session.username = user.username;

    // Retrieve the conversation history for the user
    const conversationHistory = await conversationService.getConversationHistory(req.session.username);
    if (conversationHistory) {
        console.log("Conversation history:", conversationHistory);
    }

    res.json({ message: 'Successfully logged in.', username: user.username, conversationHistory: conversationHistory });
});

module.exports = router;