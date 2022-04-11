const { Comments } = require('../models/Comment');
const { validationResult } = require('express-validator');

const addComment = async (req, res) => {
  const { comments, date } = req.body;

  const errors = validationResult(req).array();

  if (errors.length > 0) {
    return res.status(400).send({
      errors: errors.map((err) => {
        return {
          message: err.msg,
        };
      }),
    });
  }

  const comment = new Comments({
    userId: req.currentUser.id,
    comments: comments,
    date: date,
  });

  await comment.save();

  res.send(comment);
};

module.exports = addComment;
