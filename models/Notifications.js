const mongoose = require('mongoose');
const { Schema } = mongoose;

// Follow Schema
const notificationSchema = new Schema({
    action: String,
    from: String,
    to: String,
    fromUsername: String,
    toUsername: String,
    viewed: {type: Boolean, default: false},
    image: String,
    date: Date
});

mongoose.model('notification', notificationSchema);