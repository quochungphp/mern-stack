const productModel = require('../schemas/product');

module.exports = {

  getItemList:  (params, options = null) => {
    return productModel.find({}).sort({ '_id': -1 });
  },

  getItem: (id, options = null) => {
    return productModel.findById(id);
  }
}
