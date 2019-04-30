'use strict';
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const movies = require('./movies.js');

app.use(morgan('common')); // let's see what 'common' format looks like
// genre
// country
// avg_vote
app.get('/movie', (req, res) => {
  const { genre = '', avg_vote = '', country = '' } = req.query;
  console.log('parameters', req.params);
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
