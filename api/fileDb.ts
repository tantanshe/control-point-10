import {promises as fs} from 'fs';
import path from 'path';
import {Article, Comment} from './types';

const newsFileName = path.join('./db', 'news.json');
const commentsFileName = path.join('./db', 'comments.json');

let news: Article[] = [];
let comments: Comment[] = [];

const fileDb = {
  async init() {
    try {
      const newsContents = await fs.readFile(newsFileName);
      news = JSON.parse(newsContents.toString());
    } catch (e) {
      news = [];
    }

    try {
      const commentsContents = await fs.readFile(commentsFileName);
      comments = JSON.parse(commentsContents.toString());
    } catch (e) {
      comments = [];
    }
  },

  async getNews() {
    return news;
  },

  async addArticle(article: Article) {
    const id = crypto.randomUUID();
    const datetime = new Date().toISOString();
    const newArticle = {
      id,
      ...article,
      datetime
    };
    news.push(newArticle);
    await this.saveNews();
    return newArticle;
  },

  async deleteArticle(id: string) {
    const index = news.findIndex(art => art.id === id);
    if (index !== -1) {
      const deleted = news.splice(index, 1)[0];
      await this.saveNews();
      return deleted;
    }
    throw new Error('Article not found');
  },

  async getComments() {
    return comments;
  },

  async addComment(comment: Comment) {
    const id = crypto.randomUUID();
    const newComment = {
      id,
      ...comment
    };
    comments.push(newComment);
    await this.saveComments();
    return newComment;
  },

  async deleteComment(id: string) {
    const index = comments.findIndex(com => com.id === id);
    if (index !== -1) {
      const deleted = comments.splice(index, 1)[0];
      await this.saveComments();
      return deleted;
    }
    throw new Error('Comment not found');
  },

  async getCommentsByNewsId(articleId: string) {
    const comments: Comment[] = await this.getComments();
    return comments.filter(comment => comment.articleId === articleId);
  },

  async saveNews() {
    await fs.writeFile(newsFileName, JSON.stringify(news, null, 2));
  },

  async saveComments() {
    await fs.writeFile(commentsFileName, JSON.stringify(comments, null, 2));
  },
};

export default fileDb;
