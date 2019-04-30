'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const movies = require('./movies.js');

app.use(morgan('common'));

app.use(cors());

app.use(helmet());

function validateBearerToken(req, res, next) {
  if (req.get('Authorization')) {
    let apiToken = process.env.API_TOKEN;
    let bearerToken = req.get('Authorization').split(' ')[1];
    if (bearerToken === apiToken) {
      next();
    } else {
      res.status(401).send('You are unauthorized to use this applicaton.');
    }
  } else {
    res.status(401).send('Api requires authorization.');
  }
}

app.get('/movie', validateBearerToken, (req, res) => {
  const { genre = '', avg_vote = '', country = '' } = req.query;
  let results = [];
  if (genre) {
    results = movies.filter(movie => movie.genre.includes(genre));
  } else {
    results = movies;
  }

  if (country) {
    results = movies.filter(movie => movie.country.includes(country));
    console.log(country);
  } else {
    results = movies;
  }

  if (avg_vote) {
    const userAvg_Vote = parseFloat(avg_vote);
    if (Number.isNaN(userAvg_Vote)) {
      res.status(400).send('Average vote must be a number');
    } else {
      results = movies.filter(movie => movie.avg_vote >= userAvg_Vote);
    }
  }

  res.json(results);
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});
