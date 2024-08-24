import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {addArticle, deleteArticle, fetchArticleById, fetchNews} from '../app/thunks';
import {RootState} from '../app/store';

export interface Article {
  id: string;
  name: string;
  text: string;
  image: string | null;
  createdAt: string;
}

interface NewsState {
  news: Article[];
  currentArticle: Article | null;
  isLoading: boolean;
  error: boolean;
}

const initialState: NewsState = {
  news: [],
  currentArticle: null,
  isLoading: false,
  error: false,
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.isLoading = false;
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });

    builder
      .addCase(fetchArticleById.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(fetchArticleById.fulfilled, (state, action: PayloadAction<Article>) => {
        state.isLoading = false;
        state.currentArticle = action.payload;
      })
      .addCase(fetchArticleById.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });

    builder
      .addCase(addArticle.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(addArticle.fulfilled, (state, action: PayloadAction<Article>) => {
        state.news.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addArticle.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });

    builder
      .addCase(deleteArticle.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(deleteArticle.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.news = state.news.filter(article => article.id !== action.payload);
      })
      .addCase(deleteArticle.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const selectNews = (state: RootState) => state.news.news;
export const selectCurrentArticle = (state: RootState) => state.news.currentArticle;
export const selectIsNewsLoading = (state: RootState) => state.news.isLoading;
export const selectError = (state: RootState) => state.news.error;

export const newsReducer = newsSlice.reducer;