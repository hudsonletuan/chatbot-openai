const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const apiKeySchema = new Schema({
    apiKey: String,
    modelName: String,
    username: String
});

const ApiKey = mongoose.model('ApiKey', apiKeySchema);

module.exports = ApiKey;