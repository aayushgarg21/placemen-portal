const express = require('express');

const routes = express.Router();
const bodyParser = require('body-parser');

routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());
const MongoClient = require('mongodb');
const assert = require('assert');

const dbName = 'portal';
const url = 'mongodb://localhost:27017';




routes.post('/', (req, res) => {
    
    var list =  [];
    const email = req.body.email;
    console.log(req.body.email);
    MongoClient.connect(url, (err, client) => {
        assert.equal(null, err);
    const db = client.db(dbName);
    function updateDocument(db, callback) {
        const collection = db.collection('job');
        collection.updateOne({ $and: [ {title : req.body.title }, {company : req.body.company }]} 
          , { $set: { student : list } }, function(err, result) {
          console.log("Updated the document with the field a equal to 2");
          callback(result);
        });
      }
    function findDocuments(db) {
        const collection = db.collection("job");
        collection.find({ $and: [ {title : req.body.title }, {company : req.body.company } ] }).toArray((err, docs) => {
          assert.equal(err, null);
          list =  docs[0].student;
           console.log(list);
           list.push(req.body.email);
          updateDocument(db, () => {
            client.close();
          });
          
        });
    }
    findDocuments(db, () => {
        client.close();
      });
    });
});

module.exports = routes;