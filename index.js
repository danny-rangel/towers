const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const passportSocketIo = require("passport.socketio");
const enforce = require('express-sslify');
require('./models/User');
require('./models/Post');
require('./models/Follow');
require('./models/PostComments');
require('./models/PostLikes');
require('./models/Notifications');
require('./services/passport');

const redis = require('redis');
const client = redis.createClient({ url: keys.redisUrl, password: keys.redisPassword });

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();
app.use(bodyParser.json());


const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const sessionStore = new RedisStore({ client: client });

app.use(session({
    store: sessionStore,
    secret: 'whatislovebabydonthurtme',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());




const PORT = process.env.PORT || 5000;
const server = app.listen(PORT);

const io = require('./services/socket').initialize(server);
app.set('socketio', io);


require('./routes/authRoutes')(app);
require('./routes/postRoutes')(app);
require('./routes/userRoutes')(app);



io.use(passportSocketIo.authorize({
    cookieParser: require('cookie-parser'),
    key: 'connect.sid',
    secret: 'whatislovebabydonthurtme',
    store: sessionStore  
}));



  io.on('connection', socket => {
    socket.join(socket.request.user._id);
});


if (process.env.NODE_ENV === 'production') {
    app.use(enforce.HTTPS({trustProtoHeader: true}));
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}