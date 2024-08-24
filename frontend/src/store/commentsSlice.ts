import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {addComment, deleteComment, fetchComments} from '../app/thunks';
import {RootState} from '../app/store';

export interface Comment {
  id: string;
  articleId: string;
  author: string;
  text: string;
}

interface CommentsState {
  comments: Comment[];
  isLoading: boolean;
  error: boolean;
}

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  error: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });

    builder
      .addCase(addComment.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(addComment.fulfilled, (state, action: PayloadAction<Comment>) => {
        state.comments.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addComment.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });

    builder
      .addCase(deleteComment.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.comments = state.comments.filter(comment => comment.id !== action.payload);
      })
      .addCase(deleteComment.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const selectComments = (state: RootState) => state.comments.comments;
export const selectIsCommentsLoading = (state: RootState) => state.comments.isLoading;
export const selectError = (state: RootState) => state.comments.error;

export const commentsReducer = commentsSlice.reducer;