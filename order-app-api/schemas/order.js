const mongoose = require('mongoose');
const collectionConfig = require('../configs/collectionSchemas');

var schema = new mongoose.Schema({
    fullname: String,
    order_uuid: String,
    address: String,
    status: String,
    order: Array,
    total: Number,
    user_id: String,
    created: Date,
    modified: Date
});

module.exports = mongoose.model(collectionConfig.collection_order, schema, collectionConfig.collection_order);
