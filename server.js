const port = process.env.PORT || 8080;

const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');

const utils = require('./utils.js');
const register = require('./users.js');
const pass = require('./passport.js');
const forum = require('./forum.js');
const promises = require('./promises.js');

const search_script = require('./search_script.js');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended:true
}));

hbs.registerHelper('port', () => {
    return port;
});

hbs.registerHelper('year', () => {
    return new Date().getFullYear();
});

app.use(pass);
app.use(register);
app.use(forum);

// CHECKS AUTHENTICATION
checkAuthentication = (request, response, next) => {
    if (request.isAuthenticated()) {
        return next();
    }
    response.redirect('/login');
};

checkAuthentication_false = (request, response, next) => {
    if (request.isAuthenticated() != true) {
        return next();
    }
    response.redirect('/');
};

// Login Page
app.get('/login', (request, response) => {
    response.render('login.hbs', {
        title: 'Login',
        heading: 'Log In'
    });
});

app.get('/login_failed', (request, response) => {
    response.render('login.hbs', {
        title: 'Login',
        heading: "<h1 class='text-danger'>Username and Password do not match</h1>"
    });
});

// Logout Page
app.get('/logout', (request, response) => {
    request.logout();
    request.session.destroy(() => {
        response.clearCookie('connect.sid');
        response.redirect('/');
    });
});

// Register Page
app.get("/registration", checkAuthentication_false, (request, response) => {
    response.render("registration.hbs", {
        title: 'Registration',
        heading: 'Make an Account'
    });
});

// Main Page
app.get('/', async (request, response) => {
    var topic = await promises.genreList();

    response.render('genre.hbs', {
        title: 'Home',
        heading: 'Message Board',
        topic: topic,
    });
});

// Main Page
app.post('/search', async (request, response) => {
    var text_to_search = request.body.search;
    var message_list = await promises.messagePromise();

    var filtered_messages = await search_script.search(text_to_search, message_list);

    response.render('forum.hbs', {
        title: 'Home',
        message: filtered_messages,
        heading: 'Results for ' + text_to_search
    });
});

// Forum page
app.get('/genre_board/:genre', async (request, response) => {
    promises.messagePromise();

    var topic = request.params.genre;
    var messages = await promises.messagePromise();
    var filtered_list = [];
    for (var i = 0; i < messages.length; i++) {
        if (messages[i].genre === topic) {
            filtered_list.push(messages[i])
        }
    }

    var genre = await promises.specificGenre(topic);
    try {
        response.render('forum.hbs', {
            title: 'Home',
            heading: genre[0].name,
            message: filtered_list,
            genre: request.params.genre,
        });
    } catch (e) {
        response.redirect('/')
    }
});

// Adding new post
app.get('/:genre/new_post', checkAuthentication, (request, response) => {
    response.render('new_post.hbs', {
        title: 'Post',
        heading: 'Add a post',
        genre: request.params.genre
    });
});

// Dynamically generated endpoint for threads
app.get('/thread/:id', async (request, response) => {
    promises.threadPromise(request.params.id);
    var thread = await promises.threadPromise(request.params.id);

    if (thread === null) {
        response.status(404).send('Thread does not exist')
    } else {
        promises.replyPromise(request.params.id);
        var replies = await promises.replyPromise(request.params.id);

        for (var i = 0; i < replies.length; i++) {
            var text = replies[i].message;
            text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
            replies[i].message = text;
        }


        var isOP = false;
        if (request.user != undefined) {
            if (request.user.username == thread.username) {
                isOP = true;
            }
        }

        thread.message = thread.message.replace(/(\r\n|\n|\r)/gm, '<br>');

        response.render('thread.hbs', {
            title: 'Thread',
            heading: thread.title,
            op_message: thread.message,
            poster: thread.username,
            date: thread.date,
            id: thread._id,
            reply: replies,
            isOP: isOP,
            thread: thread
        });
    }
});

app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
    utils.init();
});

module.exports = app;
