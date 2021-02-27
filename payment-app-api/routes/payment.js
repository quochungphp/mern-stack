var express = require('express');
var router = express.Router();
const ValidateLogin = require(__path_validates + 'order');
const authorizer = require('../services/basicAuth');
const notify = require(__path_configs + 'notify');
// Middleware checking header token before access to server
// Reject error token
router.use(authorizer.verifyToken)

// Payment order
router.post('/transaction', async (req, res, next) => {
  //console.log(req.body)
  try {
    ValidateLogin.validator(req);
    let errors = req.validationErrors();
    if (errors) {
      __utils.responses(res, 400, 400, '', errors);
    } else {
      // Redis queue pub/sub
      const redisPubSub = require('../services/redisPubSub');
      const queue = new redisPubSub('registerQueue', 'processQueue');
      // Register queue
      const states = ["confirmed", "declined"];
      const random = Math.floor(Math.random() * states.length);
      let status = states[random];
      try {
        queue.registerPubSub(req.body)
          .then((job) => res.json({
            done: true,
            jobId: job.id,
            status: status,
            message: `Your order will be ready in a while`
          }))
          .catch((job) => {
            console.log(job)
          });
      } catch (error) {
        console.log("error", error)
      }

    }
  } catch (error) {
    console.log(error)
    __utils.responses(res, 500, 500, [], '')
  }
});

module.exports = router;
