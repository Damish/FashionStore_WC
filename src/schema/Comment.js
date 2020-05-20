'use strict';

const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    userId: String,
    productId: String,
    commentBody: String,
    rating: Number,
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;