const express = require('express');
const utils = require('./utils');
const pass = require('./passport.js');
const logger = require('./logger');

var router = express.Router();

router.use(pass);

// Add post to the db
router.post('/:genre/add_post', add_post);
router.post('/add_reply', add_reply);
router.post('/delete_post', delete_post);
router.post('/edit_post', edit_post);
router.get('/clearnotification', clearNotification);

function get_date() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    current_date = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    return current_date;
}

function add_post(request, response) {
    var title = request.body.title;
    var message = request.body.message;
    var username = request.user.username;
    var chosen_genre = request.params.genre;

    var db = utils.getDb();

    db.collection('messages').insertOne({
        title: title,
        message: message,
        username: username,
        type: 'thread',
        date: get_date(),
        thread_id: null,
        genre: chosen_genre
    }, (err, result) => {
        if (err) {
            response.send('Unable to post message');
        }
        logger.logDB("Add Forum Post", req.headers["x-forwarded-for"] || req.connection.remoteAddress || "Visitor");
        response.redirect('/genre_board/' + chosen_genre);
    });
}

function edit_post(request, response) {
    var thread_id = request.body.id;
    var edited_message = request.body.edit_textarea;
    
    var db = utils.getDb();
    var ObjectId = utils.getObjectId();
    
    db.collection('messages').findOneAndUpdate({
        _id: new ObjectId(thread_id)
    }, {
        $set: {message: edited_message}
    }, (err, result) => {
        if (err) {
            response.send('Unable to edit message');
        }
        logger.logDB("Edit Forum Post", req.headers["x-forwarded-for"] || req.connection.remoteAddress || "Visitor");
        response.redirect('/');
    });
}

function delete_post(request, response) {
    var thread_id = request.body.id;
    var username = request.user.username;

    var db = utils.getDb();
    var ObjectId = utils.getObjectId();

    db.collection('messages').deleteMany({
        $or:[
            {_id: ObjectId(thread_id)},
            {thread_id: thread_id}
        ]
    }, (err, result) => {
        if (err) {
            response.send('Unable to delete message');
        }
        logger.logDB("Delete Forum Post", req.headers["x-forwarded-for"] || req.connection.remoteAddress || "Visitor");
        response.redirect('/');
    });
}

function add_reply(request, response) {
    var reply = request.body.reply;
    var username = request.user.username;
    var thread_id = request.body.id;

    var db = utils.getDb();

    db.collection('messages').insertOne({
        message: reply,
        username: username,
        type: 'reply',
        date: get_date(),
        thread_id: thread_id
    }, (err, result) => {
        if (err) {
            response.send('Unable to post message');
        }
        logger.logDB("Add Reply", req.headers["x-forwarded-for"] || req.connection.remoteAddress || "Visitor");
        addNotification(thread_id);
        response.redirect('back');
    });
}

async function addNotification(thread_id) {
    var db = utils.getDb();
    var ObjectId = utils.getObjectId();
    var thread = await db.collection('messages').findOne({
        _id: ObjectId(thread_id)
    });
    var user = thread.username;
    var dbuser = await db.collection('users').findOne({
        username: user
    });
    var notifications = dbuser.notification;
    notifications.unshift(thread);
    db.collection('users').findOneAndUpdate({
        username: user
    }, {
        $set: {notification: notifications}
    }, (err, items) => {});
}

function clearNotification(request, response) {
    var db = utils.getDb();
    var username = request.user.username;
    db.collection('users').findOneAndUpdate({
        username: username
    }, {
        $set: {notification: []}
    }, (err, items) => {});
    response.redirect('back');
}

module.exports = router;