import './App.css';
import {Route, Routes} from 'react-router-dom';
import {Container} from '@mui/material';
import HomePage from './containers/HomePage';
import AddArticle from './containers/AddArticle';
import ArticlePage from './containers/ArticlePage';
import Navbar from './components/NavBar/NavBar';

const App = () => {

  return (
    <Container>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/addArticle" element={<AddArticle />} />
        <Route path="/news/:id" element={<ArticlePage />} />
      </Routes>
    </Container>
  );
};

export default App;
