import { SIGNUPCARD } from "./SignUp_card";
import NavBar from "../Components/home_navbar_component";
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PP from "../../assets/img/PrivacyPolicy.png";
import "../../css/PrivacyPolicyScroll.css";
import "../../css/SignUp.css";
import { SignUpPageBG } from "../../assets/images";
import HomePrivacyPolicyComponent from "../Components/home_privacy_policy_component";
export default function SignUp() {
  return (
    <>
      <PrivacyModal />
      <NavBar />
      <div
        className="container grid justify-items-center items-center h-129 bg-cover bg-center"
        style={{ backgroundImage: `url(${SignUpPageBG})` }}
      >
        <SIGNUPCARD />
      </div>
    </>
  );
}

const PrivacyModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    // Call handleShow when the component mounts to open the modal automatically
    handleShow();
  }, []); // The empty dependency array ensures that this effect runs once when the component is mounted

  const navigate = useNavigate();
  const handleDecline = () => {
    handleClose();
    // Navigate to the home page when "Decline" is clicked
    document.body.style.overflow = "auto";
    navigate("/");
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      style={{ overflowY: "scroll" }}
    >
      <Modal.Body>
        <div className="d-flex justify-content-center">
          <img src={PP} />
        </div>
        <div className="custom-scroll-privacy">
          <HomePrivacyPolicyComponent />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleDecline}>
          Decline
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Accept
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
