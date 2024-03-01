const User = require('../src/models/userModel');
const bcrypt = require('bcryptjs');
const connectDB = require('../src/db');

exports.handler = async function(event, context) {
    await connectDB();

    const { username, email, password } = JSON.parse(event.body);
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        if (existingUser.username === username) {
            return { statusCode: 400, body: JSON.stringify({ message: 'Username is already taken. Please choose a different username.' }) };
        } else {
            return { statusCode: 400, body: JSON.stringify({ message: 'Email is already taken. Please choose a different email.' }) };
        }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return { statusCode: 200, body: JSON.stringify({ message: 'Sign-up successful. You can now log in.' }) };
};