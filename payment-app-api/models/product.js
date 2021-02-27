const productModel = require(__path_schemas + 'product');

module.exports = {

  getItemList:  (params, options = null) => {
    return productModel.find({});
  },

  getItem: (id, options = null) => {
    return productModel.findById(id);
  }
}
