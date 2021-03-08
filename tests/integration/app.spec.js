const supertest = require('supertest');
const { app } = require('../../app');

const baseUrl = '/api/unknown';

describe(`Test app and middleware`, () => {
    it('should get 404', async (done) => {
        const response = await supertest(app).get(baseUrl).expect(404);
        expect(response.body.msg).toEqual('not found');
        done();
    });
});
