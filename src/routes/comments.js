const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middlewares/requireAuth');
const { body } = require('express-validator');
const { currentUser } = require('../middlewares/currentUser');
const addComment = require('../controllers/addComment');
const deleteComment = require('../controllers/deleteComment');
const editComment = require('../controllers/editComment');
const getComments = require('../controllers/getComments');
const upVoteComments = require('../controllers/upVoteComments');
const downVoteComments = require('../controllers/downVoteComments');

router.get('/api/comments', getComments);

router.post(
  '/api/comments/',
  requireAuth,
  currentUser,
  [
    body('comments').notEmpty().withMessage('Komentar tidak boleh kosong'),
    body('comments').isString().withMessage('Komentar tidak valid'),
  ],
  addComment
);

router.delete('/api/comments/:id', requireAuth, currentUser, deleteComment);

router.put(
  '/api/comments/:id',
  requireAuth,
  currentUser,
  [
    body('comments').notEmpty().withMessage('Komentar tidak boleh kosong'),
    body('comments').isString().withMessage('Komentar tidak valid'),
  ],
  editComment
);

router.put(
  '/api/comments/:id/upvote',
  requireAuth,
  currentUser,
  upVoteComments
);

router.put(
  '/api/comments/:id/downvote',
  requireAuth,
  currentUser,
  downVoteComments
);

module.exports = { commentsRouter: router };
