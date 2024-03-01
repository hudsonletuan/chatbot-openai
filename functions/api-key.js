const ApiKey = require('../src/models/apiKeyModel');
const connectDB = require('../src/db');

exports.handler = async function(event, context) {
    await connectDB();
    
    const { apiKey, modelName } = JSON.parse(event.body);
    const newApiKey = new ApiKey({ apiKey, modelName, username: context.clientContext.user.sub });
    await newApiKey.save();
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
};