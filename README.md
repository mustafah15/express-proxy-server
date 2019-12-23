# express proxy server

[![NPM version](https://badge.fury.io/js/express-proxy-server.svg)](http://badge.fury.io/js/express-proxy-server)

Easy way to build a proxy middleware for express apps

## Install

```bash
$ npm install express-proxy-server --save
```


## Example:
As simple as that,
proxy URLS starting with '/proxy' to the your api host 'www.yourapi.com':

```js
var proxy = require('express-proxy-server');
var app = require('express')();

app.use('/proxy', proxy('www.yourapi.com'));
```

This will proxy all the requests to 'www.yourapi.com' with all params and body args

### License
The MIT License (MIT). Please see [License](https://github.com/mustafah15/express-proxy-server/blob/master/LICENCE) File for more information.
