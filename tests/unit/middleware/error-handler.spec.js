const { getConfig } = require('../../../config');
const { logger } = require('../../../lib/helpers');
const { ApiError } = require('../../../lib/http');
const { errorHandler } = require('../../../lib/middleware');
jest.mock('../../../config');

describe('Test errorHandler', () => {
    it('Handles ApiError', () => {
        const message = 'api error';
        const code = 1; 
        const httpStatusCode = 400
        const error = new ApiError(message, code,  httpStatusCode);
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }
        errorHandler(error, {}, response);
        expect(response.status).toHaveBeenCalledWith(httpStatusCode);
        expect(response.json).toHaveBeenCalledWith(error.response());
    });

    it('Handles Unknown error', () => {
        const message = 'some error';
        const httpStatusCode = 500
        const error = new Error(message);
        const consoleError = jest.spyOn(logger, 'error');
        consoleError.mockImplementation(() =>  jest.fn());
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }
        errorHandler(error, {}, response);
        expect(response.status).toHaveBeenCalledWith(httpStatusCode);
        expect(response.json).toHaveBeenCalledWith({code: 2, msg: message});
        expect(consoleError).toHaveBeenCalledTimes(1);
    });

    it('Prevents revealing errors in production', () => {
        getConfig.mockReturnValue('production');
        const message = 'fatal error';
        const httpStatusCode = 500
        const error = new Error(message);
        const consoleError = jest.spyOn(logger, 'error');
        consoleError.mockImplementation(() =>  jest.fn());
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }
        errorHandler(error, {}, response);
        expect(response.status).toHaveBeenCalledWith(httpStatusCode);
        expect(response.json).toHaveBeenCalledWith({code: 2, msg: 'something went wrong'});
    });
});
