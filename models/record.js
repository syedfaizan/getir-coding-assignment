const mongoose = require('mongoose');

const recordsSchema = new mongoose.Schema({
    "key": String,
    "createdAt": Date,
    "counts": [
        Number
    ],
    "value": String
})

module.exports = mongoose.model('records', recordsSchema);