const orderModel = require(__path_schemas + 'order');

module.exports = {

  getItem: async (orderUuid) => {
    return await orderModel.findOne({
      order_uuid: orderUuid
    });
  },

  saveItem: async (params, options = null) => {
    let itemInfo = await module.exports.getItem(params.order_uuid)

    if (itemInfo) {
      if (itemInfo.status === 'confirmed') {
        let item = {}
        item.modified = Date.now();
        item.status = 'delivered';
        return orderModel.updateOne({ _id: itemInfo._id }, params);
      }
      return true;
    }
    return false
  }
}
