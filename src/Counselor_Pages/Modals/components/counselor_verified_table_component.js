import * as React from "react";
import { firestore } from "../../../firebase/firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import { Box, Modal, Typography } from "@mui/material";
import { getStorage, ref, getMetadata, getDownloadURL } from "firebase/storage";
export default function CounselorVerifiedTable({
  tasks,
  selectedTask,
  handleSelectTask,
}) {
  const [showVerified, setShowVerified] = React.useState(false);
  const [selectedTaskId, setSelectedTaskId] = React.useState(null);

  return (
    <table className="w-full text-sm text-center h-full table-auto border border-slate-500">
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
            Verified Assignment
          </th>
        </tr>
      </thead>
      <tbody>
        {tasks
          .filter((task) => task.Status === "Verified")
          .map((task, index) => (
            <tr key={index}>
              <td className="p-2 border border-slate-600">{task.Activity}</td>
              <td className="p-2 border border-slate-600">
                {task.Description}
              </td>
              <td className="p-2 border border-slate-600">
                {new Date(task.TurnedInDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
              <td className="p-2 border border-slate-600 text-primaryOrange font-medium">
                <button
                  className="hover:underline"
                  onClick={() => {
                    handleSelectTask(task.id);
                    setSelectedTaskId(task.id); // Set the selected task ID
                    setShowVerified(true); // Show the modal
                  }}
                >
                  View Assignment
                </button>
              </td>
            </tr>
          ))}
      </tbody>
      {showVerified && ( // Only render the modal if showVerified is true
        <ViewVerifiedActivity
          show={showVerified}
          handleClose={() => {
            setShowVerified(false);
            setSelectedTaskId(null); // Reset the selected task ID
          }}
          task={selectedTask}
        />
      )}
    </table>
  );
}

const ViewVerifiedActivity = (props) => {
  const [fileName, setFileName] = React.useState(null);

  // Function to update task status
  const updateTaskStatus = async (taskId) => {
    const taskRef = doc(firestore, "Tasks", taskId);

    try {
      // Update the Status field to "turnedIn"
      await updateDoc(taskRef, {
        Status: "turnedIn",
      });
      console.log("Task status updated to turnedIn");
    } catch (error) {
      console.error("Error updating task status:", error);
    }
    props.handleClose();
  };

  // Function to fetch file name
  const fetchFileName = async (downloadURL) => {
    const storage = getStorage(); // Initialize Firebase Storage
    const fileRef = ref(storage, downloadURL); // Create a reference to the file

    try {
      const metadata = await getMetadata(fileRef); // Get the metadata of the file
      return metadata.name; // Extract the file name
    } catch (error) {
      console.error("Error fetching file name:", error);
      return "N/A"; // Return a default value in case of an error
    }
  };

  // Effect to fetch file name when the download URL changes
  React.useEffect(() => {
    if (props.task?.DownloadURL) {
      fetchFileName(props.task?.DownloadURL)
        .then((name) => {
          setFileName(name);
        })
        .catch((error) => {
          console.error("Error fetching file name:", error);
        });
    }
  }, [props.task?.DownloadURL]);

  // Function to handle file click
  const handleFileClick = () => {
    if (props.task?.DownloadURL) {
      const storage = getStorage(); // Initialize Firebase Storage
      const fileRef = ref(storage, props.task.DownloadURL); // Create a reference to the file

      // Get the file download URL
      getDownloadURL(fileRef)
        .then((url) => {
          // Open the file in a new browser window
          window.open(url, "_blank");
        })
        .catch((error) => {
          console.error("Error opening file in a new window:", error);
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
            View Turned In Activity
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div>
              <p>
                Activity: {props.task?.Activity}
                <br /> Description: {props.task?.Description} <br /> Due Date:{" "}
                {props.task?.Deadline} <br /> Turned-in Date:{" "}
                {props.task?.TurnedInDate} <br />
                File:
              </p>
              File:
              <button
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={handleFileClick}
              >
                {fileName || "N/A"}
              </button>
              <div className="d-flex justify-content-end">
                <button
                  className="btn mt-3"
                  onClick={() => updateTaskStatus(props.task?.id)}
                >
                  Unverify
                </button>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
