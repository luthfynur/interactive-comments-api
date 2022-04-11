const { Comments } = require('../models/Comment');
const mongoose = require('mongoose');

const downVoteComments = async (req, res) => {
  try {
    const upVotedComment = await Comments.findOne({
      _id: mongoose.Types.ObjectId(req.params.id),
      // upVote: {
      //   $elemMatch: { userId: mongoose.Types.ObjectId(req.currentUser.id) },
      // },
    });

    // const downVotedComment = await Comments.findOne({
    //   _id: mongoose.Types.ObjectId(req.params.id),
    //   downVote: {
    //     $elemMatch: { userId: mongoose.Types.ObjectId(req.currentUser.id) },
    //   },
    // });

    if (upVotedComment) {
      await Comments.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(req.params.id),
        },
        {
          $pull: {
            upVote: { userId: mongoose.Types.ObjectId(req.currentUser.id) },
          },
        }
      );

      await Comments.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(req.params.id),
        },
        {
          $pull: {
            downVote: { userId: mongoose.Types.ObjectId(req.currentUser.id) },
          },
        }
      );
    }

    // if (downVotedComment) {
    //   await Comments.findOneAndUpdate(
    //     {
    //       id: mongoose.Types.ObjectId(req.params.id),
    //     },
    //     {
    //       $pull: {
    //         downVote: { userId: mongoose.Types.ObjectId(req.currentUser.id) },
    //       },
    //     }
    //   );

    //   return res.send({});
    // }

    const comment = await Comments.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(req.params.id),
      },
      {
        $push: {
          downVote: [{ userId: mongoose.Types.ObjectId(req.currentUser.id) }],
        },
      }
    );

    await comment.save();
    res.send(comment);
  } catch (err) {
    console.log(err);
    res.send({
      error: {
        message: 'Gagal upvote',
      },
    });
  }
};

module.exports = downVoteComments;
