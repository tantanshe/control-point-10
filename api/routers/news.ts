import express from 'express';
import fileDb from '../fileDb';
import {Article} from '../types';
import {imagesUpload} from '../multer';

const newsRouter = express.Router();

newsRouter.get('/', async (_req, res) => {
  const news = await fileDb.getNews();
  const response = news.map(article => ({
    id: article.id,
    name: article.name,
    image: article.image,
    createdAt: article.createdAt,
  }));
  res.send(response);
});

newsRouter.get('/:id', async (req, res) => {
  const {id} = req.params;
  const news = await fileDb.getNews();
  const article = news.find(art => art.id === id);
  if (article) {
    res.send(article);
  } else {
    res.status(404).send({error: 'Article not found'});
  }
});

newsRouter.post('/', imagesUpload.single('image'), async (req, res) => {
  const {name, text} = req.body;
  if (!name || !text) {
    return res.status(400).send({error: 'Name and Text are required.'});
  }
  const article: Article = {
    name,
    text,
    image: req.file ? req.file.filename : null,
    createdAt: new Date().toISOString(),
  };
  const newArticle = await fileDb.addArticle(article);
  res.send(newArticle);
});

newsRouter.delete('/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const deletedArticle = await fileDb.deleteArticle(id);
    if (!deletedArticle) {
      return res.status(404).send({error: 'Article not found'});
    }
    const relatedComments = await fileDb.getCommentsByNewsId(id);
    for (const comment of relatedComments) {
      if (comment.id) {
        await fileDb.deleteComment(comment.id);
      }
    }
    res.send({message: 'Article and its comments are deleted'});
  } catch (error) {
    res.status(500).send({error: 'Internal Server Error'});
  }
});

export default newsRouter;