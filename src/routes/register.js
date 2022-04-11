const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { User } = require('../models/User');
const { Password } = require('../services/password');
const jwt = require('jsonwebtoken');

router.post(
  '/api/user/register',
  [
    body('username').notEmpty().withMessage('Username tidak boleh kosong'),
    body('username')
      .isLength({ min: 3 })
      .withMessage('Username minimal 3 karakter'),
    body('password').notEmpty().withMessage('Password tidak boleh kosong'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password minimal 8 karakter'),
  ],
  async (req, res) => {
    const { username, password } = req.body;
    const errors = validationResult(req).array();
    const hashedPassword = await Password.toHash(password);
    const existingUser = await User.findOne({ username: username });

    if (errors.length > 0) {
      return res.status(400).send({
        errors: errors.map((err) => {
          return {
            message: err.msg,
            field: err.param,
          };
        }),
      });
    }

    if (existingUser !== null) {
      return res.status(400).send({
        errors: [
          {
            code: 400,
            message: 'Username sudah digunakan',
          },
        ],
      });
    }

    const user = new User({
      username: username,
      password: hashedPassword,
    });

    await user.save();

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

    res.status(200).send(user);
  }
);

module.exports = { registerRouter: router };
