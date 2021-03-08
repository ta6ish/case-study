const { apiResponse } = require('../../../lib/http');
const { notFoundHandler } = require('../../../lib/middleware');

jest.mock('../../../lib/http');

describe('Test notFoundHandler', () => {
    it('Handles not found response', () => {
        const mockResponse = { result: 404 };
        apiResponse.mockImplementation(() => mockResponse);
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        notFoundHandler({}, response);
        expect(response.status).toHaveBeenCalledWith(404);
        expect(response.json).toHaveBeenCalledWith(mockResponse);
    });
});
