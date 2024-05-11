import * as React from "react";
import { Box, Modal, Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

export default function CounselorCreateAssignment(props) {
  const [date, setDate] = React.useState("");
  const [activity, setActivity] = React.useState("");
  const [description, setDescription] = React.useState("");
  const dateInputRef = React.useRef(null);

  const handleChange = (e) => {
    setDate(e.target.value);
  };

  const handleActivityChange = (e) => {
    setActivity(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmitCreate = () => {
    const db = getFirestore();
    const { currentUser } = getAuth();

    if (currentUser && props.selectedPatientUID) {
      const taskData = {
        Activity: activity,
        Deadline: date,
        Description: description,
        counselorUID: currentUser.uid,
        PatientUID: props.selectedPatientUID,
        Status: null,
        TurnedInDate: null,
      };
      addDoc(collection(db, "Tasks"), taskData)
        .then(() => props.handleClose())
        .catch((error) => {
          return error;
        });
    } else {
      return "currentUser or selectedPatientUID is undefined";
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal
        open={props.show}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Assignment
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div>
              <h5>Input Activity:</h5>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  aria-label="CreateAssignment"
                  aria-describedby="basic-addon1"
                  onChange={handleActivityChange}
                  value={activity}
                />
              </div>
              <div>
                <h5>Input Date:</h5>
                <input
                  className="input-group rounded-2"
                  type="date"
                  onChange={handleChange}
                  ref={dateInputRef}
                  style={{ border: "none" }}
                  value={date}
                />
              </div>
              <div className="form-floating mt-3 mb-3">
                <h5>Input Description:</h5>
                <textarea
                  className="form-control"
                  id="floatingTextarea2"
                  style={{ height: "150px" }}
                  onChange={handleDescriptionChange}
                  value={description}
                ></textarea>
              </div>
              <div>
                <button
                  className="btn"
                  style={{ backgroundColor: "#F1A34F", color: "#ffffff" }}
                  onClick={handleSubmitCreate}
                >
                  Submit
                </button>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
