const { Comments } = require('../models/Comment');
const mongoose = require('mongoose');

const downVoteReply = async (req, res) => {
  try {
    const upVotedReply = await Comments.findOne({
      _id: mongoose.Types.ObjectId(mongoose.Types.ObjectId(req.params.id)),
    });

    if (upVotedReply) {
      await Comments.updateOne(
        {
          id: mongoose.Types.ObjectId(req.params.id),
        },
        {
          $pull: {
            'replies.$[replies].upVote': {
              userId: mongoose.Types.ObjectId(req.currentUser.id),
            },
          },
        },
        {
          arrayFilters: [
            {
              'replies._id': mongoose.Types.ObjectId(req.params.replyId),
            },
          ],
        }
      );

      await Comments.updateOne(
        {
          id: mongoose.Types.ObjectId(req.params.id),
        },
        {
          $pull: {
            'replies.$[replies].downVote': {
              userId: mongoose.Types.ObjectId(req.currentUser.id),
            },
          },
        },
        {
          arrayFilters: [
            {
              'replies._id': mongoose.Types.ObjectId(req.params.replyId),
            },
          ],
        }
      );
    }

    //Kode bener
    await Comments.updateOne(
      {
        _id: mongoose.Types.ObjectId(req.params.id),
      },
      {
        $push: {
          'replies.$[replies].downVote': {
            userId: mongoose.Types.ObjectId(req.currentUser.id),
          },
        },
      },
      {
        arrayFilters: [
          {
            'replies._id': mongoose.Types.ObjectId(req.params.replyId),
          },
        ],
      }
    );

    res.send({ success: 'Sukses Vote2' });
  } catch (err) {
    console.log(err);
    res.send({
      error: {
        message: 'Gagal downvote',
      },
    });
  }
};

module.exports = downVoteReply;
