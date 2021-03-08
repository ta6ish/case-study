const mongoose = require('mongoose');
const { MongoProvider } = require('../../../../lib/providers/db/mongoose');

describe('Test MongoProvider', () => {
    it('Connects with mongo', async () => {
        const connect = jest.spyOn(mongoose, 'connect');
        connect.mockResolvedValue(true);
        const result = await MongoProvider.init();
        expect(result).toBe(true);
    });
});
