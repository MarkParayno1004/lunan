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
    <Modal show={props.show} onHide={props.onHide} className="text-white">
      <Modal.Body className="bg-primaryOrange ">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold ">Forgot password?</h1>
          </div>

          <Form
            onSubmit={(event) => {
              event.preventDefault();
              handleForgetPassword();
            }}
          >
            <Form.Group>
              <Form.Label
                for="email"
                className="block text-sm font-bold ml-1 mb-2 dark:text-white"
              >
                Email address
              </Form.Label>
              <Form.Control
                type="email"
                id="email"
                name="email"
                className="py-2 px-2 block w-full border-2 border-gray-200 rounded-md text-sm relative"
                value={localFormData.email}
                onChange={(event) =>
                  setLocalFormData({
                    ...localFormData,
                    email: event.target.value,
                  })
                }
                required
              />
              <div>
                {resetStatus.message && (
                  <Alert
                    variant={resetStatus.success ? "success" : "danger"}
                    className="mt-3"
                  >
                    {resetStatus.message}
                  </Alert>
                )}
              </div>
            </Form.Group>
            <div className="grid gap-y-4 mt-3">
              <button
                type="submit"
                className="py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primaryGreen text-white "
              >
                Reset password
              </button>
            </div>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
