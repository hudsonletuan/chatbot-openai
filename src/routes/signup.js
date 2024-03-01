const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        if (existingUser.username === username) {
            return res.status(400).json({ message: 'Username is already taken. Please choose a different username.' });
        } else {
            return res.status(400).json({ message: 'Email is already taken. Please choose a different email.' });
        }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.json({ message: 'Sign-up successful. You can now log in.' });
});

module.exports = router;