import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/ModalComponent.css";
import Image from "react-bootstrap/Image";
import pouting from "../Patient_Pages/img/pouting.png";
import cryingFace from "../Patient_Pages/img/cryingFace.png";
import frowningFace from "../Patient_Pages/img/frowningFace.png";
import neutralFace from "../Patient_Pages/img/neutralFace.png";
import { Link } from "react-router-dom";

export const ModalComponent = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const modalShownBefore = localStorage.getItem("modalShownBefore");
    if (!modalShownBefore) {
      setShowModal(true);
      localStorage.setItem("modalShownBefore", true);
    }
  }, []);

  const handleClose = () => setShowModal(false);

  return (
    <div className="container-fluid">
      {/* <Modal className="my-modal-content" show={showModal} onHide={handle
      Close}>
        <Modal.Title className="my-modal-body">
          This is the modal content.
          <div>
            <Link onClick={handleClose}>
              <img src={pouting} style={{ width: 30 + "px" }} />
            </Link>
            <Link class="ms-3" onClick={handleClose}>
              <img src={cryingFace} style={{ width: 30 + "px" }} />
            </Link>
            <Link class="ms-3" onClick={handleClose}>
              <img src={frowningFace} style={{ width: 30 + "px" }} />
            </Link>
            <Link class="ms-3" onClick={handleClose}>
              <img src={frowningFace} style={{ width: 30 + "px" }} />
            </Link>
          </div>
        </Modal.Title>
      </Modal> */}

      <Modal
        show={showModal}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
};
