const mongoose = require('mongoose');
const User = mongoose.model('users');
const Follow = mongoose.model('follow');

module.exports = (app) => {

    app.post('/api/users', async (req, res) => {
        const user = await User.findOne({ username: req.body.username });
        res.send(user);
    });

    app.post('/api/follow', async (req, res) => {
        // TODO MAKE SURE YOU CANT FOLLOW YOURSELF
        const { personFollowingId, personFollowedId } = req.body;

        const follow = await Follow.findOne({personFollowingId: personFollowingId, personFollowedId:personFollowedId});

        if (follow === null) {
            const follow = new Follow({
                personFollowingId: personFollowingId,
                personFollowedId: personFollowedId
            });
    
            try {
                await follow.save();
                await User.findOneAndUpdate({ _id: personFollowingId },{ $inc : { followingCount: 1 }}).exec();
                const user = await User.findOneAndUpdate({ _id: personFollowedId },{ $inc : { followersCount: 1 }}).exec();
                res.send(user);
            } catch (err) {
                res.status(422).send(err);
                }
            } else {
            try {
                await Follow.findOneAndRemove({ personFollowingId: personFollowingId, personFollowedId:personFollowedId }).exec();
                await User.findOneAndUpdate({ _id: personFollowingId },{ $inc : { followingCount: -1 }}).exec();
                const user = await User.findOneAndUpdate({ _id: personFollowedId },{ $inc : { followersCount: -1 }}).exec();
                res.send(user);
            } catch (err) {
                res.status(422).send(err);
                }
            }

    
    });

};