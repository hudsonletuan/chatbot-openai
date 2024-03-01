const Conversation = require('../models/conversationModel');

async function updateConversationHistory(username, message) {
    const conversation = await Conversation.findOne({username: username});
    if (conversation) {
        conversation.conversation.push(message);
        await conversation.save();
    } else {
        const newConversation = new Conversation({
            username: username,
            conversation: [message],
        });
        await newConversation.save();
    }
}

async function getConversationHistory(username) {
    const conversation = await Conversation.findOne({username: username});
    if (!conversation) {
        return null;
    }
    // const lastMessage = conversation.conversation[conversation.conversation.length - 1];
    // return lastMessage;
    return conversation ? conversation.conversation : [];
}

module.exports = {
    updateConversationHistory,
    getConversationHistory,
};