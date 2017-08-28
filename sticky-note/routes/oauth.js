/**
 * Created by qiangxl on 17/8/28.
 */
var express = require('express')
var router = express.Router()

var passport = require('passport')
var GitHubStrategy = require('passport-github').Strategy

passport.serializeUser(function(user, done) {
  console.log('----serializeUser-----')
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log('------deserializeUser------')
  done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: '76a23e37c06148201df7',
    clientSecret: 'cf660dba0ac49b6bf84d7822d31e51924b1cdba4',
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    done(null,profile)
  }
));

router.get('/github',
  passport.authenticate('github')
);

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
  console.log('github.req: ',req)
    req.session.user = {
      id: req.user.id,
      username: req.user.displayName || req.user.username,
      avatar: req.user._json.avatar_url,
      provider: req.user.provider
    }
    res.redirect('/');
  });



module.exports = router;