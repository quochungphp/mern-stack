const mongoose = require('mongoose');
const collectionConfig = require(__path_configs + 'collectionSchemas');

var schema = new mongoose.Schema({
    fullname: String,
    address: String,
    status: String,
    order: Array,
    user_id: String,
    created: Date,
    modified: Date
});

module.exports = mongoose.model(collectionConfig.collection_order, schema, collectionConfig.collection_order);
