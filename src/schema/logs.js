'use strict';

const mongoose = require('mongoose');

const logDataSchema = new mongoose.Schema({
    date: String,
    time: String,
    message: String,
    created_by: String,
    user_type :String
});

const Log = mongoose.model('log', logDataSchema);

module.exports = Log;
