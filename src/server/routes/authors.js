const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  //res.header('Access-Control-Allow-Headers', 'Content-Type');
  const renderObject = {};
  renderObject.title = 'Authors';
  db.any('SELECT * FROM authors')
  .then((results) => {
    renderObject.authors = results;
    res.status(200).send({
      status: 'success',
      data: renderObject;
    });
    //renderObject.authors = results;
    //res.render('authors.html', renderObject);
  })
  .catch((error) => {
    next(error);
  });

  db.any('SELECT * from books JOIN books_authors on books.id = books_authors.book_id')
  .then((results) => {
    renderObject.joins = results;
    res.render('authors.html', renderObject);
  })
  .catch((error) => {
    next(error);
  });
});

router.get('/new', (req, res, next) => {
  res.render('newauthor.html');

});

router.get('/:id', (req, res, next) => {
  const authorID = parseInt(req.params.id);
  db.any(`SELECT * FROM authors WHERE id = ${authorID}`)
    .then((result) => {
      if (result.length) {
        res.send(result[0]);
      } else {
        res.status(404).send({
          status: 'error',
          message: 'That author doesn\'t exist'
        });
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/searchAuthor', (req, res, next) => {
  const searchAuthor = req.body.searchAuthor;
  db.any(`SELECT * FROM authors WHERE first_name LIKE '%$1#%' OR last_name LIKE '%$1#%'`, searchAuthor)
    .then((results) => {
      if (results.length) {
        const renderObject = {};
        renderObject.authors = results;
        res.render('authors.html', renderObject);
      } else {
        res.status(404).send({
          status: 'error',
          message: 'That author doesn\'t exist'
        });
      }
    })
    .catch((error) => {
      next(error);
    });
});

// http POST localhost:3000/api/v1/authors/ first_name=Alex last_name=Nye biography=nothing portrait=horrid
router.post('/', (req, res, next) => {
  const newAuthor = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    biography: req.body.biography,
    portrait: req.body.portrait
  };
  db.any(`INSERT INTO authors (first_name, last_name, biography, portrait) VALUES('${newAuthor.first_name}', '${newAuthor.last_name}', '${newAuthor.biography}', '${newAuthor.portrait}')`)
  .then((result) => {
    res.send('You added an author!');
  })
  .catch((error) => {
    next(error);
  });
});

// http PUT localhost:3000/api/v1/authors/10 first_name=AlexCh last_name=NyeCh biography=nothingCh portrait=horridCh
router.put('/:id', (req, res, next) => {
  const authorID = parseInt(req.params.id);
  const updateAuthor = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    biography: req.body.biography,
    portrait: req.body.portrait
  };

  db.tx(t=> {
          return t.batch([
              t.any(`UPDATE authors SET first_name = '${updateAuthor.first_name}' WHERE id = ${authorID}`, [true]),
              t.any(`UPDATE authors SET last_name = '${updateAuthor.last_name}' WHERE id = ${authorID}`, [true]),
              t.any(`UPDATE authors SET biography = '${updateAuthor.biography}' WHERE id = ${authorID}`, [true]),
              t.any(`UPDATE authors SET portrait = '${updateAuthor.portrait}' WHERE id = ${authorID}`, [true])
          ]);
      })
      .then(result=> {
        if (!result.length) {
          res.status(404).send({
            status: 'error',
            message: 'That author doesn\'t exist'
          });
        } else {
          res.send('You updated an author!');
        }
      })
      .catch((error) => {
        next(error);
      });
    });

router.delete('/:id', function (req, res, next) {
  const authorID = parseInt(req.params.id);

  db.any(`DELETE FROM authors WHERE id = ${authorID}`, [true])
   .then(function (data) {
    console.log(data);
    res.send(data);
  })
   .catch(function (error) {
    next(error);
  });
});

module.exports = router;
