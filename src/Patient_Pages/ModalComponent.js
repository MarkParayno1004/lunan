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

export const ModalComponent = (props) => {
  // useEffect(() => {
  //   const modalShownBefore = localStorage.getItem("modalShownBefore");
  //   if (!modalShownBefore) {
  //     setShowModal(true);
  //     localStorage.setItem("modalShownBefore", true);
  //   }
  // }, []);

  return (
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-center"
      centered
    >
      <Modal.Body className="myModal text-center">
        <Modal.Title className="fw-light" id="contained-modal-title-vcenter">
          Welcome Back, User!
        </Modal.Title>

        <p className="fw-light fs-5">How are you feeling today?</p>
        <div>
          <Link className="ms-3">
            <img
              src={pouting}
              style={{ width: 30 + "px" }}
              alt="pout"
              onClick={props.onHide}
            />
          </Link>
          <Link className="ms-3">
            <img
              src={cryingFace}
              alt="cryface"
              style={{ width: 30 + "px" }}
              onClick={props.onHide}
            />
          </Link>
          <Link className="ms-3">
            <img
              src={frowningFace}
              alt="frownface"
              style={{ width: 30 + "px" }}
              onClick={props.onHide}
            />
          </Link>
          <Link className="ms-3">
            <img
              src={neutralFace}
              alt="neutral"
              style={{ width: 30 + "px" }}
              onClick={props.onHide}
            />
          </Link>
          <Link className="ms-3">
            <img
              src={slightlySmile}
              style={{ width: 30 + "px" }}
              alt="slightsmile"
              onClick={props.onHide}
            />
          </Link>
          <Link className="ms-3">
            <img
              src={smilingFace}
              style={{ width: 30 + "px" }}
              alt="smileFace"
              onClick={props.onHide}
            />
          </Link>
          <Link className="ms-3">
            <img
              src={hugging}
              alt="hug"
              style={{ width: 30 + "px" }}
              onClick={props.onHide}
            />
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
};
