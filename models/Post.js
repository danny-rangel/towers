// Mongoose Model for Post
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Post Schema
const postSchema = new Schema({
    type: { type: String, default: "post" },
    durationInMillis: Number,
    songId: String,
    username: String,
    caption: String,
    songName: String,
    songURL: String,
    previewURL: String,
    artistName: String,
    albumArt: String,
    likes: { type: Number, default: 0 },
    date: Date
});

mongoose.model('posts', postSchema);