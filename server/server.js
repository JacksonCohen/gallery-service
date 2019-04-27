require('newrelic');
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const morgan = require('morgan');
// const { pool } = require('../database/postgreSQL/db.js');
// const { getDataFromDatabase, getListingByID } = require('../database/postgreSQL/utils.js');

const app = express();

app.use(cors());
// app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client/dist/')));

app.get(`${process.env.LOADER_IO_KEY}`, (req, res) => {
  res.sendFile(path.join(__dirname, `../public/${process.env.LOADER_IO_KEY}`));
});

app.get('/:number', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// NoSQL Database
app.get('/api/:id', (req, res) => {
  axios.get(`http://3.14.148.222:3010/api/${req.params.id}`)
  // axios.get('http://localhost:3011/api/:id')
    .then((results) => res.send(results.data))
    .catch(err => console.error(err));
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

const port = process.env.PORT || 3010;
app.listen(port, () => {
  console.log(`Connected to Express server on port ${port}`);
});
