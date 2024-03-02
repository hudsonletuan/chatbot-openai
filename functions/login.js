const User = require('../src/models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const conversationService = require('../src/services/conversationService');
const connectDB = require('../src/db');

exports.handler = async function(event, context) {
    await connectDB();

    const { username, password } = JSON.parse(event.body);
    const user = await User.findOne({ username });
    console.log('username:', user);
    if (!user) {
        return { statusCode: 401, body: JSON.stringify({ message: 'Invalid username or password.' }) };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return { statusCode: 401, body: JSON.stringify({ message: 'Invalid username or password.' }) };
    }

    const conversationHistory = await conversationService.getConversationHistory(username);
    if (conversationHistory) {
        console.log("Conversation history:", conversationHistory);
    }
    
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { statusCode: 200, body: JSON.stringify({ message: 'Successfully logged in.', username: user.username, token, conversationHistory }) };
};