const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
let db = null;

//https://mlab.com/databases/cs480x-03/collections/test

let dbAcc = {
    getDB: () => {
        if (db == null) {
            MongoClient.connect('mongodb://group:password1@ds121475.mlab.com:21475/cs480x-03', (err, database) => {
                if (err) return console.log(err);
                db = database.db('cs480x\-03');
            });
        }
        return db;
    }
};




exports.dbAcc = dbAcc;