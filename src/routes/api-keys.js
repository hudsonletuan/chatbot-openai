const express = require('express');
const router = express.Router();
const ApiKey = require('../models/apiKeyModel');

router.post('/', async (req, res) => {
    const { apiKey, modelName } = req.body;
    const newApiKey = new ApiKey({ apiKey, modelName, username: req.session.username });
    await newApiKey.save();
    res.json({ success: true });
});

module.exports = router;