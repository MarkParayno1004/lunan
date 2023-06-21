import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Form, Button } from "react-bootstrap";
import "../css/PatientAssignment.css";

export const PatientAssignment = () => {
  const [showAss, setAss] = useState("Pending");

  return (
    <div
      className="container-lg mt-5 pb-3 rounded-4 fw-normal d-flex justify-content-center"
      id="AssForm"
    >
      <div>
        <h1 className="d-flex justify-content-center mt-3">Assignment</h1>
        <div className="d-flex justify-content-center">
          <button
            onClick={() => {
              setAss("Pending");
            }}
            className={"rounded-5 me-2"}
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
        <div className="mt-4 mb-3">
          {showAss === "Pending" ? (
            <PendingAss />
          ) : (
            showAss === "Complete" && <CompleteAss />
          )}
        </div>
      </div>
    </div>
  );
};

const PendingAss = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  //! For UploadFile Validation
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFile = (event) => {
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
      Swal.fire({
        position: "center",
        icon: "success",
        background: "#7db9b6",
        title: "Assignment Done!",
        color: "white",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      setError("Please select a file to upload.");
    }
  };

  return (
    <div className=" d-flex justify-content-center">
      <button className="rounded-5" id="buttonAssBG" onClick={handleShow}>
        <h5 className="d-flex justify-content-start mt-2">Activity #1</h5>
        <p className="d-flex justify-content-start">
          Journal and Drawing Entry | Due: March 8, 2023
        </p>
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body id="modalBG">
          <div style={{ color: "white" }}>
            <Modal.Title>Activity #1</Modal.Title>
            Journal and Drawing Entry | Due: March 8, 2023
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mt-3">
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="d-flex justify-content-center">
      <button
        className="rounded-5"
        id="buttonAssBG"
        onClick={handleShow}
        style={{ opacity: 80 + "%" }}
      >
        <h5 className="d-flex justify-content-start mt-2">Activity #1</h5>
        <p className="d-flex justify-content-start">
          Journal and Drawing Entry | Due: March 8, 2023
        </p>
      </button>
      <ShowFiles show={show} handleClose={handleClose} />
    </div>
  );
};

const ShowFiles = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Body style={{ backgroundColor: "#4d455d", color: "#f5e9cf" }}>
        <Modal.Header closeButton>
          <Modal.Title>Submitted Files:</Modal.Title>
        </Modal.Header>
        <div className="mt-3 ms-3">
          <h5>Files:</h5>
          <div>PatientDocument.docx</div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
