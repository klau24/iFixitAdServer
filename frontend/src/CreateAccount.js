import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

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
const CreateAccount=()=> {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
        <div>
        <Button size="small" color="primary"  onClick={handleOpen}>
            Don't have an account? Sign Up
        </Button>
       
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
        <DialogTitle id="form-dialog-title">Create Account</DialogTitle>

        <DialogContent>
        <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                margin="dense"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
        
              <TextField
                variant="outlined"
                margin="dense"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <TextField
                variant="outlined"
                margin="dense"
                required
                fullWidth
                name="password"
                label="Confirm Password"
                type="password"
                id="password"
              />
            
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClose}
          >
            Sign Up
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogContent>
              

        </Dialog>
        </div>
        

  );
}

export default CreateAccount;