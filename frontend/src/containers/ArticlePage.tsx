import {useEffect, useState} from 'react';
import {fetchComments, addComment, deleteComment, fetchArticleById} from '../app/thunks';
import {AppDispatch} from '../app/store';
import {Box, Typography, Button, CircularProgress, Divider, CardMedia, TextField} from '@mui/material';
import {Link, useParams} from 'react-router-dom';
import placeholder from '../assets/no-img.jpg';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {selectCurrentArticle} from '../store/newsSlice';
import {selectComments, selectError, selectIsCommentsLoading} from '../store/commentsSlice';

const placeholderImage = placeholder;

const ArticlePage = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const {id} = useParams<{ id: string }>();
  const currentArticle = useAppSelector(selectCurrentArticle);
  const comments = useAppSelector(selectComments);
  const isLoading = useAppSelector(selectIsCommentsLoading);
  const error = useAppSelector((selectError));

  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(fetchArticleById(id));
      dispatch(fetchComments(id));
    }
  }, [dispatch, id]);

  const handleAddComment = () => {
    if (id) {
      dispatch(addComment({articleId: id, text: commentText, author: commentAuthor}));
      setCommentText('');
      setCommentAuthor('');
    }
  };

  const handleDeleteComment = (commentId: string) => {
    dispatch(deleteComment(commentId));
  };

  if (isLoading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress/>
    </Box>
  );

  if (error) return <Typography>Error loading post or comments.</Typography>;

  return (
    <div>
      {currentArticle ? (
        <div>
          <Typography variant="h4">{currentArticle.name}</Typography>
          <Box display="flex" justifyContent="center" my={2}>
            <CardMedia
              component="img"
              image={currentArticle.image ? `http://localhost:8003/${currentArticle.image}` : placeholderImage}
              alt={currentArticle.name}
              sx={{width: '50%', height: 'auto'}}
            />
          </Box>
          <Typography variant="body1">{currentArticle.text}</Typography>
          <Divider sx={{my: 2}}/>
          <Typography variant="h6">Comments</Typography>
          {comments.length === 0 ? (
            <Typography>No comments yet.</Typography>
          ) : (
            comments.map((comment) => (
              <Box
                key={comment.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2,
                  p: 2,
                  border: '1px solid #A3A3A3FF',
                  borderRadius: '4px',
                  backgroundColor: '#ececec'
                }}
              >
                <Typography variant="body2" sx={{flexGrow: 1}}>
                  <strong>{comment.author}</strong>: {comment.text}
                </Typography>
                <Button variant="outlined" color="error" onClick={() => handleDeleteComment(comment.id)}>
                  Delete
                </Button>
              </Box>
            ))
          )}
          <Divider sx={{my: 2}}/>
          <Typography sx={{mt: 3}} variant="h6">Add a Comment</Typography>
          <TextField
            label="Your Name (optional)"
            variant="outlined"
            fullWidth
            value={commentAuthor}
            onChange={(e) => setCommentAuthor(e.target.value)}
            sx={{mb: 2}}
          />
          <TextField
            label="Comment"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            sx={{mb: 2}}
          />
          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" onClick={handleAddComment}>
              Submit Comment
            </Button>
          </Box>
        </div>
      ) : (
        <Typography>Post not found.</Typography>
      )}
      <Button sx={{mt: 2}} variant="contained" component={Link} to="/">
        Back to News List
      </Button>
    </div>
  );
};

export default ArticlePage;
