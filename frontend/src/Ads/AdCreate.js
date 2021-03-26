import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../Theme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

const useStyles = makeStyles((theme) => ({
  button: {
    marginBottom: theme.spacing(2),
  },
  description: {
    marginTop: theme.spacing(2),
  },
  dialog: {
    color: "black",
  },
}));

const AdCreate = ({ Ads }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [clickThrough, setClickThrough] = useState("");
  const [mainHeader, setMainHeader] = useState("");
  const [subHeader, setSubHeader] = useState("");
  const [campaign, setCampaign] = useState("");
  const [adImage, setAdImage] = useState("");
  var formData = new FormData();

  const handleClickThrough = (event) => {
    setClickThrough(event.target.value);
  };
  const handleMainHeader = (event) => {
    setMainHeader(event.target.value);
  };
  const handleSubHeader = (event) => {
    setSubHeader(event.target.value);
  };
  const handleCampaign = (event) => {
    setCampaign(event.target.value);
  };
  const handleAdImage = (event) => {
    setAdImage(event.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    formData.append("clickThrough", clickThrough);
    formData.append("mainHeader", mainHeader);
    formData.append("subHeader", subHeader);
    formData.append("campaign", campaign);
    formData.append(
      "adImage",
      document.getElementById("upload-photo").files[0]
    );

    fetch("http://localhost:3001/ads", {
      method: "POST",
      headers: {},
      body: formData,
    }).then((res) => console.log(res));
    window.location.reload();
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <Button
          className={classes.button}
          size="small"
          color="secondaryText"
          onClick={handleOpen}
          variant="contained"
        >
          + Create New Ad
        </Button>
        <Dialog
          className={classes.dialog}
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create Ad</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create an ad, please enter the image url, main header, sub
              header, and any optional campaign tags.
            </DialogContentText>
            <Button variant="contained" component="label">
              <input
                required
                id="upload-photo"
                name="upload-photo"
                onChange={handleAdImage}
                type="file"
              />
            </Button>

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Main Header"
              required
              variant="outlined"
              onChange={handleMainHeader}
              value={mainHeader}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Sub Header"
              required
              variant="outlined"
              onChange={handleSubHeader}
              value={subHeader}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Click Through Link"
              required
              variant="outlined"
              onChange={handleClickThrough}
              value={clickThrough}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Campaign"
              variant="outlined"
              onChange={handleCampaign}
              value={campaign}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </MuiThemeProvider>
  );
};
export default AdCreate;
