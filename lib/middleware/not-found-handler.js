'use strict';

const { apiResponse } = require('../http');

/**
 * Responds with not found
 *
 * @param {Object} request express request
 * @param {Object} response express response
 * @param {Function} next next express middleware
 * @returns {void}
 */
const notFoundHandler = (request, response, next) => {
    response.status(404).json(apiResponse({}, 1, 'not found'));
};

module.exports = {
    notFoundHandler,
};
