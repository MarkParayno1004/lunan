import React, { useState } from "react";

import { Form, Button, Modal } from "react-bootstrap";
import {
  handleSubmitAdd,
  handleAddSuccess,
} from "../Data/supervisor_all_counselors_helper";

function SupervisorAddCounselorModalComponent(props) {
  const [localFormData, setLocalFormData] = useState({
    firstName: "",
    ConNum: "",
    Email: "",
    ProfPic: null,
  });
  const [fileError, setFileError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setLocalFormData({
        ...localFormData,
        ProfPic: selectedFile,
      });
      setFileError("");
    } else {
      setLocalFormData({
        ...localFormData,
        ProfPic: null,
      });
      setFileError("Please select a valid image file (JPEG, PNG, GIF).");
    }
  };

  return (
    <Modal
      className="container-fluid"
      show={props.show}
      onHide={props.onHide}
      style={{ border: "none", color: "white" }}
    >
      <Modal.Body id="BGmodal">
        <Modal.Header className="mb-3" closeButton>
          <Modal.Title>Add Counselor</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={(event) =>
            handleSubmitAdd(
              event,
              setLoading,
              localFormData,
              handleAddSuccess,
              props.onHide,
              props.setCounselorData,
              props.setFilteredCounselorData,
              props.addCounselorToData
            )
          }
        >
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={localFormData.firstName}
              onChange={(event) =>
                setLocalFormData({
                  ...localFormData,
                  firstName: event.target.value,
                })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Control
              type="file"
              accept="image/*"
              name="ProfPic"
              onChange={handleFileChange}
            />
            <Form.Text className="text-danger">{fileError}</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-2">Contact Number</Form.Label>
            <Form.Control
              type="text"
              name="ConNum"
              value={localFormData.ConNum}
              onChange={(event) =>
                setLocalFormData({
                  ...localFormData,
                  ConNum: event.target.value,
                })
              }
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-2">Email</Form.Label>
            <Form.Control
              type="text"
              name="Email"
              value={localFormData.Email}
              onChange={(event) =>
                setLocalFormData({
                  ...localFormData,
                  Email: event.target.value,
                })
              }
              required
            />
          </Form.Group>

          <Modal.Footer className="mt-3">
            {loading ? (
              <Button
                variant="primary"
                className="rounded-5 fw-medium"
                disabled
              >
                Adding...
              </Button>
            ) : (
              <Button
                variant="primary"
                type="submit"
                className="rounded-5 fw-medium"
                id="BtnSubmitAC"
              >
                Submit
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default SupervisorAddCounselorModalComponent;
