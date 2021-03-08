const { apiResponse } = require('../../../lib/http');

describe('Test apiResponse', () => {
    it('Provides response with data parameter', async () => {
        const data = { result: true };
        const response = apiResponse(data);
        expect(response.code).toBe(0);
        expect(response.msg).toBe('success');
        expect(response).toHaveProperty('result');
    });
    it('Provides response with all parameters', async () => {
        const data = { result: true };
        const code = 2;
        const message = 'some message';
        const response = apiResponse(data, code, message);
        expect(response.code).toBe(code);
        expect(response.msg).toBe(message);
        expect(response).toHaveProperty('result');
    });
});
