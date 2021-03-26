import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

export default function UserMenu() {
  const [isOpen, setClosed] = React.useState(null);

  const handleClick = (event) => {
    setClosed(event.currentTarget);
  };

  const handleClose = () => {
    setClosed(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <PersonOutlineIcon></PersonOutlineIcon>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={isOpen}
        keepMounted
        open={Boolean(isOpen)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
