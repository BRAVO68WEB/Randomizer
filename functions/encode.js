const createDigest = require("./createDigest");
const crypto = require("crypto");

function encode(sourceData, secretKey) {
  const json = JSON.stringify(sourceData);
  const encodedData = Buffer.from(json).toString("base64");
  return `${encodedData}!${createDigest(encodedData, secretKey, "base64")}`;
}

module.exports = encode;
