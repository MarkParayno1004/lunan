import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getFirestore, deleteDoc, doc } from "firebase/firestore";

export default function CounselorConfirmDeleteDialog(props) {
  const handleDeleteTask = async (taskId) => {
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, "Tasks", taskId));
    } catch (error) {
      return error;
    }
  };

  return (
    <div>
      <Dialog open={props.show} onClose={props.handleClose}>
        <DialogTitle>Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete
            <span className="font-bold"> {props.task.Activity}</span>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.handleClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDeleteTask(props.task.id);
              props.handleClose();
            }}
            color="error"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
