const conversationService = require('../src/services/conversationService');
const OpenAI = require('openai');
const User = require('../src/models/userModel');
const { getOpenAIResponse } = require('../src/services/openaiService');
const connectDB = require('../src/db');
const ApiKey = require('../src/models/apiKeyModel');

exports.handler = async function(event, context) {
    await connectDB();

    const userMessage = JSON.parse(event.body).message;
    const username = JSON.parse(event.body).username;
    console.log('username', username);

    //const user = await User.findOne({ username }).sort({_id: -1});
    const recentApiKey = await ApiKey.findOne({ username }).sort({_id: -1});
    console.log(recentApiKey);
    if (!recentApiKey) {
        return { statusCode: 400, body: JSON.stringify({ message: 'No API Key or Model found for the user. Please set an API Key and Model.' }) };
    }

    const modelName = recentApiKey.modelName;
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

        return { statusCode: 200, body: JSON.stringify({ message: chatbotResponse }) };
    } catch (error) {
        console.error(error);
        return { statusCode: 500, body: JSON.stringify({ message: "An error occurred. Please check your API Key or try again." }) };
    }
};