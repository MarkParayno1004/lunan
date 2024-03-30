export default function CounselorVerifiedActivityDialog(props) {
  const { show, handleClose } = props;
  const updateTaskStatus = async (taskId) => {
    const taskRef = doc(firestore, "Tasks", taskId);

    try {
      // Update the Status field to "Verified"
      await updateDoc(taskRef, {
        Status: "turnedIn",
      });
      console.log("Task status updated to Verified");
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

  const [fileName, setFileName] = React.useState(null);

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

  React.useEffect(() => {
    if (!show) {
      handleClose(); // Use destructured handleClose
    }
  }, [show, handleClose]);
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

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      className="mt-5"
      style={{ borderStyle: "none" }}
    >
      <Modal.Body style={{ backgroundColor: "#1DC07C" }}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#ffffff" }}>
            View Turned-In Activity:
          </Modal.Title>
        </Modal.Header>
        <div className="container-fluid mt-3" style={{ color: "white" }}>
          <span>
            <strong>{props.task?.Activity}</strong>
          </span>
          <br></br>
          {props.task?.Description}
          <br></br>
          <span>
            <strong>Due Date:</strong> {props.task?.Deadline}
          </span>
          <br></br>
          <span>
            <strong>Turned-in Date:</strong> {props.task?.TurnedInDate}
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
              style={{
                backgroundColor: "#F1A34F",
                color: "#ffffff",
              }}
              onClick={() => updateTaskStatus(props.task?.id)}
            >
              Unverify
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
