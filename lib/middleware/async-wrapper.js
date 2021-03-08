'use strict';

/**
 * Wrapper for executing middleware which return promise
 * handles error thrown by promises
 * 
 * @param {*} asyncRouteHandler 
 * @returns {Function} express middleware
 */
const asyncWrapper = (asyncRouteHandler) => {
    return (request, response, next) => {
        return asyncRouteHandler(request, response, next).catch(next);
    };
};

module.exports = {
    asyncWrapper,
};
