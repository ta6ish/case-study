const {
    postCaseStudy,
} = require('../../../../lib/controllers/case-study/controller');
const { apiResponse } = require('../../../../lib/http');
const { RecordService } = require('../../../../lib/services');
jest.mock('../../../../lib/http');

describe('Test Case Study Controller', () => {
    it('Process post request and return records', async () => {
        const filterResponse = [{ id: 1 }];
        const controllerResponse = { success: true };
        const filter = jest.spyOn(RecordService, 'filter');
        filter.mockResolvedValue(filterResponse);
        apiResponse.mockImplementation(() => controllerResponse);
        const dateParse = jest.spyOn(global.Date, 'parse');
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const request = {
            body: {
                startDate: '2015-05-10',
                endDate: '2015-05-18',
                minCount: 1,
                maxCount: 80,
            },
        };
        await postCaseStudy(request, response);
        expect(filter).toHaveBeenCalledTimes(1);
        expect(response.json).toHaveBeenCalledWith(controllerResponse);
        expect(dateParse).toHaveBeenCalledTimes(2);
    });
});
