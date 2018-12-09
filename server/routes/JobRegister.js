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
  const job ={};
  job.company = req.body.company;
  job.title = req.body.title;
  job.description  = req.body.description;
  job.salary = req.body.salary;
  console.log(job);

  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    function insertDocuments(db) {
      const collection = db.collection('job');
      collection.insertMany(
        [job], (err, result) => {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          assert.equal(1, result.ops.length);
        },
      );
    }
    insertDocuments(db, () => {
      client.close();
    });
   
    client.close();
    res.json({message : "done"});
  });
});

module.exports = routes;