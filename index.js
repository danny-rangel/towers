const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const passportSocketIo = require("passport.socketio");
require('./models/User');
require('./models/Post');
require('./models/Follow');
require('./models/PostComments');
require('./models/PostLikes');
require('./models/Notifications');
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 1 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);


// const session = require('express-session');
// const RedisStore = require('connect-redis')(session);

// const sessionStore = new RedisStore({
//     host: '127.0.0.1',
//     port: 6379,
//     db : 1
// });

// app.use(session({
//     store: sessionStore,
//     secret: 'whatislovebabydonthurtme',
//     resave: false
// }));

app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app);
require('./routes/postRoutes')(app);
require('./routes/userRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT);
const io = require('socket.io').listen(server);



// io.use(passportSocketIo.authorize({
//     cookieParser: require('cookie-parser'), //optional your cookie-parser middleware function. Defaults to require('cookie-parser')
//     key:          'connect.sid',       //make sure is the same as in your session settings in app.js
//     secret:       'whatislovebabydonthurtme',      //make sure is the same as in your session settings in app.js
//     store:        sessionStore,        //you need to use the same sessionStore you defined in the app.use(session({... in app.js
//     success:      onAuthorizeSuccess,  // *optional* callback on success - read more below
//     fail:         onAuthorizeFail,     // *optional* callback on fail/error - read more below
//   }));


//   function onAuthorizeSuccess(data, accept){
//     console.log('successful connection to socket.io');

//     console.log('DATA: ', data.user);
  
//     // The accept-callback still allows us to decide whether to
//     // accept the connection or not.
//     accept(null, true);

//   }
  
//   function onAuthorizeFail(data, message, error, accept){
//     if(error)
//       throw new Error(message);
//     console.log('failed connection to socket.io:', message);
  
//     // We use this callback to log all of our failed connections.
//     accept(null, false);
  
//     // OR
  
//     // If you use socket.io@1.X the callback looks different
//     // If you don't want to accept the connection
//     if(error)
//       accept(new Error(message));
//     // this error will be sent to the user as a special error-package
//     // see: http://socket.io/docs/client-api/#socket > error-object
//   }

// io.on("connection", socket => {
//     console.log('CONNECTED: ', socket.id);
//     // console.log('MEMORY', sessionStore);

//     // socket.on("disconnect", () => {
//     //     console.log('byee');
//     // })
// })

