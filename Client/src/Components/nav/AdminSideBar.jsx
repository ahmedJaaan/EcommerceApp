import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { BiMenuAltLeft, BiCategoryAlt } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {SiApachekafka, SiQuantconnect} from "react-icons/si"
import {BsClockHistory, BsUbuntu, BsGearWideConnected, BsBagHeart} from "react-icons/bs"
import {PiLockKey} from "react-icons/pi"
import {IoTicketOutline} from "react-icons/io5"
import {FaConnectdevelop} from "react-icons/fa"
import {LiaModx} from "react-icons/lia"
const AdminSideBar = () => {
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
      icon: <SiApachekafka size={32} style={{ color: 'white' }} />,
    },
    {
      text: 'Admin Dashboard',
      link: '/admin/dashboard',
      icon: <FaConnectdevelop size={32} style={{ color: 'white' }} />,
    },
    {
        text: 'Products',
        link: '/admin/product',
        icon: <BsUbuntu size={32} style={{ color: 'white' }} />,
    },
    {
        text: 'Categories',
        link: '/admin/category',
        icon: <BiCategoryAlt size={32} style={{ color: 'white' }} />,
    },
    
    {
        text: 'Sub Categories',
        link: '/admin/sub',
        icon: <SiQuantconnect size={32} style={{ color: 'white' }} />,
    },
    {
        text: 'Coupon',
        link: '/admin/coupon',
        icon: <IoTicketOutline size={32} style={{ color: 'white' }} />,
    },
    {
      text: 'History',
      link: '/user/history',
      icon: <BsClockHistory size={32} style={{ color: 'white' }} />,
    },
    {
      text: 'Password',
      link: '/user/password',
      icon: <PiLockKey size={32} style={{ color: 'white' }} />,
    },
    {
      text: 'Wishlist',
      link: '/user/wishlist',
      icon: <BsBagHeart size={32} style={{ color: 'white' }} />,
    },
    {
      text: 'Profile',
      link: '/user/profile',
      icon: <LiaModx size={34} style={{ color: 'white' }} />,
    }
    
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
        <h1 style={{ color: 'white', fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '40px', marginLeft: '5px' }}>
          Menu
        </h1>
        {user && user.name && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
            <img src={user.picture} alt={user.name} style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
            <h3 style={{ color: 'white', marginTop: '10px' }}>{user.name}</h3>
          </div>
        )}    
        {list('left')}
      </SwipeableDrawer>
    </div>
  );
};

export default AdminSideBar;
