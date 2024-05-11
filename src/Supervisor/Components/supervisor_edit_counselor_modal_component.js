import { useState } from "react";
import { collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { firestore, storage } from "../../firebase/firebase-config";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
  Button,
  Grid,
  TextField,
} from "@mui/material";

function SupervisorEditCounselorModalComponent(props) {
  const [updateName, setUpdateName] = useState(props.firstName || "");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const handleFile = (event) => {
    const selectedFile = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError("");
    } else {
      setFile(null);
      setError("Please select a valid image file (JPEG, PNG, GIF).");
    }
  };

  const handleUpdateName = (event) => {
    setUpdateName(event.target.value);
  };

  const handleSubmitEdit = async (event) => {
    event.preventDefault();
    if (!updateName && !file) {
      setError("Name and file are required.");
      return;
    }

    const userAccRef = collection(firestore, "Users");

    try {
      if (props.userId) {
        const userDocRef = doc(userAccRef, props.userId);
        const docSnapshot = await getDoc(userDocRef);

        if (docSnapshot.exists()) {
          const existingData = docSnapshot.data();

          const updateData = {
            ...existingData,
            firstName: updateName,
          };

          if (file) {
            const imageUrl = await uploadProfilePicture(props.userId, file);
            updateData.ProfPic = imageUrl;
          }
          await updateDoc(userDocRef, updateData);
          props.onEditSuccess(updateData);
        } else {
          return "Document does not exist.";
        }
      } else {
        return "Invalid userId";
      }
    } catch (error) {
      setError("Error updating user data.");
      return error;
    }
  };

  const uploadProfilePicture = async (userId, file) => {
    try {
      const storageRef = ref(storage, `user_profile_pictures/${userId}`);
      const snapshot = await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(snapshot.ref);
      return imageUrl;
    } catch (error) {
      return error;
    }
  };
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      fullWidth="sm"
      fullScreen={fullScreen}
      open={props.show}
      onClose={props.handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <div>
        <DialogTitle id="responsive-dialog-title">
          Update Counselor Profile:
        </DialogTitle>
      </div>

      <DialogContent>
        <form
          className=""
          noValidate
          autoComplete="off"
          onSubmit={handleSubmitEdit}
        >
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                id="outlined-basic"
                label="New Name"
                variant="outlined"
                onChange={handleUpdateName}
                required
              />
            </Grid>
            <Grid item>
              <input
                type="file"
                accept="image/*"
                name="ProfPic"
                onChange={handleFile}
                required
              />
              <p className="text-danger">{error}</p>
            </Grid>
          </Grid>
          <DialogActions>
            <Button autoFocus onClick={props.handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmitEdit} autoFocus>
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default SupervisorEditCounselorModalComponent;
