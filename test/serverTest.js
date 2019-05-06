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

describe('GET /', function () {
    this.timeout(5000);
    it("Database posts working properly", function (done) {
        wait(1000);
        chai.request(app)
            .get('/')
            .end(function(err, res) {
                var str = res.text;
                var patt = /PostForDatabaseTest/i;
                var resu = patt.test(str);
                assert.equal(resu, true);
                done()
            })
    });
});

describe('GET /login', function () {
    this.timeout(5000);
    it("Login page endpoint test", function (done) {
        wait(1000);
        chai.request(app)
            .get('/login')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done()
            })
    });
});

describe('GET /logout', function () {
    this.timeout(5000);
    it("Logout Endpoint test", function (done) {
        wait(1000);
        chai.request(app)
            .get('/logout')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done()
            })
    });
});

describe('GET /registration', function () {
    this.timeout(5000);
    it("Registration Endpoint test", function (done) {
        wait(1000);
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
        wait(1000);
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
        wait(1000);
        chai.request(app)
            .get('/new_post')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done()
            })
    });
});

describe('GET /thread/id', function () {
    this.timeout(5000);
    it("Test for specific thread on database", function (done) {
        wait(1000);
        chai.request(app)
            .get('/thread/5ccb41f3a7ce1c2e74c05001')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done()
            })
    });
});

describe('GET /thread/id', function () {
    this.timeout(5000);
    it("Test for error in random thread", function (done) {
        wait(1000);
        chai.request(app)
            .get('/thread/nonexistingthread')
            .end(function(err, res) {
                expect(res).to.have.status(404);
                done()
            })
    });
});

