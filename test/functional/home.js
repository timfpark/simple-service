const assert = require('assert'),
    app = require('../../server'),
    HttpStatus = require('http-status-codes'),
    request = require('request');

const endpoint = `http://localhost:${process.env.PORT}/`;

describe('ops endpoint', () => {
    it('can report health', done => {
        request.get(endpoint, (err, resp) => {
            assert(!err);
            assert.equal(resp.statusCode, HttpStatus.OK);
            assert(resp.body.indexOf('The secret passphrase is') !== -1);
            done();
        });
    });
});
