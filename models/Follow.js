const mongoose = require('mongoose');
const { Schema } = mongoose;

// Follow Schema
const followSchema = new Schema({
    personFollowingId: String,
    personFollowedId: String
});

mongoose.model('follow', followSchema);