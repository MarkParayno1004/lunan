import { Form, Modal, Alert } from "react-bootstrap";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
export default function ForgotModal(props) {
  const [localFormData, setLocalFormData] = useState({
    email: "",
  });

  const [resetStatus, setResetStatus] = useState({
    message: "",
    success: false,
  });

  const handleForgetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, localFormData.email);
      setResetStatus({
        message: "Password reset instructions sent to your email.",
        success: true,
      });
    } catch (error) {
      console.error("Password reset error:", error);
      setResetStatus({
        message: "Email is not existing in the system.",
        success: false,
      });
    }
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      style={{ border: "none", color: "white" }}
    >
      <Modal.Body id="BGmodal">
        <Modal.Header className="mb-3" closeButton>
          <Modal.Title>Forget Password</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            handleForgetPassword();
          }}
        >
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={localFormData.email}
              onChange={(event) =>
                setLocalFormData({
                  ...localFormData,
                  email: event.target.value,
                })
              }
              required
            />
            {resetStatus.message && (
              <Alert
                variant={resetStatus.success ? "success" : "danger"}
                className="mt-3"
              >
                {resetStatus.message}
              </Alert>
            )}
          </Form.Group>
          <Modal.Footer className="mt-3">
            <button
              className="rounded-5 fw-medium"
              variant="primary"
              id="BtnSubmitAC"
            >
              Submit
            </button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
