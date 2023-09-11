import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, firestore } from "../firebase/firebase-config";
import "../css/Login.css";
import "../css/AllCounselors.css";
import BloomFieldsLogo from "../img/Bloomfields_logo_only.png";
import { Navbar } from "../Navbar";
import {Form, Modal, Button, Alert} from "react-bootstrap";
import { fetchUserData, loginWithEmailAndPassword, sendResetPasswordEmail } from "./LoginBackend/LoginHelper"; // Adjust the import path accordingly

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in");
      setEmail("");
      setPassword("");
      setLoggedIn(true);
      const userUid = user.uid;
      sessionStorage.setItem("userUid", userUid);
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      const userUid = sessionStorage.getItem("userUid");
      console.log("Retrieved user UID:", userUid);
      if (userUid) {
        setLoading(true);
        // Pass setLoading as a parameter to fetchUserData
        fetchUserData(userUid, navigate, setLoading, setFirstName);
      } else {
        console.error("Invalid user UID:", userUid);
      }
    }
  }, [loggedIn]);

  const [showForget, setShowForget] = useState(false);

  const handleCloseForget = () => setShowForget(false);

  const handleForget = () => setShowForget(true);

  return (
    <>
      <Navbar />
      <div className="container-fluid text-center " id="loginBG">
        <div className="row d-flex align-items-center" id="rowHeight">
          <div className="col ">
            <img src={BloomFieldsLogo} style={{ width: "40%" }} alt="Logo" />
          </div>
          <div
            className="col d-flex align-items-center d-flex justify-content-center"
            id="loginInput"
          >
            <div className="mb-5" style={{ width: "60%" }}>
              <div className="mt-5">
                <p
                  style={{ color: "white", fontSize: "50px" }}
                  className="fs-1"
                >
                  Login
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="input-group flex-nowrap">
                    <input
                      type="email"
                      className="form-control mt-3"
                      placeholder="Email"
                      aria-label="Email"
                      aria-describedby="addon-wrapping"
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                  </div>
                  <div className="input-group flex-nowrap">
                    <input
                      type="password"
                      className="form-control mt-3"
                      placeholder="Password"
                      aria-label="Password"
                      aria-describedby="addon-wrapping"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <Link
                      className="fw-light mt-2"
                      onClick={handleForget} // Open the modal when the link is clicked
                      style={{
                        color: "white",
                        textDecoration: "none",
                        fontSize: "18px",
                      }}
                    >
                      Forgot Password
                    </Link>
                    <ForgotModal show={showForget} onHide={handleCloseForget} />
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      className="d-flex align-items-center justify-content-center"
                      id="LoginButton"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ForgotModal = (props) => {
  const [localFormData, setLocalFormData] = useState({
    email: '',
  });

  const [resetStatus, setResetStatus] = useState({
    message: '',
    success: false,
  });

  const handleForgetPassword = async (event) => {
    event.preventDefault();
  
    try {
      await sendPasswordResetEmail(auth, localFormData.email);
      setResetStatus({
        message: 'Password reset instructions sent to your email.',
        success: true,
      });
    } catch (error) {
      console.error('Password reset error:', error);
      setResetStatus({
        message: 'Email is not existing in the system.',
        success: false,
      });
    }
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      style={{ border: 'none', color: 'white' }}
    >
      <Modal.Body id="BGmodal">
        <Modal.Header className="mb-3" closeButton>
          <Modal.Title>Forget Password</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleForgetPassword}>
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
            variant={resetStatus.success ? 'success' : 'danger'}
            className="mt-3"
          >
            {resetStatus.message}
          </Alert>
        )}
          </Form.Group>
          <Modal.Footer className="mt-3">
            <Button
              className="rounded-5 fw-medium"
              variant="primary"
              type="submit"
              id="BtnSubmitAC"
            >
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};