import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
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
        </div>
      </div>
    </div>
  );
};

const PendingAss = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button className="rounded-5" id="buttonAssTab" onClick={handleShow}>
        <h5 className="d-flex justify-content-start mt-2">Activity #1</h5>
        <p className="d-flex justify-content-start">
          Journal and Drawing Entry | Due: March 8, 2023
        </p>
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton id="modalBG">
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body closeButton id="modalBG">
          <Modal.Title>Heading</Modal.Title>
          <div>Woohoo, you are reading this text in a modal!</div>

          <button variant="primary" onClick={handleClose}>
            Save Changes
          </button>
        </Modal.Body>
      </Modal>
    </>
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
