const images = require('../images.js');
const fs = require('fs');
const csv = require('fast-csv');
const pg = require('pg');
const config = require('../../config.js');

const pool = new pg.Pool(config);

const galleryTable = `
  CREATE TABLE IF NOT EXISTS gallery (
    id INTEGER NOT NULL,
    exterior VARCHAR(100),
    google_maps VARCHAR(100) NOT NULL,
    google_street VARCHAR(100) NOT NULL,
    interior_1 VARCHAR(100) NOT NULL,
    interior_2 VARCHAR(100) NOT NULL,
    interior_3 VARCHAR(100) NOT NULL,
    interior_4 VARCHAR(100) NOT NULL,
    interior_5 VARCHAR(100) NOT NULL,
    interior_6 VARCHAR(100) NOT NULL,
    interior_7 VARCHAR(100) NOT NULL,
    interior_8 VARCHAR(100) NOT NULL,
    interior_9 VARCHAR(100) NOT NULL
  )`

pool.query(galleryTable);  

const randomImage = array => array[Math.floor(array.length * Math.random())];
let userID1 = 0;
let userID2 = 5000000;

seed1 = () => {
  let photos = [];
  
  for (let i = 0; i < 5000000; i++) {
    userID1++;
    photos.push({
      id: userID1,
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
seed2 = () => {
  let photos = [];
  
  for (let i = 0; i < 5000000; i++) {
    userID2++;
    photos.push({
      id: userID2,
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

const ws1 = fs.createWriteStream('gallery1.csv');
const ws2 = fs.createWriteStream('gallery2.csv');

csv.write(seed1(), {headers: false}).pipe(ws1);
csv.write(seed2(), {headers: false}).pipe(ws2);

module.exports.pool = pool;