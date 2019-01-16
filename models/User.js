// Mongoose Model for User
const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Schema
const userSchema = new Schema({
    googleId: String,
    username: String,
    name: String,
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
    postsNumber: {type: Number, default: 0 }
});

// Create a new collection called users with userSchema
// and load into mongoose
mongoose.model('users', userSchema);