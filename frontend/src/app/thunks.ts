import {createAsyncThunk} from '@reduxjs/toolkit';
import {Article, Comment} from '../types';
import axiosApi from '../axiosApi';

export const fetchNews = createAsyncThunk<Article[]>('news/fetchNews', async () => {
  const {data} = await axiosApi.get('/news');
  return data;
});

export const fetchArticleById = createAsyncThunk<Article, string>(
  'news/fetchArticleById',
  async (id: string) => {
    const {data} = await axiosApi.get(`/news/${id}`);
    return data;
  }
);

export const addArticle = createAsyncThunk<Article, FormData>(
  'news/addArticle',
  async (formData: FormData) => {
    const response = await axiosApi.post('/news', formData, {
      headers: {'Content-Type': 'multipart/form-data'}
    });
    return response.data as Article;
  }
);

export const deleteArticle = createAsyncThunk<string, string>(
  'news/deleteArticle',
  async (id: string) => {
    await axiosApi.delete(`/news/${id}`);
    return id;
  }
);

export const fetchComments = createAsyncThunk<Comment[], string | undefined>(
  'comments/fetchComments',
  async (articleId?: string) => {
    const response = await axiosApi.get('/comments', {
      params: articleId ? {news_id: articleId} : {}
    });
    return response.data;
  }
);

export const addComment = createAsyncThunk<Comment, { articleId: string; text: string; author?: string }>(
  'comments/addComment',
  async ({articleId, text, author}) => {
    const commentData = {articleId, text, author: author || 'Anonymous'};
    const response = await axiosApi.post('/comments', commentData);
    return response.data;
  }
);

export const deleteComment = createAsyncThunk<string, string>(
  'comments/deleteComment',
  async (id: string) => {
    await axiosApi.delete(`/comments/${id}`);
    return id;
  }
);