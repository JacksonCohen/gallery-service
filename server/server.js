const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const { getDataFromDatabase, getListingByID } = require('../database/mongoDB/utils.js');
// const { pool } = require('../database/postgreSQL/db.js');
// const { getDataFromDatabase, getListingByID } = require('../database/postgreSQL/utils.js');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client/dist/')));

app.get('/:number', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.get('/api', (req, res) => {
  getDataFromDatabase((err, results) => {
    res.send(results);
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

// NoSQL Database
app.get('/api/:id', (req, res) => {
  console.log('made it here', req.params.id)
  getListingByID(req.params.id, (err, results) => {
    if (err) console.error('Error querying database...');
    else res.send(results);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Connected to Express server on Port 3000');
});
