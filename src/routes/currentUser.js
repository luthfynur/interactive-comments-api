const express = require('express');
const router = express.Router();
const { currentUser } = require('../middlewares/currentUser');
const { requireAuth } = require('../middlewares/requireAuth');

router.get('/api/user/current-user', currentUser, (req, res) => {
  res.send({
    currentUser: req.currentUser || null,
  });
});

module.exports = { currentUserRouter: router };
