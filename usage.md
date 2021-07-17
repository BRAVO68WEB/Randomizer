---
description: How to use this package ??
---

# Usage

To use this package, you need to integrate it in both ends \(i.e. Frontend and Backend\).

## Frontend

At Frontend, integrate as follows :-

{% tabs %}
{% tab title="Initialization" %}
```javascript
const { Randomizer } = require("encrypted-randomizer");
const privateKey = process.env.YOUR_AUTH_KEY;
// set YOUR_AUTH_KEY as an enviornment variable.

const setEncryption = new Randomizer(privateKey);
```
{% endtab %}

{% tab title="Usage" %}
```javascript
var axios = require('axios');
var qs = require('qs');
var data = qs.stringify({
  'date': 'value' 
});
var config = {
  method: 'get',
  url: 'http://your.api.host/endpoint',
  headers: { 
    'Authorization': ..., 
    'Content-Type': ...,
    'TS': setEncryption.getTs(); // Sending Timestamp of Request
    'ERHS': await setEncryption.sendHeader(); // Sending the Encrypted Token Headers
  },
  data : data
};

async axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```
{% endtab %}
{% endtabs %}

## Backend

At Backend,  integrate as follows :-

{% tabs %}
{% tab title="Initialization" %}
```javascript
const { Validator } = require("encrypted-randomizer");
const privateKey = process.env.YOUR_AUTH_KEY;
// set same YOUR_AUTH_KEY as an enviornment variable as used above.

```
{% endtab %}

{% tab title="Usage" %}
```javascript
const express = require('express')
const app = express()
const port = 3000

app.get('/endpoint', (req, res) => {
  const decryptChecker = new Validator(privateKey , req.headers.TS);
  const verificationState = decryptChecker.verifyState(req.headers.ERHS)
  if(verificationState == "true")
    res.send("It Works !!!")
  else
    res.send("Auth Key didn't matched. Request Denied !!!")
})

app.listen(port, () => {
  console.log(`Backend Running !!`)
})
```
{% endtab %}
{% endtabs %}

