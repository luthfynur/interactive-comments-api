const { Comments } = require('../models/Comment');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const editReply = async (req, res) => {
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

  const { comments } = req.body;

  if (!req.currentUser.id) {
    return res.status(401).send({
      error: {
        message: 'Tidak diizinkan',
      },
    });
  }

  const updatedReply = await Comments.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId(req.params.id),
    },
    { $set: { 'replies.$[id].comments': comments } },
    {
      arrayFilters: [
        {
          'id._id': mongoose.Types.ObjectId(req.params.replyId),
        },
      ],
    }
  );

  updatedReply.save();
  res.send(updatedReply);
};

module.exports = editReply;
