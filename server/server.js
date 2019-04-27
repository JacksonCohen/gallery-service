require('newrelic');
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

app.get('/:number', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.get('/api', (req, res) => {
  axios.get('3.14.148.222/api')
  .then((results) => res.send(results))
  .catch(err => console.error(err));
});

// NoSQL Database
app.get('/api/:id', (req, res) => {
  axios.get('3.14.148.222/api/:id')
    .then((results) => res.send(results))
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
