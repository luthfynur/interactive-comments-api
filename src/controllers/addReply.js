const { Comments } = require('../models/Comment');
const { validationResult } = require('express-validator');

const addReply = async (req, res) => {
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
  const { comments, date } = req.body;

  const comment = await Comments.findOneAndUpdate(
    { _id: req.params.id },
    {
      $push: {
        replies: [
          { userId: req.currentUser.id, comments: comments, date: date },
        ],
      },
    }
  );

  await comment.save();

  res.send(comment);
};

module.exports = addReply;
