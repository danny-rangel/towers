const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// Pull User model out of mongoose
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
    }, 
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }).then(existingUser => {
            if (existingUser) {
                // we have a record with the given profile
                done(null, existingUser);
            } else {
                // we dont have a record with this id, make a new one
                new User({ googleId: profile.id })
                .save()
                .then(user => done(null, user));
            }
        });
    })
);