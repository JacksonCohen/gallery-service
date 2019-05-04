require('newrelic');
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const port = process.env.PORT || 3010;
const { getListingByID } = require('../database/mongoDB/utils.js');
// const { pool } = require('../database/postgreSQL/db.js');
// const { getDataFromDatabase, getListingByID } = require('../database/postgreSQL/utils.js');

const app = express();

// app.use(morgan('dev'));
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/dist/')));

app.get(`/${process.env.LOADER_IO_KEY}`, (req, res) => {
  res.sendFile(path.join(__dirname, `../public/${process.env.LOADER_IO_KEY}`));
});

app.get('/:number', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// NoSQL Database
app.get('/api/:id', (req, res) => {
  getListingByID(req.params.id, (err, results) => {
    if (err) console.error(err, 'Error querying database...');
    else res.send(results);
  });
});

// SQL Database
// app.get('/api/:id', (req, res) => {
//   pool.connect((err, client, done) => {
//     if (err) throw err;
//     else getListingByID(req.params.id, (err, results) => {
//       console.log(results)
//       // res.send(results);
//     });
//     // client.query('SELECT * FROM users WHERE id = $1', [1], (err, res) => {
//     //   done()
//     //   if (err) {
//     //     console.log(err.stack)
//     //   } else {
//     //     console.log(res.rows[0])
//     //   }
//     })
//   })
// });

app.listen(port, () => {
  console.log(`Connected to Express server on port ${port}`);
});