const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middlewares/requireAuth');
const { body } = require('express-validator');
const { currentUser } = require('../middlewares/currentUser');
const addReply = require('../controllers/addReply');
const editReply = require('../controllers/editReply');
const deleteReply = require('../controllers/deleteReply');
const upVoteReply = require('../controllers/upVoteReply');
const downVoteReply = require('../controllers/downVoteReply');

router.post(
  '/api/comments/:id/replies',
  requireAuth,
  currentUser,
  [
    body('comments').notEmpty().withMessage('Balasan tidak boleh kosong'),
    body('comments').isString().withMessage('Balasan tidak valid'),
  ],
  addReply
);

router.put(
  '/api/comments/:id/replies/:replyId',
  requireAuth,
  currentUser,
  [
    body('comments').notEmpty().withMessage('Balasan tidak boleh kosong'),
    body('comments').isString().withMessage('Balasan tidak valid'),
  ],
  editReply
);

router.delete(
  '/api/comments/:id/replies/:replyId',
  requireAuth,
  currentUser,
  deleteReply
);

router.put(
  '/api/comments/:id/replies/:replyId/upvote',
  requireAuth,
  currentUser,
  upVoteReply
);

router.put(
  '/api/comments/:id/replies/:replyId/downvote',
  requireAuth,
  currentUser,
  downVoteReply
);

module.exports = { repliesRouter: router };
