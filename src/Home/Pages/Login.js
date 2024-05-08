import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { getToken } from "../../../src/chat/api";
import { fetchUserData } from "../Store/Components/LoginHelper";
import LoginFunctions from "../Utils/Components/login_functions_component";
import NavBar from "../Components/home_navbar_component";

import ForgotModal from "../Components/login_forgot_modal_component";
import { NavBarLogo } from "../../assets/images";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    state,
    HandleEmailChange,
    HandlePasswordChange,
    HandleModalShow,
    HandleModalClose,
    HandleLoginSubmit,
  } = LoginFunctions();
  const navigate = useNavigate();

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
  return (
    <>
      <NavBar />
      <div className="flex flex-wrap max-h-screen w-full justify-center rounded-l-xl py-40">
        <div className="flex shadow-md rounded-xl">
          <div
            className="flex flex-wrap content-center justify-start rounded-l-xl bg-primaryOrange"
            style={{ width: "24rem", height: "32rem" }}
          >
            <div className="flex items-center justify-start space-x-3 ms-6">
              <img
                src={NavBarLogo}
                className=" rounded-full w-full h-12 mb-4"
              />
            </div>
            <div className="space-y-5 ms-6 text-white">
              <h1 className="lg:text-3xl xl:text-4xl xl:leading-snug font-extrabold">
                Enter your account and discover our services
              </h1>
              <p className="text-lg">You do not have an account?</p>
              <Link
                to="/Sign Up"
                className="inline-block flex-none px-4 py-3 border-2 rounded-lg font-medium border-primaryGreen bg-primaryGreen text-white no-underline"
              >
                Create account here
              </Link>
            </div>
          </div>

          <div
            className="flex flex-wrap content-center justify-center rounded-r-xl"
            style={{ width: "24rem", height: "32rem" }}
          >
            <div className="w-72">
              <h1 className="text-xl font-semibold">Log into Bloomfileds</h1>
              <small className="text-gray-400">
                Please enter your account !
              </small>

              <form
                className="mt-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSubmit();
                }}
              >
                <div className="mb-3">
                  <label className="mb-2 block text-xs font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    className="block w-full rounded-md border border-gray-300 focus:border-primaryOrange focus:outline-none focus:ring-1 focus:ring-primaryOrange py-1 px-1.5 "
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="mb-2 block text-xs font-semibold">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="*********"
                    className="block w-full rounded-md border border-gray-300 focus:border-primaryOrange focus:outline-none focus:ring-1 focus:ring-primaryOrange py-1 px-1.5"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <button
                  className="inline-block flex-none mt-2 px-5 py-2 border-2 rounded-lg font-medium border-primaryOrange bg-primaryOrange text-white"
                  onClick={async () => {
                    const error = await login(email, password, props.setToken);
                    if (error) {
                      console.error(error);
                    }
                  }}
                >
                  Login
                </button>
                <div className="mb-3 mt-2 flex flex-wrap content-center">
                  <a
                    className="text-xs font-semibold text-primaryOrange"
                    onClick={HandleModalShow}
                    style={{ cursor: "pointer" }}
                  >
                    Forgot password?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ForgotModal show={state.showModal} onHide={HandleModalClose} />
    </>
  );
}
