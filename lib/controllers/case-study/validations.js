'use strict';

const joi = require('joi');

const dateFormatRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
const startDateLabel = 'startDate';
const endDateLabel = 'endDate';
const postCaseStudySchema = joi
    .object({
        startDate: joi
            .string()
            .required()
            .ruleset.regex(dateFormatRegex)
            .rule({
                message: `"${startDateLabel}" must be passed in YYYY-MM-DD format`,
            }),
        endDate: joi
            .string()
            .required()
            .ruleset.regex(dateFormatRegex)
            .rule({
                message: `"${endDateLabel}" must be passed in YYYY-MM-DD format`,
            }),
        minCount: joi.number().required().greater(-0),
        maxCount: joi
            .number()
            .required()
            .min(joi.ref('minCount'))
    })
    .custom((value, helpers) => {
        const { startDate, endDate } = value;
        const startDateParsed = new Date(Date.parse(startDate));
        const endDateParsed = new Date(Date.parse(endDate));

        if (startDateParsed.getTime() > endDateParsed.getTime()) {
            return helpers.message(
                `"${endDateLabel}" must be greater than or equal to ref:${startDateLabel}`
            );
        }
        return value;
    });

module.exports = {
    postCaseStudySchema,
};
