import Modal from "react-bootstrap/Modal";
import { useState, useRef } from "react";
import Swal from "sweetalert2";
export const CounselorInfo = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} size="xl">
        <Modal.Body id="piModal">
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Handle Counselor
            </Modal.Title>
          </Modal.Header>
          <div className="container-fluid">
            <CounselorData />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

//!PATIENT DATA
const CounselorData = () => {
  return (
    <div className="patient-info rounded-5 mt-3 ps-5 pe-5" id="piBG">
      <div className="row d-flex align-items-start d-flex justify-content-start pt-3 ps-3 patient-details">
        <div className="col-1 ">
          <img
            src=""
            className="patient-picture"
            style={{ width: 100 + "px" }}
          />
        </div>
        <div
          className="col-8 ms-5 d-flex justify-content-center rounded-5"
          id="colBG"
        >
          <div className="container-fluid patient-text">
            {/*1st Row Header*/}
            <div className="row">
              <div className="col">
                <strong>Name: </strong>
                <span style={{ color: "red" }}></span>
              </div>
              <div className="col">
                <strong>Age: </strong>
                <span style={{ color: "red" }}></span>
              </div>
              <div className="col">
                <strong>Gender: </strong>
                <span style={{ color: "red" }}></span>
              </div>
            </div>

            {/*2nd Row Header*/}
            <div className="row">
              <div className="col">
                <strong>Birthday: </strong>
                <span style={{ color: "red" }}></span>
              </div>
              <div className="col">
                <strong>Address: </strong>
                <span style={{ color: "red" }}></span>
              </div>
              <div className="col">
                <strong>Assigned Counselor: </strong>
                <span style={{ color: "red" }}></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Body Column */}
      <div className="container-fluid rounded-5 mt-3 pt-2 pb-2 pe-4" id="colBG">
        {/*1st Row Body Column */}
        <div className="row ms-2 mt-2 rounded-5 mb-3" id="bottomBorder">
          <div className="col">
            <strong>Cell Phone Number: </strong>
            <span style={{ color: "red" }}></span>
          </div>
          <div className="col">
            <strong>Home Phone Number: </strong>
            <span style={{ color: "red" }}></span>
          </div>
          <div className="col">
            <strong>Email: </strong>
            <span style={{ color: "red" }}></span>
          </div>
        </div>
      </div>
    </div>
  );
};
