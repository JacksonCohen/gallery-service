const MongoClient = require('mongodb').MongoClient;
const url = `mongodb://${process.env.MONGO_DB}:27017`;
let db;

MongoClient.connect(url, { useNewUrlParser: true }, (err, database) => {
  if (err) throw err;
  db = database.db('gallery');
});

const getListingByID = (id, callback) => {
  db.collection('gallery').find({id: +id}).toArray((err, results) => {
    if (err) throw err;
    callback(null, results);
  });
}

module.exports.getListingByID = getListingByID;