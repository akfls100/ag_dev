const request = require('supertest');
const assert = require('chai').assert;
const expect = require('chai').expect;

var chai = require('chai'), chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../server');

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}

describe('GET /', function () {
    this.timeout(5000);
    it("Main page endpoint test", function (done) {
        wait(1000);
        chai.request(app)
            .get('/')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done()
            })
    });
});

describe('GET /all_genres', function () {
    this.timeout(5000);
    it("Sports working properly", function (done) {
        // wait(1000);
        chai.request(app)
            .get('/genre_board/sports')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done()
            })
    });
    it("Games working properly", function (done) {
        // wait(1000);
        chai.request(app)
            .get('/genre_board/games')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done()
            })
    });
    it("Music working properly", function (done) {
        // wait(1000);
        chai.request(app)
            .get('/genre_board/music')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done()
            })
    });
    it("News working properly", function (done) {
        // wait(1000);
        chai.request(app)
            .get('/genre_board/news')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done()
            })
    });
    it("TV/Movies working properly", function (done) {
        // wait(1000);
        chai.request(app)
            .get('/genre_board/tv-movies')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done()
            })
    });
    it("General working properly", function (done) {
        // wait(1000);
        chai.request(app)
            .get('/genre_board/general')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done()
            })
    });
});

describe('GET /non-existing-genre', function () {
    this.timeout(5000);
    it("Not existing genre test", function (done) {
        // wait(1000);
        chai.request(app)
            .get('/genre_board/not-existing-genre')
            .end(function(err, res) {
                expect(res).to.redirect;
                done()
            })
    });
});

describe('GET /logout', function () {
    this.timeout(5000);
    it("Logout Endpoint test", function (done) {
        // wait(1000);
        chai.request(app)
            .get('/logout')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done()
            })
    });
});

describe('GET /login', function () {
    this.timeout(5000);
    it("Login Endpoint test", function (done) {
        // wait(1000);
        chai.request(app)
            .get('/login')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done()
            })
    });
});

describe('POST /login', function () {
    this.timeout(5000);
    it("Not matching credentials", function (done) {
        // wait(1000);
        chai.request(app)
            .post('/login')
            .send({
                "username": "Raphael_Pletz",
                "password": "testestest"})
            .end(function(err, res) {
                var str = res.text;
                var patt = /Username and Password do not match/i;
                var resu = patt.test(str);
                assert.equal(resu, true);
                done()
            })
    });
});


describe('GET /registration', function () {
    this.timeout(5000);
    it("Registration Endpoint test", function (done) {
        // wait(1000);
        chai.request(app)
            .get('/registration')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done()
            })
    });
});

describe('POST /saveUser', function () {
    this.timeout(5000);
    it("Existing user in database", function (done) {
        // wait(1000);
        chai.request(app)
            .post('/saveUser')
            .send({
                "email": "raphael.pletz00@gmail.com",
                "name": "Raphael_Pletz",
                "password": "testestest"})
            .end(function(err, res) {
                var str = res.text;
                var patt = /Already existing e-mail or username/i;
                var resu = patt.test(str);
                assert.equal(resu, true);
                done()
            })
    });
});

describe('GET /new_post', function () {
    this.timeout(5000);
    it("New Post Endpoint test", function (done) {
        // wait(1000);
        chai.request(app)
            .get('/sports/new_post')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done()
            })
    });
});

describe('GET /thread/id', function () {
    this.timeout(5000);
    it("Test for specific thread on database", function (done) {
        // wait(1000);
        chai.request(app)
            .get('/thread/5cd3782cd4441e2644e72881')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done()
            })
    });
});

describe('GET /thread/id', function () {
    this.timeout(5000);
    it("Test for error in random thread", function (done) {
        // wait(1000);
        chai.request(app)
            .get('/thread/nonexistingthread')
            .end(function(err, res) {
                expect(res).to.have.status(404);
                done()
            })
    });
});

