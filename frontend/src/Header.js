import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import UserMenu from "./UserMenu";
import MainMenu from "./MainMenu";
import theme from "./Theme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar({ title }) {
  const classes = useStyles();
  const [isOpen, setClosed] = React.useState(null);

  const handleClick = (event) => {
    setClosed(event.currentTarget);
  };

  const handleClose = () => {
    setClosed(null);
  };

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <AppBar position="static" color="primary" elevation="none">
          <Toolbar variant="dense">
            <MainMenu />
            <Typography variant="h6" className={classes.title}>
              {title}
            </Typography>
            <UserMenu></UserMenu>
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
    </div>
  );
}
