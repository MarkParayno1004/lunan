import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, firestore } from "../firebase/firebase-config";
import "../css/Login.css";
//twilio needs
import { getToken } from "../../src/chat/api";
// import { Client } from "@twilio/conversations";
// import { useSelector } from "react-redux";
//twilio needs
import "../css/AllCounselors.css";
import BloomFieldsLogo from "../img/Bloomfields_logo_only.png";
import { Navbar } from "../Navbar";
import { Form, Modal, Button, Alert } from "react-bootstrap";
import {
  fetchUserData,
  loginWithEmailAndPassword,
  sendResetPasswordEmail,
} from "./LoginBackend/LoginHelper"; // Adjust the import path accordingly

// function obfuscatePattern(pattern) {
//   // Replace characters with their ASCII codes, e.g., 'a' becomes '&#97;'
//   return pattern.replace(/./g, (char) => `&#${char.charCodeAt(0)};`);
// }

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const [client, setClient] = useState();
  // const token = useSelector((state) => state.token);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
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
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid Username & Password",
        background: "#4B527E",
        color: "#f5e9cf",
      });
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

  //for twilio
  async function login(username, password, setToken) {
    console.log("Username:", username);
    console.log("Password:", password);

    try {
      const token = await getToken(username.trim(), password);
      console.log("Token:", token); // Log the token
      if (token === "") {
        console.log("Received an empty token from backend.");
        return "Received an empty token from backend.";
      }

      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      setToken(token);
      return "";
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) {
        message = error.message;
      } else {
        message = String(error);
      }
      return message;
    }
  }

  // useEffect(() => {
  //   const client = new Client(token);
  //   setClient(client);
  // }, []);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <Navbar />
      <div className="container-fluid text-center " id="loginBG">
        <div className="row d-flex align-items-center" id="rowHeight">
          {screenWidth <= 768 ? null : (
            <div className="col ">
              <img src={BloomFieldsLogo} style={{ width: "40%" }} alt="Logo" />
            </div>
          )}

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
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleSubmit();
                  }}
                >
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
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      className="d-flex align-items-center justify-content-center"
                      id="LoginButton"
                      onClick={async () => {
                        const error = await login(
                          email,
                          password,
                          props.setToken
                        );
                        if (error) {
                          // Handle the error, e.g., set a form error state
                          console.error(error);
                        }
                      }}
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
      <ForgotModal show={showForget} onHide={handleCloseForget} />
    </>
  );
};

const ForgotModal = (props) => {
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
};
