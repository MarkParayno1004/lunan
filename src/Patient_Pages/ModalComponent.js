import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/ModalComponent.css";
import pouting from "../Patient_Pages/img/pouting.png";
import cryingFace from "../Patient_Pages/img/cryingFace.png";
import frowningFace from "../Patient_Pages/img/frowningFace.png";
import neutralFace from "../Patient_Pages/img/neutralFace.png";
import slightlySmile from "../Patient_Pages/img/slightlySmile.png";
import smilingFace from "../Patient_Pages/img/smilingFace.png";
import hugging from "../Patient_Pages/img/hugging.png";
import { Link } from "react-router-dom";

export const ModalComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [getValueEmoji, setValueEmoji] = useState("");

  useEffect(() => {
    const modalShownBefore = localStorage.getItem("modalShownBefore");
    if (!modalShownBefore) {
      setShowModal(true);
      localStorage.setItem("modalShownBefore", true);
    }
  }, []);

  const handleClose = (e) => {
    setShowModal(false);
    setValueEmoji(e.target.alt);
  };

  return (
    <div className="container-fluid">
      <Modal
        show={showModal}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="myModal" closeButton>
          <Modal.Title className="fw-light" id="contained-modal-title-vcenter">
            Welcome Back, User!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="myModal text-center">
          <p className="fw-light fs-5">How are you feeling today?</p>
          <div>
            <Link className="ms-3">
              <img
                src={pouting}
                style={{ width: 30 + "px" }}
                alt="pout"
                onClick={handleClose}
              />
            </Link>
            <Link className="ms-3">
              <img
                src={cryingFace}
                alt="cryface"
                style={{ width: 30 + "px" }}
                onClick={handleClose}
              />
            </Link>
            <Link className="ms-3">
              <img
                src={frowningFace}
                alt="frownface"
                style={{ width: 30 + "px" }}
                onClick={handleClose}
              />
            </Link>
            <Link className="ms-3">
              <img
                src={neutralFace}
                alt="neutral"
                style={{ width: 30 + "px" }}
                onClick={handleClose}
              />
            </Link>
            <Link className="ms-3">
              <img
                src={slightlySmile}
                style={{ width: 30 + "px" }}
                alt="slightsmile"
                onClick={handleClose}
              />
            </Link>
            <Link className="ms-3">
              <img
                src={smilingFace}
                style={{ width: 30 + "px" }}
                alt="smileFace"
                onClick={handleClose}
              />
            </Link>
            <Link className="ms-3">
              <img
                src={hugging}
                alt="hug"
                style={{ width: 30 + "px" }}
                onClick={handleClose}
              />
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
