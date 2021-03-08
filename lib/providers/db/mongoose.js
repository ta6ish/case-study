const mongoose = require('mongoose');
const { getConfig } = require('../../../config');

class MongoProvider {
    static init() {
        return mongoose.connect(getConfig('mongoConnectionURI'), {
            useNewUrlParser: true,
            dbName: getConfig('dbName'),
            useUnifiedTopology: true,
        });
    }
}

module.exports = {
    MongoProvider,
};
