const mongoose = require('mongoose');
const { Schema } = mongoose;

const postLikesSchema = new Schema({
    postId: String,
    likerId: String,
    username: String,
    name: String,
    profileImage: String,
    date: Date
});

mongoose.model('postLikes', postLikesSchema);