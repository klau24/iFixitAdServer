import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

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

const EditModal = ({ Campaign }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(Campaign.campaignTitle);
  const [description, setDescription] = useState(Campaign.description);
  const [selectedStartDate, setSelectedStartDate] = useState(
    new Date(Campaign.startTime)
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    new Date(Campaign.endTime)
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    fetch("http://localhost:3001/Campaigns/" + Campaign._id, {
      method: "PATCH",
      headers: {},
      body: new URLSearchParams({
        id: `${Campaign._id}`,
        campaignTitle: `${title}`,
        startTime: selectedStartDate.toUTCString(),
        endTime: selectedEndDate.toUTCString(),
        description: `${description}`,
      }),
    }).then((res) => console.log("Updating Campaign: " + res));
    window.location.reload();
  };

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div>
      <Button size="small" color="primary" onClick={handleOpen}>
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Campaign</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Campaign Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={handleTitle}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-between">
              <KeyboardDatePicker
                className={classes.startDate}
                margin="normal"
                id="start-date-picker"
                label="Start Date"
                format="MM/dd/yyyy"
                value={selectedStartDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <KeyboardDatePicker
                margin="normal"
                id="end-date-picker"
                label="End Date"
                format="MM/dd/yyyy"
                value={selectedEndDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <TextField
            className={classes.description}
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={4}
            defaultValue="Default Value"
            variant="outlined"
            fullWidth
            value={description}
            onChange={handleDescription}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
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
export default EditModal;
