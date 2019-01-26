const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Post = mongoose.model('posts');
const Follow = mongoose.model('follow');
const PostLike = mongoose.model('postLikes');

module.exports = (app) => {

    //MAKE NEW POST
    app.post('/api/posts', requireLogin, async (req, res) => {
        const { songName, artistName, albumArt, caption, username, songURL, durationInMillis, previewURL, userId, albumName } = req.body;

        const post = new Post({
            username: username,
            caption: caption,
            durationInMillis: durationInMillis,
            songName: songName,
            artistName: artistName,
            songURL: songURL,
            previewURL: previewURL,
            albumArt: albumArt,
            albumName: albumName,
            userId: userId,
            date: Date.now()
        });

        try {
            await post.save();
            req.user.postsNumber += 1;
            await req.user.save();
            res.send(post);
        } catch (err) {
            res.status(422).send(err);
        }

    });

    //FETCH POSTS BY ID
    app.get('/api/posts/user', async (req, res) => {
        const posts = await Post.find({ _user: req.user.id }).sort({date: -1});
        res.send(posts);
    });

    //FETCH POSTS BY USERNAME
    app.post('/api/posts/user', async (req, res) => {
        const posts = await Post.find({ username: req.body.username }).sort({date: -1});
        res.send(posts);
    });


    //FETCH POST BY ID
    app.post(`/api/posts/:id`, async (req, res) => {
        const post = await Post.find({ _id: req.body.id });
        res.send(post);
    });




    //FETCH ALL POSTS
    app.get('/api/posts', async (req, res) => {
        const posts = await Post.find({}).sort({date: -1});
        res.send(posts);
    });


    //FETCH FOLLOWER POSTS
    app.get('/api/followPosts', async (req, res) => {
        const follows = await Follow.find({ personFollowingId: req.user.id }).select({ "personFollowedId": 1 , "_id": 0});
        const followsArray = follows.map((follow) => {
            return follow.personFollowedId;
        });

        followsArray.push(req.user.id);
        
        const posts = await Post.find({'userId': {$in: followsArray}}).sort({date: -1});
        res.send(posts);
    });



    //DELETE POST
    app.delete('/api/postDelete', async (req, res) => {
        await PostLike.deleteMany({ postId: req.body._id });
        const post = await Post.findOneAndDelete({ _id: req.body._id });
        req.user.postsNumber -= 1;
        await req.user.save();

        res.send(post);
    });

    //LIKE POST
    app.post('/api/postsLike', async (req, res) => {
        const { postId, likerId, username } = req.body;
        let check = await PostLike.findOne({ postId: postId, likerId: likerId });
        if (check !== null) {
            try {
                await PostLike.findOneAndDelete({ postId: postId, likerId: likerId }).exec();
                let newPost = await Post.findOneAndUpdate({ _id: like.postId },{ $inc : { likes: -1 }}, {new: true}).exec();
                res.send(newPost);
            } catch (err) {
                res.status(422).send(err);
            }
        } else {
            like = new PostLike({
                postId: postId,
                likerId: likerId,
                username: username,
                date: Date.now()
            });
    
            try {
                await like.save();
                let newPost = await Post.findOneAndUpdate({ _id: like.postId },{ $inc : { likes: 1 }}, {new: true}).exec();
                res.send(newPost);
            } catch (err) {
                res.status(422).send(err);
            }
        }
    });


};