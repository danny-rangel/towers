const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Post = mongoose.model('posts');
const Follow = mongoose.model('follow');
const PostLike = mongoose.model('postLikes');
const Notification = mongoose.model('notification');


module.exports = (app) => {

    //MAKE NEW POST
    app.post('/api/posts', requireLogin, async (req, res) => {
        const { songName, artistName, albumArt, caption, username, songURL, 
            durationInMillis, previewURL, userId, albumName, genres } = req.body;

        const post = new Post({
            username: username,
            caption: caption,
            durationInMillis: durationInMillis,
            songName: songName,
            artistName: artistName,
            songURL: songURL,
            previewURL: previewURL,
            genres: genres,
            albumArt: albumArt,
            albumName: albumName,
            userId: userId,
            date: Date.now()
        });
    
        try {
            await post.save();
            req.user.postsNumber += 1;
            await req.user.save();

            const socketio = req.app.get('socketio');
            const follows = await Follow.find({ personFollowingId: userId }).select({ "personFollowedId": 1 , "_id": 0});
            const followsArray = follows.map((follow) => {
                return follow.personFollowedId;
            });
            
            followsArray.forEach(id => {
                socketio.to(`${id}`).emit('post', post);
            });

            res.send(post);
        } catch (err) {
            res.status(422).send(err);
        }

    });


    //DELETE POST
    app.delete('/api/postDelete', requireLogin, async (req, res) => {

        const { _id } = req.body;
        await PostLike.deleteMany({ postId: _id });
        await Notification.deleteMany({ postId: _id });
        const post = await Post.findOneAndDelete({ _id: _id });
        req.user.postsNumber -= 1;
        await req.user.save();

        res.send(post);
    });

    //LIKE POST
    app.post('/api/postsLike', requireLogin, async (req, res) => {
        
        const { postId, likerId, username, profileImage } = req.body;
            let check = await PostLike.findOne({ postId: postId, likerId: likerId }).exec();
            if (check === null) {
                try {
                    //REDO LATER TO NOT LOOK FOR POST TWICE!
                    let post = await Post.findOne({ _id: postId });

                    like = new PostLike({
                        postId,
                        likerId,
                        username,
                        profileImage,
                        date: Date.now()
                    });

                    await like.save();

                    // IF NOT AUTH USER AND SUCCESSFUL VVV

                    if (post.userId !== likerId) {
                        
                        const notification = new Notification({
                            action: "Like",
                            from: likerId,
                            to: post.userId,
                            fromUsername: username,
                            toUsername: post.username,
                            image: post.albumArt,
                            postId,
                            date: Date.now()
                        });
    
                        
                        await notification.save();

                        const socketio = req.app.get('socketio');        
                        socketio.to(`${post.userId}`).emit('notification', notification);
                    }

                    //////////////////////////////////////

                    let newPost = await Post.findOneAndUpdate({ _id: like.postId },{ $inc : { likes: 1 }}, {new: true}).exec();
                    res.send(newPost);
                } catch (err) {
                    res.status(422).send(err);
                }
            } else {
                try {
                    await PostLike.findOneAndDelete({ postId, likerId }).exec();
                    await Notification.findOneAndDelete({ postId }).exec();
                    let newPost = await Post.findOneAndUpdate({ _id: postId },{ $inc : { likes: -1 }}, {new: true}).exec();
                    res.send(newPost);
                } catch (err) {
                    res.status(422).send(err);
                }
            } 
    });





    //FETCH POSTS BY USER ID
    app.get('/api/posts/user', async (req, res) => {
        const posts = await Post.find({ _user: req.user.id }).sort({date: -1}).limit(20);
        res.send(posts);
    });




    //FETCH POST BY POST ID
    app.get(`/api/posts/:id`, async (req, res) => {
        const { id } = req.params;
        const post = await Post.find({ _id: id });
        res.send(post);
    });



    //FETCH ALL POSTS
    app.get('/api/posts', async (req, res) => {
        const posts = await Post.find({}).sort({date: -1}).limit(20);
        res.send(posts);
    });
    

    //FETCH POSTS BY USERNAME
    app.get('/api/posts/:username/:page/:take', async (req, res) => {
        const { username, page, take } = req.params;
        const posts = await Post.find({ username }).skip(page * take).limit(parseInt(take)).sort({date: -1}).exec();

        res.send(posts);
    });









    //FETCH ALL USER POSTS COUNT
    app.get('/api/postCount/:username', async (req, res) => {
        const { username } = req.params;
        const postsCount = await Post.countDocuments({ username });
        res.send({postsCount});
    });



    //FETCH ALL FOLLOWER POSTS COUNT
    app.get('/api/followPosts', requireLogin, async (req, res) => {
        
        const { id } = req.user;
        const follows = await Follow.find({ personFollowingId: id }).select({ "personFollowedId": 1 , "_id": 0});
        const followsArray = follows.map((follow) => {
            return follow.personFollowedId;
        });

        followsArray.push(id);

        const postsCount = await Post.countDocuments({'userId': {$in: followsArray}});
        res.send({postsCount});
    });














    //FETCH FOLLOWER POSTS
    app.get('/api/followPosts/:page/:take', requireLogin, async (req, res) => {
        const { id } = req.user;
        const { page, take } = req.params;

        const follows = await Follow.find({ personFollowingId: id }).select({ "personFollowedId": 1 , "_id": 0});
        const followsArray = follows.map((follow) => {
            return follow.personFollowedId;
        });

        followsArray.push(id);

        const posts = await Post.find({'userId': {$in: followsArray}}).skip(page * take).limit(parseInt(take)).sort({date: -1}).exec();
        res.send(posts);
    });








    // CHECK IF PERSON THAT IS LOGGED IN HAS LIKED THE POST

    app.get('/api/postsLike/:id/:postId', requireLogin, async (req, res) => {
        const { postId, id } = req.params;
        const post = await PostLike.findOne({ postId: postId, likerId: id }).exec();

        if (post) {
            res.send(true);
        } else {
            res.send(false);
        }

    });


    // FETCH ALL USERS WHO LIKED GIVEN POST
    app.get('/api/postsLike/:id', async (req, res) => {
        const { id } = req.params;
        const likes = await PostLike.find({ postId: id }).exec();
        res.send(likes);
    });

};