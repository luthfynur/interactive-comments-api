const mongoose = require('mongoose');
const moment = require('moment');

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  comments: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  upVote: [
    {
      userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
  downVote: [
    {
      userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
  replies: [
    {
      userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
      date: {
        type: Date,
      },
      comments: {
        type: String,
      },
      upVote: [
        {
          userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
          },
        },
      ],
      downVote: [
        {
          userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
          },
        },
      ],
    },
  ],
});

const Comments = mongoose.model('Comment', commentSchema);

module.exports = { Comments };
