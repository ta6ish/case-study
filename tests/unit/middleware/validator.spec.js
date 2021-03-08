const { ApiError } = require('../../../lib/http');
const { validator } = require('../../../lib/middleware/validator');
jest.mock('../../../lib/http');

describe('Test validator', () => {
    beforeEach(() => {
        ApiError.mockReset();
    });
    it('Validate request and respond with error', () => {
        const schema = {
            validate: jest.fn().mockReturnValue({ error: new Error('some') }),
        };
        const middleware = validator(schema, 'body');
        const request = {
            body: 'body',
        };
        const next = jest.fn();
        middleware(request, {}, next);
        expect(schema.validate).toHaveBeenCalledWith(request.body);
        expect(next).toHaveBeenCalledTimes(1);
        expect(ApiError).toHaveBeenCalledTimes(1);
    });

    it('Validate request and executes next middleware', () => {
        const schema = {
            validate: jest.fn().mockReturnValue({}),
        };
        const middleware = validator(schema, 'body');
        const request = {
            body: 'body',
        };
        const next = jest.fn();
        middleware(request, {}, next);
        expect(schema.validate).toHaveBeenCalledWith(request.body);
        expect(next).toHaveBeenCalledTimes(1);
        expect(ApiError).toHaveBeenCalledTimes(0);
    });
});
