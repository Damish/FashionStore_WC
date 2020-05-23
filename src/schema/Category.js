'use strict';

const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    cat_id: String,
    cat_name: String,

});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
