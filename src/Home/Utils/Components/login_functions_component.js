import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../../Store/Components/LoginHelper";
import { auth } from "../../../firebase/firebase-config";

const LoginFunctions = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    loggedIn: false,
    firstName: "",
    loading: false,
    showModal: false,
    setFirstName: "",
  });

  const navigate = useNavigate();

  function HandleEmailChange(event) {
    setState({ email: event.target.value });
  }

  function HandlePasswordChange(event) {
    setState({ password: event.target.value });
  }

  function HandleModalShow() {
    setState({ showModal: true });
    console.log("Modal is Open");
  }

  const HandleModalClose = () => {
    setState({ showModal: false });
    console.log("Modal is Closed");
  };

  const LoginHandleSubmit = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        state.email,
        state.password
      );
      console.log("User logged in");
      setState({ email: "", password: "", loggedIn: true });
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
    if (state.loggedIn) {
      const userUid = sessionStorage.getItem("userUid");
      console.log("Retrieved user UID:", userUid);
      if (userUid) {
        setState({ loading: true });
        fetchUserData(userUid, navigate, setState, state.setFirstName);
      } else {
        console.error("Invalid user UID:", userUid);
      }
    }
  }, [state.loggedIn]);

  return {
    state,
    HandleEmailChange,
    HandlePasswordChange,
    HandleModalShow,
    HandleModalClose,
    LoginHandleSubmit,
  };
};

export default LoginFunctions;
