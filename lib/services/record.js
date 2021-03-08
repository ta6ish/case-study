const { RecordModel } = require('../models');

class RecordService {
    /**
     * Filter records
     *
     * @param {Object} filter - Filter options
     * @param {Date} filter.startDate - Date for filtering createdAt from
     * @param {String} filter.endDate - Date for filtering createdAt to
     * @param {Number} filter.minCount - Min value to filter sum of counts
     * @param {Number} filter.maxCount - Max value to filter sum of counts
     *
     */

    static filter({ startDate, endDate, minCount, maxCount }) {
        return RecordModel.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate,
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    key: 1,
                    createdAt: 1,
                    totalCount: {
                        $sum: '$counts',
                    },
                },
            },
            {
                $match: {
                    totalCount: {
                        $gte: minCount,
                        $lte: maxCount,
                    },
                },
            },
        ]);
    }
}

module.exports = {
    RecordService,
};
