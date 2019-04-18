// const db = require('./sqlite.js');
const db = require('./mongoDB/db.js');

// const getDataFromDatabase = callback => {
//   db.all(`SELECT * FROM gallery`, (err, results) => {
//     if (err) {
//       console.error(err);
//     } else {
//       callback(null, results);
//     }
//   });
// };

// const getListingByID = (id, callback) => {
//   db.all(`SELECT * from gallery where id = ${id}`, (err, results) => {
//     if (err) {
//       console.error(err);
//     } else {
//       callback(null, results);
//     }
//   });
// };

const getListingByID = (id, callback) => {
  db.find({id: id}).exec(callback);
}

console.log('utils.js is being ran');

// module.exports.getDataFromDatabase = getDataFromDatabase;
module.exports.getListingByID = getListingByID;
