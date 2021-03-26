import React , { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";

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

const AdEditModal = ({ Ad }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [clickThrough, setClickThrough] = useState(Ad.clickThrough);
  const [mainHeader, setMainHeader] = useState(Ad.mainHeader);
  const [subHeader, setSubHeader] = useState(Ad.subHeader);
  const [campaign, setCampaign] = useState(Ad.campaign);
  const [adImage, setAdImage] = useState(Ad.adImage);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    fetch("http://localhost:3001/Ads/" + Ad._id, {
      method: "PATCH",
      headers: {},
      body: new URLSearchParams({
        mainHeader: `${mainHeader}`,
        subHeader: `${subHeader}`,
        campaign: `${campaign}`,
        clickThrough: `${clickThrough}`,

      }),
    }).then((res) => console.log("Updating Ad: " + res));
    window.location.reload();
  };

  const handleCancel = () => {
    setOpen(false);
  };

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
  return (
    <div>
      <Button
        size="small"
        color="primary"
        variant="outlined"
        onClick={handleOpen}
      >
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
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
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AdEditModal;
