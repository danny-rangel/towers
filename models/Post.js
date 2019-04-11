// Mongoose Model for Post
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Post Schema
const postSchema = new Schema({
    type: { type: String, default: "post" },
    durationInMillis: Number,
    songId: String,
    username: String,
    userId: String,
    caption: String,
    songName: String,
    songURL: String,
    artistName: String,
    albumArt: String,
    albumName: String,
    genres: { type: Array, default: [] },
    likes: { type: Number, default: 0 },
    date: Date
});

mongoose.model('posts', postSchema);