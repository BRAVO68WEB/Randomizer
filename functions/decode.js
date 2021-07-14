const createDigest = require("./createDigest");
const crypto = require("crypto");

function decode(value, secretKey) {
  let [encodedData, sourceDigest] = value.split("!");
  if (!encodedData || !sourceDigest) throw new Error("invalid value(s)");
  const json = Buffer.from(encodedData, "base64").toString("utf8");
  const decodedData = JSON.parse(json);
  const checkDigest = createDigest(encodedData, secretKey);
  const digestsEqual = crypto.timingSafeEqual(
    Buffer.from(sourceDigest, "base64"),
    checkDigest
  );
  if (!digestsEqual) throw new Error("invalid value(s)");
  return decodedData;
}

module.exports = decode;
