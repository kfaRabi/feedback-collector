const express = require("express");
const mongoose = require('mongoose');
// cookie-session puts all the data (user.id) inside the cookie
// express-session puts a key to cookie and uses that to lookup a db to find the associated user
// *** if we just need to store anything less than or equal to 4kb then cookie-session is fine.
// *** otherwise must use express-session. it will hold a session_id and lookup in some session_store that will have all the data 
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

// load local modules
const keys = require('./config/keys');

require('./models/User');
require('./services/passport_services');

// app
const app = express();

// middlewares

// body perser to parse the request payload as a json boject named body
app.use(bodyParser.json());

// cookie-session.
// http request comes in 'req' object
// 'req' passes this to route handler
// and cookieSession. cookieSession extracts
// cookie data and passes it to passport
// using express 'req.session' object
app.use(cookieSession({
  maxAge: 30 * 24 * 3600 * 1000, /* 30 days in mili sec.*/
  keys: [keys.cookieKey],
}));

// passport deserialization
// when the req.session is passed to passport,
// it pulls 'user id' (in our case) out of cookie data
// and passes to the 'deserializeUser' (function that we wrote)
// and 'deserializeUser' function finds the user with the given id
// and assigns it to 'req.user' object.
app.use(passport.initialize()); /*init passport*/
app.use(passport.session()); /*tell app to use passport session. and that's why we see a passport object in 'req.session'*/

// import routers
require('./routes/auth_routes')(app);
require('./routes/billing_routes')(app);

if(process.env.NODE_ENV === 'production') {
  // IN production, when we don't know any routes,

  // first check if the file exists inside 'client/build'
  // if yes, return the file as a respons
  app.use(express.static('client/build'));

  // otherwise, just return the 'client/build/index.html'
  // (out index.html has depedency on bundle.js, so entire front-end boots up)
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve( __dirname, 'client', 'build', 'index.html'));
  });
}

// connect to mongoDB and configure
mongoose.connect(keys.mongoURI, () => {
  console.log("connected to mLab");
});
mongoose.Promise = global.Promise;


app.get("/", (req, res) => {
  res.send("hello there");
});

// start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Listening to PORT:", PORT);
});
