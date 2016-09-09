const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', (req, res, next) => {
  db.any('SELECT * FROM books')
  .then((result) => {
    res.send(result);
  })
  .catch((error) => {
    next(error);
  });
});

router.get('/:id', (req, res, next) => {
  const booksID = parseInt(req.params.id);
  db.any(`SELECT * FROM books WHERE id = ${booksID}`)
    .then((result) => {
      if (result.length) {
        res.send(result[0]);
      } else {
        res.status(404).send({
          status: 'error',
          message: 'That book doesn\'t exist'
        });
      }
    })
    .catch((error) => {
      next(error);
    });
});

// http POST localhost:3000/api/v1/books/ title=Alex genre=Nye cover=nothing description=horrid last_name=Nye
router.post('/', (req, res, next) => {
  const newBook = {
    title: req.body.title,
    genre: req.body.genre,
    cover: req.body.cover,
    description: req.body.description,
    last_name: req.body.last_name
  };
  //--------------
  db.any(`INSERT INTO books (title, genre, cover, description) VALUES('${newBook.title}', '${newBook.genre}', '${newBook.cover}', '${newBook.description}')`)
  .then((result) => {
    //res.send('You added a book!');
  })
  .catch((error) => {
    next(error);
  });
  //-----------------
  db.task(t=> {
      return t.one('SELECT id FROM authors WHERE last_name = $1', newBook.last_name)
          .then(author => {
              return t.any('INSERT INTO books_authors (author_id, book_id) VALUES ($1,(SELECT MAX(id) FROM books))', author.id);
            });
    })
      .then(events=> {
          // success
          res.send('You added a book!');
        })
      .catch(error=> {
          // error
          next(error);
        });
});

//http --json PUT http://localhost:3000/api/v1/books/7 title=Alec
router.put('/:id', function (req, res, next) {
  const bookID = parseInt(req.params.id);
  const updateBook = {
    title: req.body.title,
    genre: req.body.genre,
    cover: req.body.cover,
    description: req.body.description
  };

  if (updateBook.title) {
    db.any(`UPDATE books SET title = '${updateBook.title}' WHERE id = ${bookID}`, [true])
      .then(function (data) {
        res.send(data);
      })
      .catch(function (error) {
        next(error);
      });
  }

  if (updateBook.genre) {
    db.any(`UPDATE books SET genre = '${updateBook.genre}' WHERE id = ${bookID}`, [true])
      .then(function (data) {
        res.send(data);
      })
      .catch(function (error) {
        next(error);
      });
  }

  if (updateBook.cover) {
    db.any(`UPDATE books SET cover = '${updateBook.cover}' WHERE id = ${bookID}`, [true])
      .then(function (data) {
        res.send(data);
      })
      .catch(function (error) {
        next(error);
      });
  }

  if (updateBook.description) {
    db.any(`UPDATE books SET description = '${updateBook.description}' WHERE id = ${bookID}`, [true])
      .then(function (data) {
        res.send(data);
      })
      .catch(function (error) {
        next(error);
      });
  }

});

router.delete('/:id', function (req, res, next) {
  const bookID = parseInt(req.params.id);
  db.any(`DELETE FROM books WHERE id = ${bookID}`, [true])
   .then(function (data) {
        console.log(data);
        res.send(data);
      })
   .catch(function (error) {
    next(error);
  });
});

module.exports = router;
