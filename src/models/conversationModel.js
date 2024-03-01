const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    username: String,
    conversation: [
        {
            role: String,
            content: String,
        }
    ],
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;