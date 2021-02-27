const orderModel = require('../schemas/order');

module.exports = {

  getItemList:  () => {
    return orderModel.find({});
  },

  getItem: (id) => {
    return orderModel.findById(id);
  },

  saveItem: (params, options = null) => {
    if (options.action == "add") {
      params.created =  Date.now()
      return new orderModel(params).save();
    }

    if (options.action == "update") {
      params.modified = Date.now()
      return  orderModel.updateOne({ _id: params.id }, params);
    }
  }
}
