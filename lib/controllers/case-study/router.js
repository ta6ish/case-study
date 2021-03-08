'use strict';

const express = require('express');

const { postCaseStudy } = require('./controller');
const { postCaseStudySchema } = require('./validations');
const { asyncWrapper, validator } = require('../../middleware');
const postCaseStudyRouter = express.Router();

postCaseStudyRouter.post('/', [
    validator(postCaseStudySchema, 'body'),
    asyncWrapper(postCaseStudy),
]);

module.exports = {
    postCaseStudyRouter,
};
