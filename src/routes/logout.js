const express = require('express');
const router = express.Router();

router.post('/api/user/logout', (req, res) => {
  req.session = null;
  res.send({});
});

module.exports = { logoutRouter: router };
