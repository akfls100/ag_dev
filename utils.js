const MongoClient = require('mongodb').MongoClient;

var _dbUser = null;

getDb = () => {
    return _dbUser;
};

getObjectId = () => {
    return require('mongodb').ObjectID;
};

init = (callback) => {
    var MONGODB_URI = 'mongodb://heroku_dmrpgpf5:a0bdroiprkhc7mg7c9ug98s9ni@ds149616.mlab.com:49616/heroku_dmrpgpf5';
    MongoClient.connect(MONGODB_URI || 'mongodb://localhost:27017/forumdb', (err, client) => {
        if (err) {
            return console.log('Unable to connect to DB');
        }
        _dbUser = client.db();
        console.log('Successfully connected to MongoDB server');
    });
};

module.exports = {
    getDb: getDb,
    getObjectId: getObjectId,
    init: init
};