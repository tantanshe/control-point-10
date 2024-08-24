import express from 'express';
import fileDb from '../fileDb';
import {Comment} from '../types';

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res) => {
  const {news_id} = req.query;
  let comments = await fileDb.getComments();
  if (news_id) {
    comments = comments.filter(comment => comment.articleId === news_id);
  }
  res.send(comments);
});

commentsRouter.post('/', async (req, res) => {
  const {articleId, text} = req.body;
  if (!articleId || !text) {
    return res.status(400).send({error: 'ArticleId and Text are required.'});
  }
  const comment: Comment = {
    articleId,
    author: req.body.author || 'Anonymous',
    text,
  };
  const savedComment = await fileDb.addComment(comment);
  res.send(savedComment);
});

commentsRouter.delete('/:id', async (req, res) => {
  const {id} = req.params;
  try {
    await fileDb.deleteComment(id);
    res.send({message: 'Comment is deleted'});
  } catch (error) {
    res.status(404).send({error: 'Comment is not found'});
  }
});

export default commentsRouter;