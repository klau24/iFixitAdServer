import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import theme from "../Theme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    marginBottom: theme.spacing(2),
  },
  dialog: {
    color: "black",
  },
}));

const ViewCampaign = ({ Campaign }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [ads, setAds] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = () => {
    fetch("http://localhost:3001/Campaigns/" + Campaign._id + "/Ads")
      .then((res) => res.json())
      .then((ad) => setAds(ad.ads));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <Button size="small" color="primary" onClick={handleOpen}>
        View
      </Button>
      <Dialog
        className={classes.dialog}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {Campaign.campaignTitle}
        </DialogTitle>
        <DialogContent>
          <Typography>Campaign ID: {Campaign._id}</Typography>
          {ads.length === 0 ? (
            <Typography>No ads associated</Typography>
          ) : (
            <Typography>Ads:</Typography>
          )}
          {ads && ads.length > 0 && ads.map((item) => console.log(item))}
        </DialogContent>
      </Dialog>
    </MuiThemeProvider>
  );
};
export default ViewCampaign;
