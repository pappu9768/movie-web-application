import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { TextField, InputAdornment } from "@mui/material";

import { Link,useNavigate } from 'react-router-dom'
const Navbar = () =>{
  const getRole = localStorage.getItem('Role');
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('Tokens');
    localStorage.removeItem('Role');
    navigate('/login')

  }

  const handleAdd = () => {
    navigate('/add')
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" margin-bottom='20px'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Movies Application
          </Typography>

          {/* <Button color="inherit"><Link to='/login' style={{ textDecoration: 'none', fontWeight: '500', color: '#fff', fontSize: '16px' }}>Login</Link></Button>
          <Button color="inherit"><Link to='/register' style={{ textDecoration: 'none', fontWeight: '500', color: '#fff', fontSize: '16px' }}>Register</Link></Button> */}
          {
            getRole == 0 ? (
              <Button color ='inherit' onClick={handleAdd}>Add Movie</Button>
            ) : (null)
          }
          <Button color ='inherit' onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar