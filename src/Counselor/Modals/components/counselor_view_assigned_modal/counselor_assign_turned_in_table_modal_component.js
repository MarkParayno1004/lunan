import * as React from "react";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../../firebase/firebase-config";
import { Box, Modal, Typography } from "@mui/material";
import { getStorage, ref, getMetadata, getDownloadURL } from "firebase/storage";

export default function CounselorTurnedInTableModal({
  tasks,
  selectedTask,
  handleSelectTask,
}) {
  const [showViewTurnedIn, setShowViewTurnedIn] = React.useState(false);

  return (
    <table className="w-full text-sm h-full border border-slate-500 text-center">
      <thead className="bg-primaryGreen">
        <tr className="rounded-lg">
          <th scope="col" className="px-6 py-3 rounded-ss-lg">
            Activity
          </th>
          <th scope="col" className="px-6 py-3">
            Description
          </th>
          <th scope="col" className="px-6 py-3">
            Turned In Date
          </th>
          <th scope="col" className="px-6 py-3 rounded-se-lg">
            Submitted Assignment
          </th>
        </tr>
      </thead>
      <tbody>
        {tasks
          .filter((task) => task.Status === "turnedIn")
          .map((task, index) => (
            <tr key={index}>
              <td className="p-2 border border-slate-600">{task.Activity}</td>
              <td className="p-2 border border-slate-500">
                {task.Description}
              </td>
              <td className="p-2 border border-slate-500">
                {new Date(task.TurnedInDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
              <td className="p-2 border border-slate-500 font-medium text-primaryOrange">
                <button
                  className="hover:underline"
                  onClick={() => {
                    handleSelectTask(task.id);
                    setShowViewTurnedIn(!showViewTurnedIn);
                  }}
                >
                  View Assignment
                </button>
                <ViewTurnedInActivity
                  show={showViewTurnedIn}
                  handleClose={() => setShowViewTurnedIn(!showViewTurnedIn)}
                  task={selectedTask}
                  selectedTask={selectedTask}
                />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

const ViewTurnedInActivity = (props) => {
  const [fileName, setFileName] = React.useState(null);

  const updateTaskStatus = async (taskId) => {
    const taskRef = doc(firestore, "Tasks", taskId);
    try {
      await updateDoc(taskRef, {
        Status: "Verified",
      });
      props.handleClose();
    } catch (error) {
      return error;
    }
  };

  const fetchFileName = async (downloadURL) => {
    const storage = getStorage();
    const fileRef = ref(storage, downloadURL);
    try {
      const metadata = await getMetadata(fileRef);
      return metadata.name;
    } catch (error) {
      return error;
    }
  };

  React.useEffect(() => {
    if (props.selectedTask?.DownloadURL) {
      fetchFileName(props.selectedTask.DownloadURL)
        .then((name) => {
          setFileName(name);
        })
        .catch((error) => {
          return error;
        });
    }
  }, [props.selectedTask?.DownloadURL]);

  const handleFileClick = () => {
    if (props.selectedTask?.DownloadURL) {
      const storage = getStorage();
      const fileRef = ref(storage, props.selectedTask.DownloadURL);
      getDownloadURL(fileRef)
        .then((url) => {
          window.open(url, "_blank");
        })
        .catch((error) => {
          return error;
        });
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
            Turned in Activity
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="container-fluid mt-3">
              <span>
                <strong>{props.selectedTask?.Activity}</strong>
              </span>
              <br></br>
              {props.selectedTask?.Description}
              <br></br>
              <span>
                <strong>Due Date:</strong> {props.selectedTask?.Deadline}
              </span>
              <br></br>
              <span>
                <strong>Turned-in Date:</strong>
                {props.selectedTask?.TurnedInDate}
              </span>
              <br></br>
              <strong>File : </strong>
              <span
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={handleFileClick}
              >
                {fileName || "N/A"}
              </span>
              <div className="d-flex justify-content-end">
                <button
                  className="btn mt-3"
                  onClick={() => updateTaskStatus(props.selectedTask?.id)}
                >
                  Verify
                </button>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
