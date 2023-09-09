import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
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
import { Form, Modal, Button } from "react-bootstrap";

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

  const fetchUserData = async (uid) => {
    // ... Your existing code for fetching user data ...
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
        fetchUserData(userUid);
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
      {/* ... Your existing code ... */}
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
      </div>
      <AddModal show={showForget} onHide={handleCloseForget} />
    </>
  );
};

const AddModal = (props) => {
  const [localFormData, setLocalFormData] = useState({
    email: "",
  });

  const handleForgetPassword = async (event) => {
    event.preventDefault();
    console.log("inside forget password");
    // Add your logic here to handle the password reset request
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