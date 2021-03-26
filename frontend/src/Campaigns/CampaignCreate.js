import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../Theme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
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
  startDate: {
    marginRight: 20,
  },
}));

const AddCampaign = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleClose = () => {
    console.log(title);
    setOpen(false);

    fetch("http://localhost:3001/Campaigns", {
      method: "POST",
      headers: {},
      body: new URLSearchParams({
        campaignTitle: `${title}`,
        startTime: selectedStartDate.toUTCString(),
        endTime: selectedEndDate.toUTCString(),
        description: `${description}`,
      }),
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
          + Create New Campaign
        </Button>
        <Dialog
          className={classes.dialog}
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
              onChange={handleTitle}
              value={title}
              fullWidth
              required
              error={title.length === 0}
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
                  required
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
                  required
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
              value={description}
              onChange={handleDescription}
              fullWidth
              required
              error={description.length === 0}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleClose}
              color="primary"
              disabled={description.length === 0 || title.length === 0}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </MuiThemeProvider>
  );
};

export default AddCampaign;
