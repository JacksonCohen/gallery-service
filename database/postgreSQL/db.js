const sqlite3 = require('sqlite3').verbose();
const images = require('../images.js');

const db = new sqlite3.Database('./database.sqlite', err => {
  if (err) {
    console.log('Error starting the SQLite database.');
  } else {
    console.log('Connected to SQLite database.');
  }
});

const randomImage = array => array[Math.floor(array.length * Math.random())];

db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS gallery`);
  db.run(`
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
    interior_8 VARCHAR(100),
    interior_9 VARCHAR(100),
    PRIMARY KEY (id)
   )`);

  const galleryInsert = db.prepare(`
    INSERT INTO gallery (exterior, google_maps, google_street, interior_1, interior_2, interior_3, interior_4, interior_5, interior_6, interior_7, interior_8, interior_9) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  async function seed() {
    let singleInsert = await galleryInsert.run(
      randomImage(images.exteriors),
      'https://storage.googleapis.com/zillow-listing-pictures/googlemaps_static.png',
      'https://storage.googleapis.com/zillow-listing-pictures/googlestreet_static.jpeg',
      randomImage(images.interiors),
      randomImage(images.interiors),
      randomImage(images.interiors),
      randomImage(images.interiors),
      randomImage(images.interiors),
      randomImage(images.interiors),
      randomImage(images.interiors),
      randomImage(images.interiors),
      randomImage(images.interiors)
    );

    return singleInsert;
  }

  for (let i = 0; i < 100; i++) {
    seed();
  }

  // for (let i = 0; i < 100; i++) {
  //   galleryInsert.run(
  //     randomImage(images.exteriors),
  //     'https://storage.googleapis.com/zillow-listing-pictures/googlemaps_static.png',
  //     'https://storage.googleapis.com/zillow-listing-pictures/googlestreet_static.jpeg',
  //     randomImage(images.interiors),
  //     randomImage(images.interiors),
  //     randomImage(images.interiors),
  //     randomImage(images.interiors),
  //     randomImage(images.interiors),
  //     randomImage(images.interiors),
  //     randomImage(images.interiors),
  //     randomImage(images.interiors),
  //     randomImage(images.interiors)
  //   );
  // }

  galleryInsert.finalize();
});

// db.close(err => {
//   if (err) {
//     console.log('Error closing SQLite database.');
//   } else {
//     console.log('Closed the SQLite database connection.');
//   }
// });

console.log('sqlite.js is being ran');
module.exports = db;


/*
const Sequelize = require('sequelize')
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/database.sqlite'
})

const images = require('./images.js')

const randomImage = (array) => array[(Math.floor((array.length) * Math.random() ))]

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to Sequelize database")
})

const Listing = sequelize.define('Listing', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  exterior: Sequelize.STRING,
  interior_1: Sequelize.STRING,
  interior_2: Sequelize.STRING,
  interior_3: Sequelize.STRING,
  interior_4: Sequelize.STRING,
  interior_5: Sequelize.STRING,
  interior_6: Sequelize.STRING,
  interior_7: Sequelize.STRING,
  interior_8: Sequelize.STRING,
  interior_9: Sequelize.STRING
})


for (let i = 0; i < 100; i++) {
  Listing.create({
    exterior: randomImage(images.exteriors),
    interior_1: randomImage(images.interors),
    interior_2: randomImage(images.interors),
    interior_3: randomImage(images.interors),
    interior_4: randomImage(images.interors),
    interior_5: randomImage(images.interors),
    interior_6: randomImage(images.interors),
    interior_7: randomImage(images.interors),
    interior_8: randomImage(images.interors),
    interior_9: randomImage(images.interors)
  })
}

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Sequelize Synced!")
  })
  
*/