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
    it("Main page endpoint test ", function (done) {
        wait(1000);
        chai.request(app)
            .get('/')
            .end(function(err, res) {
                expect(res).to.have.status(200);
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
