// Mongoose Model for User
const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Schema
const userSchema = new Schema({
    googleId: String,
    username: { type: String, default: "" },
    name: String,
    aboutme: { type: String, default: "" },
    profileImage: {type: String, default: "https://i.imgur.com/JeTiSHK.png"},
    followersCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
    postsNumber: {type: Number, default: 0 }
});

// Create a new collection called users with userSchema
// and load into mongoose
mongoose.model('users', userSchema);