require('dotenv').config();
const axios = require('axios')

const paymentTransactionOrder = async(req, res) => {
  let configHeader = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: req.headers.authorization
    }
  }
  return await axios.post(process.env.HTTP_PAYMENT_TRANSACTION, {
    ...req.body
  },{
    ...configHeader
  })
  .then(res => {
    return res.data
  })
  .catch(error => {
    console.error(error.response)
    return false
  })
}
module.exports = paymentTransactionOrder
