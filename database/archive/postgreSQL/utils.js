const pool = require('./db.js');

const getDataFromDatabase = callback => {
  pool.query(`SELECT * FROM gallery`, (err, results) => {
    if (err) {
      console.error(err);
    } else {
      callback(null, results);
    }
  });
};

const getListingByID = (id, callback) => {
  pool.query(`SELECT * from gallery where id = ${id}`, (err, results) => {
    if (err) {
      console.error(err);
    } else {
      callback(null, results);
    }
  });
};


module.exports.getListingByID = getListingByID;
module.exports.getDataFromDatabase = getDataFromDatabase;