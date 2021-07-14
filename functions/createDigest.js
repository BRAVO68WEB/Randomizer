const crypto = require("crypto");
function createDigest(encodedData, secretKey, format) {
  return crypto
    .createHmac("sha1", secretKey)
    .update(encodedData)
    .digest(format);
}

module.exports = createDigest;
