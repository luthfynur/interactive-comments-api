const { Comments } = require('../models/Comment');
const { validationResult } = require('express-validator');

const editComment = async (req, res) => {
  const { comments } = req.body;
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

  const comment = await Comments.findById(req.params.id);

  if (comment.userId.toString() !== req.currentUser.id) {
    console.log(comment.userId);
    return res.status(401).send({
      error: {
        message: 'Akses tidak diizinkan',
      },
    });
  }

  await comment.update({ $set: { comments: comments } });
  await comment.save();

  res.send(comment);
};

module.exports = editComment;
