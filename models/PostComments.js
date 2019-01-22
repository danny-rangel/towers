const mongoose = require('mongoose');
const { Schema } = mongoose;

const postCommentsSchema = new Schema({
    postId: String,
    content: String,
    commenterId: String,
    username: String,
    name: String,
    profileImage: String,
    date: Date
});

mongoose.model('postComments', postCommentsSchema);