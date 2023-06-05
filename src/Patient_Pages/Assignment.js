import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import swal from "sweetalert";
import { Form, Button } from "react-bootstrap";
import "../css/Assignment.css";

export const Assignment = () => {
  const [showAss, setAss] = useState("");
  return (
    <div className="container-fluid d-flex justify-content-center " id="assBG">
      <div
        class="container-lg mt-3 mb-3 rounded-4 fw-normal d-flex justify-content-center"
        id="AssForm"
      >
        <div>
          <h1 className="d-flex justify-content-center mt-3">Assignment</h1>
          <div className="d-flex justify-content-center">
            <button
              onClick={() => {
                setAss("Pending");
              }}
              className="rounded-5 me-2"
              id="buttonAss"
            >
              Pending
            </button>
            <button
              className="rounded-5"
              onClick={() => {
                setAss("Complete");
              }}
              id="buttonAss"
            >
              Complete
            </button>
          </div>
          <div className="mt-5">
            {showAss === "Pending" ? (
              <PendingAss />
            ) : (
              showAss === "Complete" && <CompleteAss />
            )}
          </div>
          <div className="mt-3 d-flex align-items-end">
            <Link to="/Patient Dashboard" style={{ textDecoration: "none" }}>
              <Button
                className="btn nav-link fs-5 mt-2 me-3 mb-2 rounded-4"
                id="buttonCard"
              >
                Back
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const PendingAss = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    return swal("Assignment Submitted!!");
  };
  const handleShow = () => setShow(true);

  //! For UploadFile Validation
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      ".doc",
      ".docx",
      "application/pdf",
    ];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError("");
    } else {
      setFile(null);
      setError(
        "Please select a valid image file (JPEG, PNG, GIF, Doc, Docx, PDF)."
      );
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    // Handle file submission logic here
    if (file) {
      console.log("File:", file);
      // Perform further actions with the file, such as uploading to a server
    } else {
      setError("Please select a file to upload.");
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <button className="rounded-5" id="buttonAssTab" onClick={handleShow}>
        <h5 className="d-flex justify-content-start mt-2">Activity #1</h5>
        <p className="d-flex justify-content-start">
          Journal and Drawing Entry | Due: March 8, 2023
        </p>
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body closeButton id="modalBG">
          <div style={{ color: "white" }}>
            <Modal.Title>Activity #1</Modal.Title>
            Journal and Drawing Entry | Due: March 8, 2023
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mt-3">
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                />
                <Form.Text className="text-danger">{error}</Form.Text>
              </Form.Group>
              <div className="d-flex justify-content-end mt-3">
                <Button variant="primary" type="submit" id="submitButton">
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const CompleteAss = () => {
  return (
    <div className="d-flex justify-content-center">
      <button
        className="rounded-5"
        id="buttonAssTab"
        style={{ opacity: 80 + "%" }}
        disabled
      >
        <h5 className="d-flex justify-content-start mt-2">Activity #1</h5>
        <p className="d-flex justify-content-start">
          Journal and Drawing Entry | Due: March 8, 2023
        </p>
      </button>
    </div>
  );
};
