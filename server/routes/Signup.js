const express = require('express');
const routes = express.Router();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
routes.use(bodyParser.json());
const bcrypt = require('bcrypt');
routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());
const MongoClient = require('mongodb');
const assert = require('assert');
const dbName = 'portal';
const cors = require('cors');
routes.use(cors());
const url = 'mongodb://localhost:27017';

routes.post('/', (req, res) => {
  console.log(req.body);

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'aayushgarg21@gmail.com',
      pass: 'shrutisis'
    }
  });
  
  var mailOptions = {
    from: 'aayushgarg21@gmail.com',
    to: req.body.email,
    subject: 'Password',
    text: req.body.password,
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log(Done);
    }
  });
  const user = {};
  user.email = req.body.email;
  user.role = req.body.role;
  const password = bcrypt.hashSync(req.body.password, 8);
  user.password = password;
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);

    const db = client.db(dbName);
    function insertDocuments(db, callback) {
      const collection = db.collection('register');
      collection.insertMany(
        [user], (err, result) => {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          assert.equal(1, result.ops.length);
          callback(result);

          res.status(200).json({
            email: user.email,
            organisationName: user.organisationName,
          });
        },
      );
    }

    function findDocuments(db) {
      const collection = db.collection('register');
      collection.find({ $or: [ { email: req.body.email }] })
        .toArray((err, docs) => {
          assert.equal(err, null);
          if (docs.length < 1) {
            insertDocuments(db, () => {
              client.close();
            });
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