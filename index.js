'use strict';

const mongoose = require('mongoose');
const { app } = require('./app');
const { getConfig } = require('./config');
const { logger } = require('./lib/helpers');
const { MongoProvider } = require('./lib/providers/db/mongoose');

MongoProvider.init()
    .then(() => {
        logger.debug('DB_CONNECTED');
    })
    .catch(logger.error);

const server = app.listen(getConfig('port'), () => {
    const { address, port } = server.address();
    logger.debug(`Running at ${address}:${port}`);
});

process.on('unhandledRejection', (reason) => {
    logger.error(reason);
});

process.on('uncaughtException', (error) => {
    logger.error(error);
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        process.exit(0);
    });
});

module.exports = {
    server,
};
