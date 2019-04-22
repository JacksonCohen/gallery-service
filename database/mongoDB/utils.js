const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';


const getListingByID = (id, callback) => {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) throw err;
    db = client.db('gallery');
    db.collection('gallery').find({id: +id}).toArray((err, results) => {
      if (err) throw err;
      callback(null, results);
    });
  });
}


module.exports.getListingByID = getListingByID;