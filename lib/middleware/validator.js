'use strict';

const { ApiError } = require('../http');

/**
 * Middleware for validating the request
 *
 * @param {Object} schema joi schema
 * @param {String} requestPath request property name to validate
 * @returns {Function} express middleware
 */
const validator = (schema, requestPath) => {
    return (request, response, next) => {
        const { error } = schema.validate(request[requestPath]);
        if (error) {
            next(new ApiError(error.message, 1, 400));
            return false;
        }
        next();
    };
};

module.exports = {
    validator,
};
