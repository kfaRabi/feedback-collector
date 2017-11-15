const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("../config/keys");

// configure passport
passport.use(
  new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/oauth/google/callback"
    },
    (accessTocken, refreshTocken, profile, done) => {
      console.log("at: ", accessTocken, " rt: ", refreshTocken, " prof: ", profile);
      return;
    }
  )
);