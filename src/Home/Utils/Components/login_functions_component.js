import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
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
  function HandleEmailChange(event) {
    setState({ email: event.target.value });
  }
  function HandlePasswordChange(event) {
    setState({ password: event.target.value });
  }
  function HandleModalShow() {
    setState({ showModal: true });
  }
  const HandleModalClose = () => {
    setState({ showModal: false });
  };
  const HandleLoginSubmit = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        state.email,
        state.password
      );
      setState({ email: "", password: "", loggedIn: true });
      const userUid = user.uid;
      sessionStorage.setItem("userUid", userUid);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid Username & Password",
        background: "#4B527E",
        color: "#f5e9cf",
      });
    }
  };

  return {
    state,
    HandleEmailChange,
    HandlePasswordChange,
    HandleModalShow,
    HandleModalClose,
    HandleLoginSubmit,
  };
};

export default LoginFunctions;
