var express = require('express');
var router = express.Router();

router.use('/payment', require('./payment'));


module.exports = router;
