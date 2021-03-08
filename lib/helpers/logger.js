const winston = require('winston');
const { format } = require('logform');

const { getConfig } = require('../../config');

const options = {
    format: format.combine(
        format.errors({ stack: true }),
        format.metadata(),
        format.json()
    ),
    transports: [
        new winston.transports.Console({
            level: getConfig('env') === 'production' ? 'info' : 'debug',
        }),
    ],
};

const logger = winston.createLogger(options);

module.exports = {
    logger,
};
