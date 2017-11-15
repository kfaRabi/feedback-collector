const passport = require('passport');
require('../services/passport_services');

module.exports = (app) => {
  app.get('/oauth/google', 
    passport.authenticate('google',/* <<<--- strategy to use, just like 'local'*/{
      scope: ['profile', 'email'],
    })
  );

  app.get('/oauth/google/callback',
    // passport sees that there is a param
    // in the request, so, this time,
    // instead of sending a request to grant
    // grant access, it trys to create a profile ?
    passport.authenticate('google')
  );
}