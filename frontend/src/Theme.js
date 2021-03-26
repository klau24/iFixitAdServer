import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Arial",
  },
  palette: {
    primary: {
      light: "#c1d5e0",
      dark: "#62757f",
      main: "#90a4ae",
      contrastText: "#000000",
    },
    secondary: {
      light: "#ffcc90",
      dark: "#c86c35",
      main: "#ff9b61",
      contrastText: "#000000",
    },
  },
});
export default theme;
