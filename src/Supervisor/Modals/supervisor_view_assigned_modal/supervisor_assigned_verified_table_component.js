import * as React from "react";
import { firestore } from "../../../firebase/firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import { Box, Modal, Typography } from "@mui/material";
import { getStorage, ref, getMetadata, getDownloadURL } from "firebase/storage";

export default function SupervisorVerifiedTable({
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
                    setSelectedTaskId(task.id);
                    setShowVerified(true);
                  }}
                >
                  View Assignment
                </button>
              </td>
            </tr>
          ))}
      </tbody>
      {showVerified && (
        <ViewVerifiedActivity
          show={showVerified}
          handleClose={() => {
            setShowVerified(false);
            setSelectedTaskId(null);
          }}
          task={selectedTask}
        />
      )}
    </table>
  );
}

const ViewVerifiedActivity = (props) => {
  const [fileName, setFileName] = React.useState(null);
  const updateTaskStatus = async (taskId) => {
    const taskRef = doc(firestore, "Tasks", taskId);

    try {
      await updateDoc(taskRef, {
        Status: "turnedIn",
      });
    } catch (error) {
      return;
    }
    props.handleClose();
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
    if (props.task?.DownloadURL) {
      fetchFileName(props.task?.DownloadURL)
        .then((name) => {
          setFileName(name);
        })
        .catch((error) => {
          return error;
        });
    }
  }, [props.task?.DownloadURL]);
  const handleFileClick = () => {
    if (props.task?.DownloadURL) {
      const storage = getStorage();
      const fileRef = ref(storage, props.task.DownloadURL);
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
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
