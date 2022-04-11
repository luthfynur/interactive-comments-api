const { Comments } = require('../models/Comment');
const mongoose = require('mongoose');

const deleteReply = async (req, res) => {
  if (!req.currentUser.id) {
    return res.status(401).send({
      error: {
        message: 'Tidak diizinkan',
      },
    });
  }

  const comment = await Comments.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId(req.params.id),
    },
    {
      $pull: {
        replies: { _id: mongoose.Types.ObjectId(req.params.replyId) },
      },
    }
  );

  comment.save();
  res.send({ comment });
};

module.exports = deleteReply;
