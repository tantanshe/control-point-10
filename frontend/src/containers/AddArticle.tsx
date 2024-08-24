import React, {useState} from 'react';
import {addArticle} from '../app/thunks';
import {TextField, Button, Typography} from '@mui/material';
import FileInput from '../UI/FileInput/FileInput';
import {AppDispatch} from '../app/store';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../app/hooks';

const AddArticle = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: '',
    text: '',
    image: null,
  });

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setState(prevState => ({
        ...prevState, [name]: files[0]
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.name || !state.text) return;

    const formData = new FormData();
    formData.append('name', state.name || 'Anonymous');
    formData.append('text', state.text);
    if (state.image) formData.append('image', state.image);
    dispatch(addArticle(formData))
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.error('Failed to add article:', error);
      });
  };

  return (
    <div>
      <Typography variant="h4">Add New Post</Typography>
      <TextField
        label="Title"
        value={state.name}
        onChange={(e) => setState({...state, name: e.target.value})}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Content"
        value={state.text}
        onChange={(e) => setState({...state, text: e.target.value})}
        multiline
        rows={4}
        fullWidth
        margin="normal"
      />
      <FileInput
        onChange={fileInputChangeHandler}
        name="image"
        label="Upload Image"
      />
      <Button sx={{mt: 2}} variant="contained" onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default AddArticle;
