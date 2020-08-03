const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  const queryString = `SELECT * FROM movies ORDER BY id;`;

  pool
    .query(queryString)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.get('/details/:id', (req, res) => {
  const queryString = `SELECT movies.id, movies.title, movies.poster, movies.description, array_agg(genres.name) as genres FROM movies
    LEFT JOIN movies_genres ON movies.id=movies_genres.movie_id
    LEFT JOIN genres ON movies_genres.genere_id=genres.id
    WHERE movies.id=$1 GROUP BY movies.id;`;

  pool
    .query(queryString, [req.params.id])
    .then((response) => {
      const movieObject = response.rows[0];
      if (movieObject.genres[0] === null) {
        movieObject.genres = [];
      }
      res.send(movieObject);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.put('/update/:id', (req, res) => {
  const queryString = `UPDATE movies SET title=$1, description=$2 WHERE id=$3`;

  pool
    .query(queryString, [req.body.title, req.body.description, req.params.id])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
