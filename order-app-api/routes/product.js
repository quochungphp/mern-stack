var express = require('express');
var router = express.Router();
const productModel = require('../models/product');

// Product router gets product list
router.get('/product-list', async (req, res, next) => {
  try {
    const data = await productModel.getItemList(req);
    __utils.responses(res, 200, 200, data, '')

  } catch (error) {
    __utils.responses(res, 500, 500, [], '')
  }
});

module.exports = router;
