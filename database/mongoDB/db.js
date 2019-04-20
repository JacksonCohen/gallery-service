const images = require('../images.js');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

let count = 0;
let userID = 0;

MongoClient.connect(url, { useNewUrlParser: true })
  .then(client => {
    console.log("Connected successfully to server");
    const db = client.db('gallery');

    let seedPhotos = () => {
      count++;
      db.collection('gallery').insertMany(seed())
      .then(() => {
        if (count < 2000) {
          seedPhotos();
        } else {
          db.collection('gallery').createIndex({id: 1});
          console.log('Gallery indexing in process!');
        }
      })
      .catch(err => console.log(err, 'Error seeding database!'))
    }
    seedPhotos();
  })
  .catch(err => console.log(err, 'Error connecting to database!'));

const randomImage = array => array[Math.floor(array.length * Math.random())];

function seed() {
  let photos = [];
  
  for (let i = 0; i < 5000; i++) {
    userID++;
    photos.push({
      id: userID,
      exterior: randomImage(images.exteriors),
      google_maps: 'https://storage.googleapis.com/zillow-listing-pictures/googlemaps_static.png',
      google_street: 'https://storage.googleapis.com/zillow-listing-pictures/googlestreet_static.jpeg',
      interior_1: randomImage(images.interiors),
      interior_2: randomImage(images.interiors),
      interior_3: randomImage(images.interiors),
      interior_4: randomImage(images.interiors),
      interior_5: randomImage(images.interiors),
      interior_6: randomImage(images.interiors),
      interior_7: randomImage(images.interiors),
      interior_8: randomImage(images.interiors),
      interior_9: randomImage(images.interiors)
    })
  }
  return photos;
}