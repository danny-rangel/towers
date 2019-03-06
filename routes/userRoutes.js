const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const User = mongoose.model('users');
const Follow = mongoose.model('follow');
const Notification = mongoose.model('notification');

module.exports = (app) => {

    app.post('/api/users', async (req, res) => {
        const { username } = req.body; 
        const user = await User.findOne({ username });
        res.send(user);
    });


    app.get('/api/follow/:id', async (req, res) => {
        const isFollowing = await Follow.findOne({ personFollowingId: req.user._id, personFollowedId: req.params.id });
        if (isFollowing) {
            res.send(true);
        } else {
            res.send(false);
        }
    });

    app.patch('/api/user/:id', requireLogin, async (req, res) => {
        const { id, username, aboutme } = req.body;
        const profile = await User.findByIdAndUpdate(id, { $set: {
            username,
            aboutme
        }}, { new: true }).exec();
        res.send(profile);
    })



    app.post('/api/follow', async (req, res) => {
        
        const { personFollowingId, personFollowedId, personFollowingUsername, personFollowedUsername, image } = req.body;

        const follow = await Follow.findOne({ personFollowingId, personFollowedId });

        if (follow === null) {
            const follow = new Follow({
                personFollowingId,
                personFollowedId
            });

            const notification = new Notification({
                action: "Follow",
                from: personFollowingId,
                to: personFollowedId,
                fromUsername: personFollowingUsername,
                toUsername: personFollowedUsername,
                image: image,
                date: Date.now()
            });
    
            try {
                await follow.save();
                await notification.save();
                await User.findOneAndUpdate({ _id: personFollowingId },{ $inc : { followingCount: 1 }}).exec();
                const user = await User.findOneAndUpdate({ _id: personFollowedId },{ $inc : { followersCount: 1 }}, { new: true }).exec();
                res.send(user);
            } catch (err) {
                res.status(422).send(err);
                }
            } else {
            try {
                await Follow.findOneAndRemove({ personFollowingId, personFollowedId }).exec();
                await User.findOneAndUpdate({ _id: personFollowingId },{ $inc : { followingCount: -1 }}).exec();
                const user = await User.findOneAndUpdate({ _id: personFollowedId },{ $inc : { followersCount: -1 }}, { new: true }).exec();
                res.send(user);
            } catch (err) {
                res.status(422).send(err);
                }
            }
    });


    //FETCH NOTIFICATIONS BY ID
    app.get('/api/notifications/user', async (req, res) => {
        const notifications = await Notification.find({ to : req.user.id }).sort({date: -1});
        res.send(notifications);
    });

};