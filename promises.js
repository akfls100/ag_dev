const utils = require('./utils.js');

// Populates message board page with the titles of each 
// message in the database
var messagePromise = () => {
    return new Promise((resolve, reject) => {
        var db = utils.getDb();

        db.collection('messages').find({
            type: 'thread'
        }, {
            _id: 0
        }).toArray((err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result.reverse());
        });
    });
};

// Retrieves thread details
var threadPromise = (param_id) => {
    return new Promise((resolve, reject) => {
        var db = utils.getDb();
        var ObjectId = utils.getObjectId();

        var query = {
            _id: ObjectId(param_id)
        };

        db.collection('messages').findOne(query, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};

// Retrieves all replies of a thread
var replyPromise = (param_id) => {
    return new Promise ((resolve, reject) => {
        var db = utils.getDb();

        db.collection('messages').find({
            thread_id: param_id
        }).toArray((err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};

module.exports = {
    messagePromise: messagePromise,
    threadPromise: threadPromise,
    replyPromise: replyPromise
};