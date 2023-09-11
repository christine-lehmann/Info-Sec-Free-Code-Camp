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
// use helmet.xssFilter to sanitize user input
app.use(helmet.xssFilter());

//STEP 5: This middleware sets the X-Content-Type-Options header to nosniff, instructing the browser 
//to not bypass the provided Content-Type
//Use the helmet.noSniff() method
app.use(helmet.noSniff());

// STEP 6: This will prevent IE users from executing downloads in the trusted site’s context.
// Use the helmet.ieNoOpen() method 
app.use(helmet.ieNoOpen());

// STEP 7: 
// Sets "Strict-Transport-Security: max-age=123456; includeSubDomains"
// By setting the header Strict-Transport-Security, you tell the browsers to use HTTPS for the future requests in a specified amount of time.
var ninetyDaysInSeconds = 90*24*60*60;
// var ninetyDaysInSeconds = timeInSeconds;
app.use(
  helmet.hsts({
    maxAge: ninetyDaysInSeconds,
    force: true
  })
);

// STEP 8: Disable DNS Prefetching with helmet.dnsPrefetchControl()
// Use the helmet.dnsPrefetchControl()
app.use(helmet.dnsPrefetchControl());

// STEP 9: Disable Client-Side Caching with helmet.noCache()
// Use the helmet.noCache() method 
app.use(helmet.noCache());

// STEP 10: Set a Content Security Policy with helmet.contentSecurityPolicy()
// 
// Sets all of the defaults, but overrides `script-src`
// and disables the default `style-src`.
app.use(
  helmet.contentSecurityPolicy({
      directives: {
        "defaultSrc":["'self'"],
        "scriptSrc": ["'self'", 'trusted-cdn.com'],

      },
    }),
);
































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
