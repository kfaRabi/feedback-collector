const passport = require('passport');

module.exports = (app) => {
  app.get('/oauth/google', 
    passport.authenticate('google',/* <<<--- strategy to use, just like 'local'*/{
      scope: ['profile', 'email'],
    })
  );

  app.get(
    '/oauth/google/callback',
    // passport sees that there is a param
    // in the request, so, this time,
    // instead of sending a request to grant
    // grant access, it trys to create a profile ?
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys')
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
}