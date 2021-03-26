import React, { useState } from "react";
import { NavLink, withRouter, BrowserRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const navLinks = [
  { title: `Campaigns`, path: `/CampaignView` },
  { title: `Ads`, path: `/AdDisplay.js` },
];

const MainMenu = () => {
  const classes = useStyles();
  const [isOpen, setClosed] = React.useState(false);

  const handleClick = (event) => {
    setClosed(event.currentTarget);
  };

  const handleClose = () => {
    setClosed(null);
  };

  return (
    <div className={classes.root}>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="primaryText"
        aria-label="menu"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>

      <Menu
        id="simple-menu"
        anchorEl={isOpen}
        keepMounted
        open={Boolean(isOpen)}
        onClose={handleClose}
        component="nav"
      >
        <BrowserRouter>
          <NavLink className={classes.navbarItem} to="/">
            <MenuItem onClick={handleClose}>Home</MenuItem>
          </NavLink>
          <NavLink className={classes.navbarItem} to="/ads">
            <MenuItem onClick={handleClose}>Ads</MenuItem>
          </NavLink>
          <NavLink className={classes.navbarItem} to="/campaigns">
            <MenuItem onClick={handleClose}>Campaigns</MenuItem>
          </NavLink>
        </BrowserRouter>
      </Menu>
    </div>
  );
};

// export default withRouter(MainMenu);
export default MainMenu;
