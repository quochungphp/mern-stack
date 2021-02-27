var express = require('express');
var router = express.Router();
const orderModel = require('../models/order');
const ValidateLogin = require('../validates/order');
const authorizer = require('../services/basicAuth');
const paymentTransactionOrder = require('../services/paymentTransaction');
const { v4: uuidv4 } = require('uuid');
// Middleware checking header token before access to server
// Reject error token
router.use(authorizer.verifyToken)

// Create order
router.post('/create',  async (req, res, next) => {
  try {

    ValidateLogin.validator(req);
    let errors = req.validationErrors();
    if (errors) {
      __utils.responses(res, 400, 400, '', errors);
    } else {
      // Transaction processes order to payment api
      try {
        let data = [];
        let item = Object.assign(req.body);
        item.order_uuid = uuidv4();
        req.body.order_uuid = item.order_uuid
        // Create a new order
        data = await orderModel.saveItem(item, { "action": "add" });
        // Order app calls to publish to payment api
        let statusInfor = await paymentTransactionOrder(req, res)

        // Re-update order status
        if (statusInfor) {
          let status = statusInfor.status === 'declined' ? 'cancelled' : 'confirmed'
          await orderModel.saveItem({
            id: data._id,
            status: status
          }, { "action": "update" });

          item.status = status;
          item.id = data._id;
          data = item
        }
        __utils.responses(res, 200, 200, data, '')

      } catch (error) {
        __utils.responses(res, 500, 500, [], 'Server was error!')
      }

    }
  } catch (error) {
    console.log(error)
    __utils.responses(res, 500, 500, [], '')
  }

});

// Update status order
router.post('/update', async (req, res, next) => {
  try {
    let item = Object.assign(req.body);
    const data = await orderModel.saveItem(item, { "action": "update" });
    __utils.responses(res, 200, 200, data, '')

  } catch (error) {
    console.log(error)
    __utils.responses(res, 500, 500, [], '')
  }
});

// Get order list
router.get('/get-list', async (req, res, next) => {
  try {
    const data = await orderModel.getItemList();
    __utils.responses(res, 200, 200, data, '')
  } catch (error) {
    console.log(error)
    __utils.responses(res, 500, 500, [], '')
  }
});

// Get order info
router.get('/get-info(/:id)?', async (req, res, next) => {
  const id = req.params.id;
  if (id) {
    try {
      const data = await orderModel.getItem(id);
      __utils.responses(res, 200, 200, data, '')
    } catch (error) {
      console.log(error)
      __utils.responses(res, 500, 500, [], '')
    }
  }
});

module.exports = router;
