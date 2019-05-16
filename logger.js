const utils = require('./utils');
let date = new Date();

let loguser = (action, status, username, time = date.toString()) => {
    let log = {time:time, user:username, action:action, status:status};
    let db = utils.getDb();
    db.collection("logs").findOne({type: "authentications"}, (err, result) => {
        if (err)
            console.log(err);
        else {
            let logs = result.logs;
            if (logs){
                if (logs.length === 1000)
                    logs.pop();
                logs.unshift(log);
            } else {
                logs = [log];
            }
            db.collection("logs").updateOne({
                type: "authentications"
            }, {
                $set:{
                    logs: logs
                }
            }, (err, check) => {
                if (err)
                    console.log(err);
            });
        }
    });
};


let logDB = (action, username, status = "Success", time = date.toString()) => {
    if(!username)
        username = "Visitor";
    let log = {time:time, user:username, action:action, status:status};
    let db = utils.getDb();
    db.collection("logs").findOne({type: "database"}, (err, result) => {
        if (err)
            console.log(err);
        else {
            let logs = result.logs;
            if (logs){
                if (logs.length === 1000)
                    logs.pop();
                logs.unshift(log);
            } else {
                logs = [log];
            }
            db.collection("logs").updateOne({
                type: "database"
            }, {
                $set:{
                    logs: logs
                }
            }, (err, check) => {
                if (err)
                    console.log(err);
            });
        }
    });
};

module.exports = {
    loguser,
    logDB,
};