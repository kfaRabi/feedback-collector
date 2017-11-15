const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const mongoose = require('mongoose');
const keys = require("../config/keys");

const User = mongoose.model('users');

// serialize and deserialize User
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => { /*findById searches a collection with the object _id -> $oid key*/
    done(null, user);
  });
});



// configure passport
passport.use(
  // create strategy by passing params
  new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/oauth/google/callback",
      proxy: true,
    },
    // receive response and check/store user
    (accessTocken, refreshTocken, profile, done) => {
      const googleId = profile.id;
      User.findOne({ googleId }).then((existingUser) => {
        if(existingUser){
          done(null, existingUser); //done(noError, obj)
        }
        else{
          new User({ googleId })
          .save()
          .then((user) => {
            done(null, user);
          });
        }
      });
    }
  )
);