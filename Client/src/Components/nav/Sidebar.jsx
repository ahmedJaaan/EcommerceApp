import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { BiMenuAltLeft, BiHomeAlt2 } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SideBar = () => {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => () => {
    setState({ ...state, [anchor]: open });
  };

  const closeDrawer = (anchor) => () => {
    setState({ ...state, [anchor]: false });
  };

  const { user } = useSelector((state) => ({ ...state }));

  const customItems = [
    {
      text: 'Home',
      link: '/',
      icon: <BiHomeAlt2 size={32} style={{ color: 'white' }} />,
    },
    {
      text: 'History',
      link: '/user/history',
      icon: <BiHomeAlt2 size={32} style={{ color: 'white' }} />,
    },
    {
      text: 'Password',
      link: '/user/password',
      icon: <BiHomeAlt2 size={32} style={{ color: 'white' }} />,
    },
    {
      text: 'Wishlist',
      link: '/user/wishlist',
      icon: <BiHomeAlt2 size={32} style={{ color: 'white' }} />,
    },
  ];

  const list = (anchor) => (
    <Box
      sx={{
        width: 250,
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
        backgroundColor: '#313866',
      }}
      role="presentation"
    >
      <List>
        {customItems.map((item) => (
          <NavLink
            key={item.text}
            to={item.link}
            onClick={closeDrawer('left')}
            style={{ textDecoration: 'none', width: '100%', color: 'inherit' }}
          >
            <ListItemButton sx={{ width: '100%' }}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </NavLink>
        ))}
      </List>
      <Divider />
     
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer('left', true)} style={{ fontSize: 50 }}>
        <BiMenuAltLeft />
      </Button>
      <SwipeableDrawer
        anchor="left"
        open={state.left}
        onClose={closeDrawer('left')}
        onOpen={toggleDrawer('left', true)}
        PaperProps={{
          style: { backgroundColor: '#313866' },
        }}
      >
        <h1 style={{ color: 'white', fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '40px' }}>
          Menu
        </h1>
        {user && user.email && (
        <h3 style={{ color: 'white'}}>{user.email.split('@')[0]}</h3>
      )}    
        {list('left')}
      </SwipeableDrawer>
    </div>
  );
};

export default SideBar;
