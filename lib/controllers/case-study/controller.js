'use strict';

const { apiResponse } = require('../../http');
const { RecordService } = require('../../services');

const postCaseStudy = async (request, response) => {
    const {
        startDate: startDateString,
        endDate: endDateString,
        minCount,
        maxCount,
    } = request.body;
    const startDate = new Date(Date.parse(startDateString));
    const endDate = new Date(Date.parse(endDateString));
    const records = await RecordService.filter({
        startDate,
        endDate,
        minCount,
        maxCount,
    });
    response.status(200).json(apiResponse({ records }));
};

module.exports = {
    postCaseStudy,
};
