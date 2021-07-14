const test = require("tape");
const { Randomizer, Validator } = require("..");
const Cryptr = require("cryptr");

const testSecret = "myTotalySecretKey";

test("Initialization ...", async (t) => {
  t.plan(1);
  const Randomizr = new Randomizer(testSecret);
  checkKey = Randomizr.showKey();
  t.equal(checkKey, testSecret, "Key Mention can be Used");
});

test("Checking Timestamps ...", async (t) => {
  t.plan(1);
  const Randomizr = new Randomizer(testSecret);
  var currentTs = new Date().toUTCString();
  var innerTs = Randomizr.getTs();
  t.equal(currentTs, innerTs, "TimeStamp Matched");
});

test("Working ..........", async (t) => {
  t.plan(1);
  const Randomizr = new Randomizer(testSecret);
  var currentTs = new Date().toUTCString();
  var innerTs = Randomizr.getTs();
  var hearders = await Randomizr.sendHeader();
  t.equal(true, typeof hearders == "string", "Headers Successfully Created");
});

test("Verification.......", async (t) => {
  t.plan(1);
  const Randomizr = new Randomizer(testSecret);
  var hearders = await Randomizr.sendHeader();
  const cryptr = new Cryptr(testSecret);
  const encryptedTs = cryptr.encrypt(Randomizr.getTs());
  const Validatr = new Validator(testSecret, encryptedTs);
  const verifyState = Validatr.verifyState(hearders);
  t.equal(verifyState, true, "Verified");
});
