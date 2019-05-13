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
            response.render("registration.hbs", {
                title: 'Registration',
                heading: "<span class='text-danger'>Already existing e-mail or username</span>"
            });
        } else if (result.length == 0) {
            db.collection('users').insertOne({
                email: email,
                username: username,
                password: password,
                notification: []
            }, (err, result) => {
                if (err) {
                    response.send('Unable to register user');
                }
                response.render('login.hbs', {
                    title: 'Login',
                    heading: "<h1 class='text-success'>Account successfully created!</h1>"
                });
            });
        }
    });
}