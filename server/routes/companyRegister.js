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

routes.post('/', (req, res) => {
  const company ={};
  company.company = req.body.company;
  company.title = req.body.special;
  company.description  = req.body.description;
  MongoClient.connect(url, function(err, client) {
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    function insertDocuments(db) {
      const collection = db.collection('company');
      collection.insertMany(
        [company], (err, result) => {
         
        },
      );
    }
    function findDocuments(db) {
        const collection = db.collection('company');
        collection.find({ company : req.body.company}).toArray((err, docs) => {
          assert.equal(err, null);
          if (docs.length < 1) {
            
            insertDocuments(db, () => {
                client.close();
              });
              res.send({message : "done"})
          } else {
            res.json({ message: 'failed' });

            }
        });
      }
      findDocuments(db, () => {
      client.close();
    });
});
});

module.exports = routes;