import {createRoot} from 'react-dom/client';
import App from './App';
import {ThemeProvider} from '@mui/material';
import {Provider} from 'react-redux';
import {store} from './app/store';
import theme from './theme';
import {BrowserRouter} from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);
