const MongoClient = require('mongodb').MongoClient;

var _dbUser = null;

getDb = () => {
    return _dbUser;
};

getObjectId = () => {
    return require('mongodb').ObjectID;
};

init = (callback) => {
    const client = new MongoClient('mongodb+srv://kev:8ekNBO7U5LHNAOEJ@clusterk-0d6io.mongodb.net/test?retryWrites=true', {useNewUrlParser:true});
    client.connect((err, client) => {
        if (err) {
            return console.log('Unable to connect to DB');
        }
        _dbUser = client.db('forumdb');
        console.log('Successfully connected to MongoDB server');
    });
};

module.exports = {
    getDb: getDb,
    getObjectId: getObjectId,
    init: init
};