const test = require("tape");
const Randomizer = require("../");

const testSecret = "myTotalySecretKey";
const testData = "bacon";

test("Initialization...", (t) => {
  t.plan(1);
  const Randomizr = new Randomizer(testSecret);
  checkKey = Randomizr.showKey();
  t.equal(checkKey, testSecret, "Key Mention can be Used");
});

test("Checking Timestamps...", (t) => {
  t.plan(1);
  const Randomizr = new Randomizer(testSecret);
  var currentTs = new Date().toUTCString();
  var innerTs = Randomizr.getTs();
  t.equal(currentTs, innerTs, "TimeStamp Matched");
});
