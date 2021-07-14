const Cryptr = require("cryptr");
const encode = require("./functions/encode");
const decode = require("./functions/decode");

var encypSep = ["#", "@", "$", "^", "&", "*", "?"];

function Randomizer(secretKey) {
  const ts = new Date().toUTCString();

  if (!secretKey || typeof secretKey !== "string") {
    throw new Error("Error: secret must be a non-0-length string");
  }

  const cryptr = new Cryptr(secretKey);
  const encryptedTs = cryptr.encrypt(ts);

  this.showKey = function showKey() {
    return secretKey;
  };

  this.getTs = function getTs() {
    return ts;
  };

  this.encTs = function encTs() {
    return encryptedTs;
  };

  this.sendHeader = function sendHeader() {
    let setEncypSep = encypSep[Math.floor(Math.random() * encypSep.length)];
    var encryptHeader =
      encryptedTs + setEncypSep + Buffer.from(encryptedTs).toString("base64");

    const finalHeader = encode(encryptHeader, secretKey);
    return finalHeader;
  };
}

function Validator(secretKey, encryptedTs) {
  const cryptr = new Cryptr(secretKey);
  const ts = cryptr.decrypt(encryptedTs);

  this.verifyState = function verify(headers) {
    const decodedHeaders = decode(headers, secretKey);
    const encodedDecryptedTs = [
      decodedHeaders.slice(0, 250),
      decodedHeaders.slice(251),
    ];
    const decodeDecryptedTs = Buffer.from(
      encodedDecryptedTs[1],
      "base64"
    ).toString("utf8");
    if (decodeDecryptedTs != encodedDecryptedTs[0]) {
      return false;
    } else if (cryptr.decrypt(encodedDecryptedTs[0]) != ts) {
      return false;
    } else return true;
  };

  this.showKey = function showKey() {
    return secretKey;
  };

  this.getTs = function getTs() {
    return ts;
  };
}

module.exports = { Randomizer, Validator };
