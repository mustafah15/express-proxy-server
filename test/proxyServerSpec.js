'use strict';

const express = require('express');
const nock = require('nock');
const{ expect } = require('chai');
const app = express();
const proxyServer = require('../index');
const request = require('supertest');

describe('proxyServer', () => {
    const state = 'up and running';

    beforeEach(() => {
        const fakeServiceBaseurl = 'http://fakeservice.com';
        app.use('/', proxyServer(fakeServiceBaseurl));
        
        nock(fakeServiceBaseurl)
            .get('/healthCheck')
            .reply(200, {
                ok: true,
                state,
            });
    });

    it('should proxy a get request', () => 
        request(app)
            .get('/healthCheck')
            .expect(200)
            .then(response => {
                expect(response.body.ok).to.be.true;
                expect(response.body.state).to.be.a('string').and.is.equal(state);
            }),
    );
});
