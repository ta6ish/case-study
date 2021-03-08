require('dotenv').config();

const appConfig = {
    env: process.env.NODE_ENV,
    mongoConnectionURI: process.env.MONGO_CONNECTION_URI,
    port: process.env.PORT || 3000,
    dbName: process.env.DB_NAME,
};

/**
 * Gets app config
 * 
 * @param {String} config config name
 * @returns {Mixed}
 */
const getConfig = (config) => {
    return appConfig[config];
}

module.exports = {
    getConfig,
};
