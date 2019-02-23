const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Post = mongoose.model('posts');
const Follow = mongoose.model('follow');
const PostLike = mongoose.model('postLikes');
const Notification = mongoose.model('notification');

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
        const { username } = req.body;
        const posts = await Post.find({ username }).sort({date: -1});
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
    app.get('/api/followPosts', requireLogin, async (req, res) => {

        const { id } = req.user;

        const follows = await Follow.find({ personFollowingId: id }).select({ "personFollowedId": 1 , "_id": 0});
        const followsArray = follows.map((follow) => {
            return follow.personFollowedId;
        });

        followsArray.push(id);
        
        const posts = await Post.find({'userId': {$in: followsArray}}).sort({date: -1});
        res.send(posts);
    });


    //DELETE POST
    app.delete('/api/postDelete', requireLogin, async (req, res) => {

        const { _id } = req.body;
        await PostLike.deleteMany({ postId: _id });
        const post = await Post.findOneAndDelete({ _id: _id });
        req.user.postsNumber -= 1;
        await req.user.save();

        res.send(post);
    });

    //LIKE POST
    app.post('/api/postsLike', requireLogin, async (req, res) => {
        
        const { postId, likerId, username, image } = req.body;
            let check = await PostLike.findOne({ postId: postId, likerId: likerId }).exec();
            if (check === null) {
                try {
                    //REDO LATER TO NOT LOOK FOR POST TWICE!
                    let post = await Post.findOne({ _id: postId });

                    like = new PostLike({
                        postId,
                        likerId,
                        username,
                        date: Date.now()
                    });

                    const notification = new Notification({
                        action: "Like",
                        from: likerId,
                        to: post.userId,
                        fromUsername: username,
                        toUsername: post.username,
                        image: post.albumArt,
                        date: Date.now()
                    });

                    await like.save();
                    await notification.save();
                    let newPost = await Post.findOneAndUpdate({ _id: like.postId },{ $inc : { likes: 1 }}, {new: true}).exec();
                    res.send(newPost);
                } catch (err) {
                    res.status(422).send(err);
                }
            } else {
                try {
                    await PostLike.findOneAndDelete({ postId: postId, likerId: likerId }).exec();
                    let newPost = await Post.findOneAndUpdate({ _id: postId },{ $inc : { likes: -1 }}, {new: true}).exec();
                    res.send(newPost);
                } catch (err) {
                    res.status(422).send(err);
                }
            } 
    });





    app.get('/api/postsLike/:id/:postId', requireLogin, async (req, res) => {
        const { postId, id } = req.params;
        const post = await PostLike.findOne({ postId: postId, likerId: id }).exec();

        if (post) {
            res.send(true);
        } else {
            res.send(false);
        }

    });



};