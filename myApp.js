const express = require('express');
// STEP 1: Install and Require Helmet
const helmet = require('helmet');
const app = express();
//STEP 2: Hide Potentially Dangerous Information Using helmet.hidePoweredBy()
app.use(helmet.hidePoweredBy());
// STEP 3: Use helmet.frameguard() passing with the configuration object {action: 'deny'}
// Clickjacking is a technique of tricking a user into interacting with a page different from what the user thinks it is. 
// This can be obtained by executing your page in a malicious context, by means of iframing. 
// In that context, a hacker can put a hidden layer over your page. 
// You can also check if your app is safe from clickjacking to this site https://clickjacker.io/
app.use(helmet.frameguard({action: 'deny'}));

// STEP 4: Mitigate the Risk of Cross Site Scripting (XSS) Attacks with helmet.xssFilter()
app.use(helmet.xssFilter());










































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  // STEP 1: edit a description in nmp start
  console.log(`Arcane Programmer Info Security App Started on Port ${port}`);
});
