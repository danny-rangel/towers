const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Post = mongoose.model('posts');

module.exports = (app) => {

    app.post('/api/posts', requireLogin, async (req, res) => {
        const { songName, artistName, albumArt, caption, username, songURL, durationInMillis, previewURL } = req.body;

        const post = new Post({
            username: username,
            caption: caption,
            durationInMillis: durationInMillis,
            songName: songName,
            artistName: artistName,
            songURL: songURL,
            previewURL: previewURL,
            albumArt: albumArt,
            _user: req.user.id,
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


    app.get('/api/posts/user', async (req, res) => {
        const posts = await Post.find({ _user: req.user.id }).sort({date: -1});
        res.send(posts);
    });

    app.post('/api/posts/user', async (req, res) => {
        const posts = await Post.find({ username: req.body.username }).sort({date: -1});
        res.send(posts);
    });


    app.get('/api/posts', async (req, res) => {
        const posts = await Post.find({}).sort({date: -1});;
        res.send(posts);
    });


    app.delete('/api/posts', async (req, res) => {
        const post = await Post.findOneAndDelete({ _id: req.body._id });
        res.send(post);
    })

};