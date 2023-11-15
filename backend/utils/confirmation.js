const crypto = require("crypto");

// const secretKey = crypto.randomBytes(32).toString('hex'); // Generates a 64-character string
// console.log(secretKey);

// const iv = crypto.randomBytes(16).toString('hex'); // Generates a 32-character string
// console.log(iv);

const algorithm = process.env.CRYPTO_ALGORITHM;
const secretKey = process.env.CONFIRMATION_SECRET_KEY;
const iv = process.env.INITIALIZATION_VECTOR;

const encrypt = (token) => {
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(secretKey, 'hex'),
    Buffer.from(iv, 'hex')
  );

  const encrypted = Buffer.concat([cipher.update(token), cipher.final()]);

  return encrypted.toString('hex');
};

const decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey, 'hex'),
    Buffer.from(iv, 'hex')
  );

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(hash, 'hex')),
    decipher.final(),
  ]);

  return decrypted.toString();
};

module.exports = {
  encrypt,
  decrypt,
};