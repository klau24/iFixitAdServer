import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const AdDelete = ({ item }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = (id) => {
    
    fetch("http://localhost:3001/Ads/" + id, {
      method: "DELETE",
    });
    setOpen(false);
    window.location.reload();
  };

  return (
    <div>
      <Button
        size="small"
        color="primary"
        variant="outlined"
        onClick={handleOpen}
      >
        Delete
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-modal-title"
        aria-describedby="alert-modal-description"
      >
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to delete?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this ad? Once this ad is deleted
                it cannot be retrieved.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleDelete(item._id)} color="primary" variant="outlined">
                Delete
              </Button>
              <Button
                onClick={handleClose}
                color="primary"
                variant="outlined"
                autoFocus
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Modal>
    </div>
  );
};
export default AdDelete;
