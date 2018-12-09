const express = require('express');
const routes = express.Router();
const bodyParser = require('body-parser');
routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());
const MongoClient = require('mongodb');
const assert = require('assert');
const dbName = 'portal';
const cors = require('cors');
routes.use(cors());
const url = 'mongodb://localhost:27017';

routes.get('/', (req, res) => {
       const job = [];
    MongoClient.connect(url, function(err, client) {
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        function findDocuments(db) {
            const collection = db.collection('job');
            collection.find({}).toArray((err, docs) => {
              assert.equal(err, null);
              res.send(docs);
            });
          }
          findDocuments(db, () => {
            client.close();
          });
          
        
    });
});

module.exports = routes;