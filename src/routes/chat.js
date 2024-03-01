const express = require('express');
const router = express.Router();
const conversationService = require('../services/conversationService');
const User = require('../models/userModel');
const { getOpenAIResponse } = require('../services/openaiService');

router.post('/', async (req, res) => {
    const userMessage = req.body.message;
    const username = req.session.username;

    const user = await User.findOne({ username }).sort({_id: -1});
    if (!user) {
        return res.status(400).json({ message: 'No API Key or Model found for the user. Please set an API Key and Model.' });
    }

    const modelName = user.modelName;
    let maxTokens;
    if (modelName === 'gpt-4') {
        maxTokens = 4096;
    } else {
        maxTokens = 2048;
    }

    try {
        await conversationService.updateConversationHistory(username, {
            role: "user",
            content: userMessage,
        });

        const history = await conversationService.getConversationHistory(username);
        const chatbotResponse = await getOpenAIResponse(history, modelName, maxTokens, username);

        await conversationService.updateConversationHistory(username, {
            role: "assistant",
            content: chatbotResponse,
        });

        res.json({ message: chatbotResponse });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error processing your message, please try again.");
    }
});

module.exports = router;