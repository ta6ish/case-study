const supertest = require('supertest');
const { app } = require('../../app');
const { logger } = require('../../lib/helpers');
const { RecordService } = require('../../lib/services');

const baseUrl = '/api/case-study';

describe(`Test case study controller`, () => {
    it('Requires startDate', async (done) => {
        const response = await supertest(app)
            .post(baseUrl)
            .send({})
            .expect(400);
        expect(response.body.msg).toEqual('"startDate" is required');
        done();
    });
    it('Validates startDate to be valid', async (done) => {
        const response = await supertest(app)
            .post(baseUrl)
            .send({
                startDate: 'invalid',
            })
            .expect(400);
        expect(response.body.msg).toEqual(
            '"startDate" must be passed in YYYY-MM-DD format'
        );
        done();
    });
    it('Validates endDate to be valid', async (done) => {
        const response = await supertest(app)
            .post(baseUrl)
            .send({
                startDate: '2015-05-12',
                endDate: 'invalid',
            })
            .expect(400);
        expect(response.body.msg).toEqual(
            '"endDate" must be passed in YYYY-MM-DD format'
        );
        done();
    });
    it('Requires minCount', async (done) => {
        const response = await supertest(app)
            .post(baseUrl)
            .send({
                startDate: '2015-05-13',
                endDate: '2015-05-14',
            })
            .expect(400);
        expect(response.body.msg).toEqual('"minCount" is required');
        done();
    });
    it('Validates minCount', async (done) => {
        const response = await supertest(app)
            .post(baseUrl)
            .send({
                startDate: '2015-06-10',
                endDate: '2015-06-10',
                minCount: 'a',
            })
            .expect(400);
        expect(response.body.msg).toEqual('"minCount" must be a number');
        done();
    });
    it('Requires maxCount', async (done) => {
        const response = await supertest(app)
            .post(baseUrl)
            .send({
                startDate: '2015-05-13',
                endDate: '2015-05-14',
                minCount: 1,
            })
            .expect(400);
        expect(response.body.msg).toEqual('"maxCount" is required');
        done();
    });
    it('Validates maxCount', async (done) => {
        const response = await supertest(app)
            .post(baseUrl)
            .send({
                startDate: '2015-01-10',
                endDate: '2015-03-12',
                minCount: 1,
                maxCount: 'a',
            })
            .expect(400);
        expect(response.body.msg).toEqual('"maxCount" must be a number');
        done();
    });
    it('Validates that minCount must be less than or equal to maxCount', async (done) => {
        const response = await supertest(app)
            .post(baseUrl)
            .send({
                startDate: '2015-01-10',
                endDate: '2015-03-10',
                minCount: 5,
                maxCount: 3,
            })
            .expect(400);
        expect(response.body.msg).toEqual(
            '"maxCount" must be greater than or equal to ref:minCount'
        );
        done();
    });
    it('Validates that startDate must be less than or equal to endDate', async (done) => {
        const response = await supertest(app)
            .post(baseUrl)
            .send({
                startDate: '2015-08-10',
                endDate: '2015-03-10',
                minCount: 1,
                maxCount: 3,
            })
            .expect(400);
        expect(response.body.msg).toEqual(
            '"endDate" must be greater than or equal to ref:startDate'
        );
        done();
    });

    it('Handles service error', async (done) => {
        const serviceError = 'service error';
        const error = jest.spyOn(logger, 'error');
        error.mockReturnValue(true);
        const filter = jest.spyOn(RecordService, 'filter');
        filter.mockRejectedValue(new Error(serviceError));
        const response = await supertest(app)
            .post(baseUrl)
            .send({
                startDate: '2015-05-10',
                endDate: '2015-05-18',
                minCount: 1,
                maxCount: 80,
            })
            .expect(500);
        expect(response.body.msg).toEqual(serviceError);
        expect(response.body.code).toBe(2);
        done();
    });

    it('Process request and provides result', async (done) => {
        const filterResponse = [];
        const filter = jest.spyOn(RecordService, 'filter');
        filter.mockResolvedValue(filterResponse);
        const response = await supertest(app)
            .post(baseUrl)
            .send({
                startDate: '2015-05-10',
                endDate: '2015-05-18',
                minCount: 1,
                maxCount: 80,
            })
            .expect(200);
        expect(response.body.msg).toEqual('success');
        expect(response.body.code).toBe(0);
        expect(response.body.records).toStrictEqual(filterResponse);
        done();
    });
});
