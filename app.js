const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const movies = require('./movies.js')

app.use(morgan('common')); // let's see what 'common' format looks like
// genre
// country
// avg_vote
app.get('/movie', (req, res) => {
    const { genre = "", avg_vote ="", country=""} = req.query;

    let results = []
    if(genre) {
        results = movies.filter(movie => movie.genre.includes(genre) )
      } else
      {
        results = movies
      }


  
    res.json(results);
  });

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});