const express = require('express')
const app = express()
const port = process.env.PORT || 4000;
const cors = require("cors")

app.use(express.json());
app.use(cors());

const ObjectId = require('mongodb').ObjectId 
const MongoClient = require ('mongodb').MongoClient;
const assert = require('assert');

const url = "mongodb+srv://admin1:gFJjXly9Cif7eXPA@cluster0-iurxe.mongodb.net/bookclub?retryWrites=true&w=majority"
const dbName = "bookclub";

  app.post('/', function(req, res) {
      input = req.body
      MongoClient.connect(url, {useNewUrlParser: true }, function(err, client) {
          assert.equal(null, err);
          const db = client.db(dbName);
          insertDocuments(db, function(){
              client.close();
          });
      });

      const insertDocuments = function(db, callback){
      const collection = db.collection('first app');
      collection.insertOne( input , function(err, result) {
          callback(result);
      });
    }
  return res.send(input)
})

    app.get('/', function (req, res) {
        MongoClient.connect(url, {useNewUrlParser: true }, function(err, client) {
          assert.equal(null, err);
          console.log("Connected successfully to server");
          
          const db = client.db(dbName);
          const collection = db.collection('first app');
         
          // Find some documents
         
          collection.find().toArray(function(err, docs) {
            assert.equal(err, null);
            
            res.send(docs);
            } 
          ); 
        }) 
      }) 


  // the right one that works!!! hallejiuah thank the lordf
      app.delete('/:_id', (req, res) => {
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
          if (err) throw err;
          const db = client.db(dbName);
          db.collection("first app").deleteOne({_id: ObjectId(req.params._id)}, function(err, res) {
            if (err) throw err;
            console.log("1 document deleted");
            // db.close();
          });
        });
        res.send("running the a delete test")
      })

      

app.listen(port, () => console.log(`Example app listening on port ${port}!`))