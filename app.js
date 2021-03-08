'use strict';

const express = require('express');
const { appRouter } = require('./router');
const { errorHandler, notFoundHandler } = require('./lib/middleware');

const app = express();
app.use(express.json());
app.use('/api', appRouter);
app.use(errorHandler);
app.use(notFoundHandler);

module.exports = {
    app,
};
