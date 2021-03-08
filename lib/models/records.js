const mongoose = require('mongoose');

const recordsSchema = new mongoose.Schema(
    {
        key: String,
        value: String,
        counts: [Number],
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
        skipVersioning: true,
    }
);

const RecordModel = mongoose.model('Record', recordsSchema);

module.exports = {
    RecordModel,
};
