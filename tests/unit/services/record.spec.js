const { RecordModel } = require('../../../lib/models');
const { RecordService } = require('../../../lib/services/record');

describe('Test RecordService', () => {
    it('filter results by aggregation', async () => {
        const connect = jest.spyOn(RecordModel, 'aggregate');
        connect.mockResolvedValue(true);
        const filterOptions = {
            startDate: new Date(),
            endDate: new Date(),
            minCount: 1,
            maxCount: 80,
        };
        const result = await RecordService.filter(filterOptions);
        expect(result).toBe(true);
    });
});
