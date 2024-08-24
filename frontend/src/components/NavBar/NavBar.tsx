import {Link} from 'react-router-dom';
import {AppBar, Container, Toolbar, Typography} from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static" color="default" elevation={0} sx={{ width: '100%', mb: 3 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Container maxWidth="lg" disableGutters>
          <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit'}}>
            News
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
