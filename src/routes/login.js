const express = require('express');
const router = express.Router();
const { Password } = require('../services/password');
const { User } = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/api/user/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });

  if (!user) {
    return res.status(400).send({
      error: {
        message: 'Username atau password salah',
      },
    });
  }

  const passwordsMatch = await Password.compare(user.password, password);

  if (!passwordsMatch) {
    return res.status(400).send({
      error: {
        message: 'Username atau password salah',
      },
    });
  }

  const userJWT = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_KEY
  );

  req.session = {
    jwt: userJWT,
  };

  res.send(user);
});

module.exports = { loginRouter: router };
