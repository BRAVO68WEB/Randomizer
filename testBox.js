// console.log(new Date().toUTCString());
const Cryptr = require("cryptr");
const appEncryptKey =
  "jWThgBwk4Awh7QQ82GDaz5QFcnVULu9Nk8bnU8sH6LcnfWfpeNaeYDLNGhSU47Yy";
const cryptr = new Cryptr(appEncryptKey);
currentTs = new Date().toUTCString();
const encryptedString = cryptr.encrypt(currentTs);
const decryptedString = cryptr.decrypt(encryptedString);

console.log(encryptedString);
