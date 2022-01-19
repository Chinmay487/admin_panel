import React from "react";
import {
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavDrawer = (props) => {
  const navigate = useNavigate();

  const onClickEvent = () => {
    props.setBurgerStatus(!props.burgerStatus);
  };

  const onLinkClick = (path) => {
    onClickEvent();
    navigate(path);
  };

  const onLogoutClick = () => {
    onClickEvent();
  };

  return (
    <Drawer
      open={props.burgerStatus}
      onClose={onClickEvent}
      variant="temporary"
      anchor="top"
      sx={{
        height: "50vh",
        textAlign: "center",
      }}
    >
      <Typography
        sx={{
          marginTop: "1rem",
        }}
      >
        ShopHeaven
      </Typography>
      <List sx={{ marginTop: "1rem", textAlign: "center" }}>
        <ListItem
          onClick={() => {
            onLinkClick("/");
          }}
          divider
          button
          sx={{ textAlign: "center" }}
        >
          <ListItemIcon
            sx={{width: "100%", mx: "auto" }}
          >
            Panel
          </ListItemIcon>
        </ListItem>
        <ListItem
          onClick={() => {
            onLinkClick("/queries");
          }}
          divider
          button
        >
          <ListItemIcon>queries</ListItemIcon>
        </ListItem>
        <ListItem
          onClick={() => {
            onLinkClick("/addproduct");
          }}
          divider
          button
        >
          <ListItemIcon>New Product</ListItemIcon>
        </ListItem>
        <ListItem onClick={onLogoutClick} divider button>
          <Button variant="contained">Logout</Button>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default NavDrawer;
