const crypto = require('crypto');
require('dotenv').config();
const algorithm = process.env.ENCRYPTION_ALGO;
const ENCRYPTION_KEY = Buffer.from(process.env.HASH_KEY, 'base64');
const IV_LENGTH = 16;

const simpleEncrypt = (text) => {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}


const simpleDecrypt = (text) => {
  try {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (error) {
    return false
  }
}
module.exports = {
  simpleDecrypt,
  simpleEncrypt
};
