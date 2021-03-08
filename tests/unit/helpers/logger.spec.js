const { getConfig } = require('../../../config');
jest.mock('../../../config');

describe('Test Logger', () => {
    it('Updates log level in production', async () => {
        getConfig.mockReturnValue('production');
        const { logger } = require('../../../lib/helpers');
        expect(logger.transports[0].level).toBe('info');
    });
});
