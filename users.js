const express = require('express');
var utils = require('./utils');

var router = express.Router();

router.post('/saveUser', saveUser);

module.exports = router;

function saveUser(request, response) {
    var email = request.body.email;
    var username = request.body.username;
    var password = request.body.password;

    var db = utils.getDb();

    var query = {
        $or: [
            {email: email},
            {username: username}
        ]
    };

    db.collection('users').find(query).toArray((err, result) => {
        if (result.length > 0) {
            setTimeout(function() {
                response.render("registration.hbs", {
                    title: 'Registration',
                    heading: "<span style='color: red'>Already existing e-mail or username</span>"
                });
            }, 2500);
        } else if (result.length == 0) {
            db.collection('users').insertOne({
                email: email,
                username: username,
                password: password
            }, (err, result) => {
                if (err) {
                    response.send('Unable to register user');
                }
                response.redirect('/login');
            });
        }
    });
}