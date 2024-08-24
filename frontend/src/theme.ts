import {createTheme} from '@mui/material';

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          margin: '10px 0',
        },
      },
    },
  }
});

export default theme;