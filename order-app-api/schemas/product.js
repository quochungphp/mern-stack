const mongoose = require('mongoose');
const collectionConfig = require('../configs/collectionSchemas');

var schema = new mongoose.Schema({
    name: String,
    price: String,
    image: Object
});

module.exports = mongoose.model(collectionConfig.collection_product, schema, collectionConfig.collection_product);
