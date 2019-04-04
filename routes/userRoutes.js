const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const User = mongoose.model('users');
const Follow = mongoose.model('follow');
const Post = mongoose.model('posts');
const PostLikes = mongoose.model('postLikes');
const Notification = mongoose.model('notification');
const multer = require('multer');
const sharp = require('sharp');
const AWS = require('aws-sdk');
const keys = require('../config/keys');
const fileType = require('file-type');

AWS.config.update({
    accessKeyId: keys.awsKeyId,
    secretAccessKey: keys.awsKey
});

const s3 = new AWS.S3();

const uploadFile = async (buffer, name, type) => {
    const params = {
      ACL: 'public-read',
      Body: buffer,
      Bucket: keys.awsBucketName,
      ContentType: type.mime,
      Key: `${name}`
    };
    const res = await s3.upload(params).promise();
    return res;
  };


module.exports = (app) => {

    app.get('/api/user/:username', async (req, res) => {
        const { username } = req.params;
        const user = await User.findOne({ username });
        res.send(user);
    });

    app.get('/api/users/:username', async (req, res) => {
        const { username } = req.params;
        const users = await User.find({ $text: { $search: username } }).limit(10).exec();
        res.send(users);
    });


    app.get('/api/follow/:username', async (req, res) => {
        const isFollowing = await Follow.findOne({ personFollowingId: req.user._id, personFollowedUsername: req.params.username });
        if (isFollowing) {
            res.send(true);
        } else {
            res.send(false);
        }
    });

    app.get('/api/followers/:id', async (req, res) => {
        const followers = await Follow.find({ personFollowedId: req.params.id });
        res.send(followers);
    });

    app.get('/api/following/:id', async (req, res) => {
        const following = await Follow.find({ personFollowingId: req.params.id });
        res.send(following);
    });


    app.patch('/api/user/:id', requireLogin, async (req, res) => {
        const { id, username, aboutme } = req.body;

        try {
            const check = await User.findOne({ username });
            if (check) {
                throw new Error('Username taken!');
            }
            // fix for promise.all
            const profile = await User.findByIdAndUpdate(id, { $set: { username, aboutme }}, { new: true }).exec();
            await Post.updateMany({ userId : req.user.id },{ $set : { username: username }}, { new: true }).exec();
            await Notification.updateMany({ from : req.user.id },{ $set : { fromUsername: username }}, { new: true }).exec();
            await PostLikes.updateMany({ likerId : req.user.id },{ $set : { username: username }}, { new: true }).exec();
            await Follow.updateMany({ personFollowingId : req.user.id },{ $set : { personFollowingUsername: username }}, { new: true }).exec();
            await Follow.updateMany({ personFollowedId : req.user.id },{ $set : { personFollowedUsername: username }}, { new: true }).exec();

            res.send(profile);
        } catch (err) {
            return res.status(400).send(err.message);
        }
        
    });

    const upload = multer({
        limits: {
            fileSize: 4000000
        },
        fileFilter(req, file, cb) {
            if (!file.originalname.match(/\.(png|jpeg|jpg|JPG|JPEG|PNG)$/)) {
                return cb(new Error('File not supported'))
            }
            cb(undefined, true)
        }
    });



    app.patch('/api/avi', requireLogin, upload.single('avi'), async (req, res) => {
        const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
        try {
            const type = fileType(buffer);
            let fileName = `towers-dev/${req.user.id}`;

            if (process.env.NODE_ENV === 'production') {
                fileName = `towers-prod/${req.user.id}`;
            }
            
            const data = await uploadFile(buffer, fileName, type);

            // fix for promise.all
            const profile = await User.findByIdAndUpdate(req.user.id, { $set: { profileImage: data.Location }}, { new: true }).exec();
            await Notification.updateMany({ $and : [{ from : req.user.id } ,{ action: "Follow" }]}, {$set : { image: data.Location }}, { new: true }).exec();
            await PostLikes.updateMany({ likerId : req.user.id },{ $set : { profilePicture: data.Location }}, { new: true }).exec();
            await Follow.updateMany({ personFollowingId : req.user.id },{ $set : { personFollowingImage: data.Location }}, { new: true }).exec();
            await Follow.updateMany({ personFollowedId : req.user.id },{ $set : { personFollowedImage: data.Location }}, { new: true }).exec();

            res.send(profile);

        } catch (e) {
            return res.status(400).send(error);
        }

    }, (error, req, res, next) => {
        res.status(400).send({ error: error.message })
    });


    app.get('/api/avi/:id', requireLogin, async (req, res) => {
        try {
            const user = await User.findById(req.params.id);

            if (!user || !user.profileImage) {
                throw new Error();
            }

            res.set('Content-type', 'image/png');
            res.send(user.profileImage);
        } catch (e) {
            res.status(404).send()
        }
    });



    app.post('/api/follow', requireLogin, async (req, res) => {
        
        const { personFollowingId, personFollowedId, personFollowingUsername, personFollowedUsername, personFollowingImage, personFollowedImage } = req.body;

        const follow = await Follow.findOne({ personFollowingId, personFollowedId });

        if (follow === null) {
            const follow = new Follow({
                personFollowingId,
                personFollowedId,
                personFollowingUsername,
                personFollowedUsername,
                personFollowingImage,
                personFollowedImage
            });

            const notification = new Notification({
                action: "Follow",
                from: personFollowingId,
                to: personFollowedId,
                fromUsername: personFollowingUsername,
                toUsername: personFollowedUsername,
                image: personFollowingImage,
                date: Date.now()
            });
    
            try {
                await follow.save();
                await notification.save();
                await User.findOneAndUpdate({ _id: personFollowingId },{ $inc : { followingCount: 1 }}).exec();
                const user = await User.findOneAndUpdate({ _id: personFollowedId },{ $inc : { followersCount: 1 }}, { new: true }).exec();

                const socketio = req.app.get('socketio');
                socketio.to(`${personFollowedId}`).emit('notification', notification);

                res.send(user);
                } catch (err) {
                    res.status(422).send(err);
                    }
                } else {
                try {
                    await Follow.findOneAndRemove({ personFollowingId, personFollowedId }).exec();
                    await User.findOneAndUpdate({ _id: personFollowingId },{ $inc : { followingCount: -1 }}).exec();
                    await Notification.findOneAndDelete({ $and : [{ from : req.user.id } ,{ action: "Follow" }]}).exec();
                    const user = await User.findOneAndUpdate({ _id: personFollowedId },{ $inc : { followersCount: -1 }}, { new: true }).exec();
                    res.send(user);
                } catch (err) {
                    res.status(422).send(err);
                    }
                }
    });


    //FETCH NOTIFICATIONS BY ID
    app.get('/api/notifications/user', requireLogin, async (req, res) => {
        const notifications = await Notification.find({ to : req.user.id }).sort({date: -1}).limit(40);
        res.send(notifications);
    });

    //UPDATE NOTIFICATIONS BY ID
    app.post('/api/notifications', requireLogin, async (req, res) => {
        await Notification.updateMany({ to : req.user.id },{ $set : { viewed: true }}, { new: true }).exec();;
        res.send('Success');
    });

    //CHECK IF USER HAS ANY NOTIFICATIONS THAT ARE NOT VIEWED
    app.get('/api/notifications', requireLogin, async (req, res) => {
        const notification = await Notification.findOne({ to: req.user.id, viewed: false }).exec();
        if (notification) {
            res.send(true);
        } else {
            res.send(false);
        }
    });

};