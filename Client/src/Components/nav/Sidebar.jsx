import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { BiMenuAltLeft } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { SiApachekafka, SiPydantic } from "react-icons/si";
import { BsClockHistory } from "react-icons/bs";
import { PiLockKey } from "react-icons/pi";
import { BsBagHeart } from "react-icons/bs";
import { LiaModx } from "react-icons/lia";
import { Badge } from "antd";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { Avatar } from "@mui/material";
const SideBar = ({ path }) => {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => () => {
    setState({ ...state, [anchor]: open });
  };

  const closeDrawer = (anchor) => () => {
    setState({ ...state, [anchor]: false });
  };

  const { user, cart } = useSelector((state) => ({ ...state }));

  const customItems = [
    {
      text: "Home",
      link: "/",
      icon: <SiApachekafka size={32} style={{ color: "white" }} />,
    },
    {
      text: "Search and Filter",
      link: "/shop",
      icon: <SiPydantic size={32} style={{ color: "white" }} />,
    },
    {
      text: (
        <Badge count={cart.length} offset={[13, 0]} size="small">
          <span style={{ color: "white", fontSize: "16px" }}>Cart</span>
        </Badge>
      ),
      link: "/cart",
      icon: <MdOutlineLocalGroceryStore size={32} style={{ color: "white" }} />,
    },
    {
      text: "History",
      link: "/user/history",
      icon: <BsClockHistory size={32} style={{ color: "white" }} />,
    },
    {
      text: "Password",
      link: "/user/password",
      icon: <PiLockKey size={32} style={{ color: "white" }} />,
    },
    {
      text: "Wishlist",
      link: "/user/wishlist",
      icon: <BsBagHeart size={32} style={{ color: "white" }} />,
    },
    {
      text: "Profile",
      link: "/user/profile",
      icon: <LiaModx size={34} style={{ color: "white" }} />,
    },
  ];

  const list = (anchor) => (
    <Box
      sx={{
        width: 250,
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
        backgroundColor: "#313866",
      }}
      role="presentation"
    >
      <List>
        {customItems.map((item) => (
          <NavLink
            key={item.text}
            to={item.link}
            onClick={closeDrawer("left")}
            style={{ textDecoration: "none", width: "100%", color: "inherit" }}
          >
            <ListItemButton sx={{ width: "100%" }}>
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
      <Button onClick={toggleDrawer("left", true)} style={{ fontSize: 50 }}>
        <Badge count={cart.length} offset={[7, 10]} size="medium" color="green">
          <BiMenuAltLeft
            style={{ color: path === "/" ? "white" : "blue", fontSize: 50 }}
          />
        </Badge>
      </Button>
      <SwipeableDrawer
        anchor="left"
        open={state.left}
        onClose={closeDrawer("left")}
        onOpen={toggleDrawer("left", true)}
        PaperProps={{
          style: { backgroundColor: "#313866" },
        }}
      >
        <h1
          style={{
            color: "white",
            fontFamily: "sans-serif",
            fontWeight: "bold",
            fontSize: "40px",
          }}
        >
          Menu
        </h1>
        {user && user.name && (
          <NavLink
            to="/user/profile"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Avatar
              src={user.picture[0]}
              sx={{
                width: 40,
                height: 40,
                marginRight: "10px",
                marginLeft: "5px",
              }}
            />
            <h3 style={{ color: "white" }}>{user.name}</h3>
          </NavLink>
        )}
        {list("left")}
      </SwipeableDrawer>
    </div>
  );
};

export default SideBar;
