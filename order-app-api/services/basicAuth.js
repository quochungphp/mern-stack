const cryperto = require('../services/crpyto')
function verifyToken(req, res, next) {
  let tokenHeader = req.headers['x-access-token'] || req.headers['authorization'];
  if (typeof tokenHeader == "undefined") {
    return res.status(401).send("Unauthoried");
  } else {
    tokenHeader = tokenHeader.split(" ");
    let inforDecrypt =  cryperto.simpleDecrypt(tokenHeader[1].trim());
    inforDecrypt = JSON.parse(inforDecrypt)

    if (inforDecrypt) {
      next()
    } else {
      return res.status(401).send("Unauthoried");
    }
  }
}

module.exports = {
  verifyToken
}
