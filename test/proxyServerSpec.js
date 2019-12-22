'use strict';

const express = require('express');
const nock = require('nock');
const{ expect } = require('chai');
const app = express();
const proxyServer = require('../index');
const request = require('supertest');
const bodyParser = require('body-parser');

describe('proxyServer', () => {
    const state = 'up and running';
    const fakeServiceBaseurl = 'http://fakeservice.com';
    app.use(bodyParser.json());
    app.use('/', proxyServer(fakeServiceBaseurl));
    const userSample = {
        id: '479e0c9b-0f10-4fa6-b581-d33604c50692',
        username: 'dummy-user',
        email: 'dummy-user@test.com',
        password: 'dummy-password',
    };

    beforeEach(() => {
        nock(fakeServiceBaseurl)
            .get('/healthCheck')
            .reply(200, {
                ok: true,
                state,
            });

        nock(fakeServiceBaseurl)
            .post('/users', userSample)
            .reply(200, {
                users: [userSample],
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

    it('should proxy a post request', () => request(app)
        .post('/users')
        .send(userSample)
        .expect(200)
        .then(response => {
            expect(response.body.users).to.be.an('array')
                .and.is.deep.equal([userSample]);
        }),
    );
});
