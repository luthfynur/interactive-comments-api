const { Comments } = require('../models/Comment');
const mongoose = require('mongoose');

const deleteComment = async (req, res) => {
  const comment = await Comments.findById(req.params.id);

  if (comment.userId.toString() !== req.currentUser.id) {
    return res.status(401).send({
      error: {
        message: 'Akses tidak diizinkan',
      },
    });
  }

  await Comments.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) });

  res.send({});
};

module.exports = deleteComment;
