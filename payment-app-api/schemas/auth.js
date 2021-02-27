const mongoose = require('mongoose');
const collectionConfig = require(__path_configs + 'collectionSchemas');

var schema = new mongoose.Schema({
    email: String,
    name: String,
    user_id: String,
    login_num: Number,
    token: String,
    user_token: String,
    login_at: Date,
    created: Date,
    modified: Date

});

module.exports = mongoose.model(collectionConfig.collection_auth, schema, collectionConfig.collection_auth);
