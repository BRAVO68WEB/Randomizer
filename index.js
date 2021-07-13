const Cryptr = require("cryptr");

function Randomizer(secret) {
  const ts = new Date().toUTCString();
  if (!secret || typeof secret !== "string") {
    throw new Error("Cryptr: secret must be a non-0-length string");
  }
  const cryptr = new Cryptr(secret);

  const encryptedTs = cryptr.encrypt(ts);
  console.log(encryptedTs);
  this.showKey = function showKey() {
    return secret;
  };
  this.getTs = function getTs() {
    return ts;
  };
}

module.exports = Randomizer;
