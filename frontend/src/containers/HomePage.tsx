import {useEffect} from 'react';
import {fetchNews, deleteArticle} from '../app/thunks';
import {selectNews, selectIsNewsLoading, selectError} from '../store/newsSlice';
import {Link} from 'react-router-dom';
import {Button, List, ListItem, Typography, CircularProgress, Box, CardMedia} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {AppDispatch} from '../app/store';
import placeholder from '../assets/no-img.jpg';

const placeholderImage = placeholder;

const HomePage = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const news = useAppSelector(selectNews);
  const isLoading = useAppSelector(selectIsNewsLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteArticle(id));
  };

  const sortedNews = [...news].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (isLoading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress/>
    </Box>
  );

  if (error) return <Typography>Error loading news.</Typography>;

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">News List</Typography>
        <Button variant="contained" component={Link} to="/addArticle">
          Add New Post
        </Button>
      </Box>
      {news.length === 0 ? (
        <Typography>No news available.</Typography>
      ) : (
        <List>
          {sortedNews.map((article) => (
            <ListItem key={article.id} sx={{
              mb: 3,
              p: 2,
              border: '1px solid #A3A3A3FF',
              borderRadius: '4px',
              backgroundColor: '#ececec'
            }}>
              <Box display="flex" flexDirection="row" alignItems="center" width="100%">
                <Box flexShrink={0} mr={2}>
                  <CardMedia
                    component="img"
                    image={article.image ? `http://localhost:8003/${article.image}` : placeholderImage}
                    alt={article.name}
                    sx={{width: 100, height: 100, objectFit: 'cover'}}
                  />
                </Box>
                <Box flexGrow={1}>
                  <Typography variant="h6">{article.name}</Typography>
                  <Typography variant="body2"
                              color="textSecondary">{new Date(article.createdAt).toLocaleString()}</Typography>
                  <Box mt={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to={`/news/${article.id}`}
                      sx={{mr: 2}}
                    >
                      Read Full Post
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => handleDelete(article.id)} sx={{ml: 2}}>
                      Delete
                    </Button>
                  </Box>
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default HomePage;
