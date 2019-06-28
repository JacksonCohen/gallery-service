const dotenv = require('dotenv').config();
const path = require('path');
const cors = require('cors');
const express = require('express');
const port = process.env.PORT || 3010;
const { getListingByID } = require('../database/mongoDB/utils.js');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '../client/dist/')));

app.get(`/${process.env.LOADER_IO_KEY}`, (req, res) => {
  res.sendFile(path.join(__dirname, `../public/${process.env.LOADER_IO_KEY}`));
});

app.get('/:number', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.get('/api/:id', (req, res) => {
  getListingByID(req.params.id, (err, results) => {
    if (err) {
      console.error(err, 'Error querying database...');
    } else {
      res.send(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Connected to Express server on port ${port}`);
});