export default function CounselorViewTurnedInActivityModal() {
  const [fileName, setFileName] = React.useState(null);

  const updateTaskStatus = async (taskId) => {
    const taskRef = doc(firestore, "Tasks", taskId);
    try {
      // Update the Status field to "Verified"
      await updateDoc(taskRef, {
        Status: "Verified",
      });
      console.log("Task status updated to Verified");
      props.handleClose();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

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

  React.useEffect(() => {
    if (props.selectedTask?.DownloadURL) {
      fetchFileName(props.selectedTask.DownloadURL)
        .then((name) => {
          setFileName(name);
        })
        .catch((error) => {
          console.error("Error fetching file name:", error);
        });
    }
  }, [props.selectedTask?.DownloadURL]);

  const handleFileClick = () => {
    if (props.selectedTask?.DownloadURL) {
      const storage = getStorage(); // Initialize Firebase Storage
      const fileRef = ref(storage, props.selectedTask.DownloadURL); // Create a reference to the file

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
}
