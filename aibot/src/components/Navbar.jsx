import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({ toggleSidebar }) => {
  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(180deg, rgba(215, 199, 244, 0.2) 0%, rgba(151, 133, 186, 0.2) 100%)', boxShadow: 'none' }}>
      <Toolbar sx={{ minHeight: '56px' }}>
        <IconButton edge="start" color="inherit" onClick={toggleSidebar} sx={{ display: { sm: 'none' }, color: '#9785AA' }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h5" sx={{ flexGrow: 1, color: '#9785BA', fontWeight: 700, marginLeft: 1.8 }}>
          Bot AI
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
