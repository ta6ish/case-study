const { ApiError } = require('../../../lib/http');

describe('Test ApiError', () => {
    it('Provides response with default parameters', async () => {
        const message = 'some error';
        const errorCode = 1;
        const error = new ApiError(message, errorCode);
        const errorResponse = error.response();
        expect(errorResponse.code).toBe(errorCode);
        expect(errorResponse.msg).toBe(message);
        expect(error.httpStatusCode).toBe(500);
    });
    it('Provides response with provided parameters', async () => {
        const message = 'some error';
        const errorCode = 1;
        const error = new ApiError(message, errorCode, 400);
        const errorResponse = error.response();
        expect(errorResponse.code).toBe(errorCode);
        expect(errorResponse.msg).toBe(message);
        expect(error.httpStatusCode).toBe(400);
    });
});
