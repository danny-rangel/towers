const mongoose = require('mongoose');
const { Schema } = mongoose;

// Follow Schema
const followSchema = new Schema({
    personFollowingId: String,
    personFollowedId: String,
    personFollowingUsername: String,
    personFollowedUsername: String,
    personFollowingImage: String,
    personFollowedImage: String
});

mongoose.model('follow', followSchema);