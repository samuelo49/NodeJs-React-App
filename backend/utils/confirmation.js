// backend/utils/confirmation.js
const fs = require('fs');
const crypto = require("crypto"); // use it to decrypt and encrypt a random string

function generateSecretKey() {
    return crypto.randomBytes(24).toString('hex');
}

function generateInitializationVector() {
    return crypto.randomBytes(16).toString('hex');
}

if (!process.env.CONFIRMATION_SECRET_KEY) {
    const secretKey = generateSecretKey();
    fs.appendFileSync('.env', `\nCONFIRMATION_SECRET_KEY=${secretKey}`);
    process.env.CONFIRMATION_SECRET_KEY = secretKey;
}

if (!process.env.INITIALIZATION_VECTOR) {
    const iv = generateInitializationVector();
    fs.appendFileSync('.env', `\nINITIALIZATION_VECTOR=${iv}`);
    process.env.INITIALIZATION_VECTOR = iv;
}


const algorithm = process.env.CRYPTO_ALGORITHM;
const secretKey = process.env.CONFIRMATION_SECRET_KEY;
const iv = process.env.INITIALIZATION_VECTOR;

const encrypt = (token) => {
  const cipher = crypto.createCipheriv(
    algorithm,
    secretKey,
    Buffer.from(iv, "hex")
  );

  const encrypted = Buffer.concat([cipher.update(token), cipher.final()]);

  return encrypted.toString("hex");
};

const decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(iv, "hex")
  );

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(hash, "hex")),
    decipher.final(),
  ]);

  return decrypted.toString();
};

module.exports = {
  encrypt,
  decrypt,
  generateSecretKey,
  generateInitializationVector,
};
