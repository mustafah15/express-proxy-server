'use strict';

const request = require('request');

const proxyServer = baseUrl => 
    async(req, res) => {
        const options = {
            method: req.method,
            uri: `${baseUrl}${req.url}`,
            form: req.body,
        };
        request(options).pipe(res);
    };

module.exports = proxyServer;
