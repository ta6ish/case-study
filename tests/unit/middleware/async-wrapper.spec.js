const { asyncWrapper } = require('../../../lib/middleware');

describe('Test Async Wrapper', () => {
    it('Middleware responds when pramaters provided', async () => {
        const responseData = {
            success: true,
        };
        const middlewareImplementation = jest
            .fn()
            .mockImplementation(async (_, response) => {
                return response;
            });

        const wrappedMiddleware = asyncWrapper(middlewareImplementation);
        const response = await wrappedMiddleware({}, responseData, () => {});
        expect(response).toBe(responseData);
        expect(middlewareImplementation).toHaveBeenCalledTimes(1);
    });

    it('Invokes next Mddleware with Error', async () => {
        const thrownError = new Error('Middleware failed');
        const middlewareImplementation = jest
            .fn()
            .mockImplementation(async () => {
                throw thrownError;
            });
        const nextMiddleware = jest.fn().mockImplementation((error) => {
            return false;
        });
        const wrappedMiddleware = asyncWrapper(middlewareImplementation);
        await wrappedMiddleware({}, {}, nextMiddleware);
        expect(nextMiddleware).toHaveBeenCalledTimes(1);
        expect(nextMiddleware).toHaveBeenCalledWith(thrownError);
    });
});
