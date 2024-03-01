// src/services/openaiService.js

const OpenAI = require('openai');
const ApiKey = require('../models/apiKeyModel');

async function getStoredApiKey(username) {
    const apiKeyDocument = await ApiKey.findOne({ username }).sort({ _id: -1 });
    const apiKey = apiKeyDocument ? apiKeyDocument.apiKey : process.env['OPENAI_API_KEY'];
    return apiKey;
}

async function getOpenAIResponse(conversation, modelName, maxTokens, username) {
    const apiKey = await getStoredApiKey(username);
    const openai = new OpenAI({
        apiKey: apiKey,
    });

    try {
        const messages = conversation ? conversation.map(entry => ({ role: entry.role, content: entry.content })) : [{ role: "system", content: "You are a helpful assistant." }];
        const response = await openai.chat.completions.create({
            model: modelName,
            messages: messages,
            max_tokens: maxTokens,
        });
        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error("Error contacting OpenAI:", error);
        throw error;
    }
};

module.exports = {
    getOpenAIResponse,
};