var express = require('express');
var router = express.Router();
const users = require('../services/user.service');

/* GET user by id */
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await users.getById(req.params.id));
  } catch (err) {
    console.error(`Error while getting user `, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});
/* GET user by name */
router.get('/username/:name', async function(req, res, next) {
  try {
    res.json(await users.getByUsername(req.params.name));
  } catch (err) {
    console.error(`Error while getting user' name`, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});
/* GET user by email */
router.get('/email/:email', async function(req, res, next) {
  try {
    res.json(await users.getByEmail(req.params.email));
  } catch (err) {
    console.error(`Error while getting user's email`, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});
/* GET users. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await users.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: err.message });
    next(err);
  }
});
/* POST user */
router.post('/', async function(req, res, next) {
    try {
      res.json(await users.create(req.body));
    } catch (err) {
      console.error(`Error while creating user`, err.message);
      // send error response if there was a problem
      res.status(500).json({ message: error.message });
      next(err);
    }
  });

/* PUT user */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await users.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating user`, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});

/* DELETE user */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await users.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting user`, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});

module.exports = router;