const epxress = require('express');
const { postCaseStudyRouter } = require('./lib/controllers/case-study/router');
const appRouter = new epxress.Router();

appRouter.use('/case-study', postCaseStudyRouter);

module.exports = {
    appRouter,
};
