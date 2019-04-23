const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const utils = require('./utils');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

var router = express.Router();

/* SETUP */
router.use(express.static('public'));
router.use(session({ secret: 'cats' }));
router.use(bodyParser.urlencoded({ extended: false }));

router.use(passport.initialize());
router.use(passport.session());

router.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    var db = utils.getDb();

    // TODO: FIX THIS SHIT
    var ObjectId = utils.getObjectId();

    db.collection('users').findOne({
        _id: new ObjectId(id)
    }, (err, user) => {
        if (user._id == id){
            return done(null, user);
        }
        return done(err, false);
    });
});

router.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/login'
    }), (req, res) => {
        res.redirect('/');
    }
);

/* LOCAL AUTHENTICATION */
passport.use(new LocalStrategy((username, password, done) => {

    var db = utils.getDb();

    db.collection('users').findOne({
        username: username,
        password: password
    }, (err, user) => {
        if (err) {
            return done(null, false);
        }
        return done(null, user);
    });
}
));

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});


module.exports = router;