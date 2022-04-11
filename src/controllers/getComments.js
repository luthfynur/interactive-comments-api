const { Comments } = require('../models/Comment');

const getComments = async (req, res) => {
  try {
    const comments = await Comments.find()
      .populate('userId', 'username')
      .populate({
        path: 'replies',
        populate: { path: 'userId', select: '-password -__v' },
      });
    res.send(comments);
  } catch (err) {
    console.log(err);
    res.send({
      error: {
        message: 'Gagal mendapatkan data',
      },
    });
  }
};

module.exports = getComments;
