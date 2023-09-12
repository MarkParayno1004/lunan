import Modal from "react-bootstrap/Modal";
import { useState } from "react";
export const CounselorInfo = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} size="xl">
        <Modal.Body id="piModal">
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Handle Counselors
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

//!COUNSELOR DATA
const CounselorData = () => {
  return (
    <div className="patient-info rounded-5 mt-3 ps-5 pe-5 pb-3" id="piBG">
      <div className="row d-flex align-items-start d-flex justify-content-start pt-3 ps-3 patient-details">
        <div className="col-1 ">
          <img
            src=""
            className="patient-picture"
            style={{ width: 100 + "px" }}
          />
          Pic
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
                <span style={{ color: "red" }}>Micah Abalos</span>
              </div>
              <div className="col">
                <strong>Age: </strong>
                <span style={{ color: "red" }}>25</span>
              </div>
              <div className="col">
                <strong>Gender: </strong>
                <span style={{ color: "red" }}>Female</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Body Column */}
      {/*1st Row Body Column */}
      <div>
        <div className="mt-3">
          <div className="row">
            <div className="col">
              <h3>List of Patients:</h3>
            </div>
            <div className="col">
              <div class="input-group  d-flex justify-content-end mb-3">
                <input
                  type="text"
                  class="form-control"
                  aria-describedby="inputGroup-sizing-default"
                  placeholder="Patient Name..."
                  style={{ maxWidth: "50%" }}
                />
                <button class="input-group-text" id="inputGroup-sizing-default">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <table className="table table-dark table-hover ">
        <thead>
          <tr>
            <td>
              <strong>Name: </strong>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/*Input Patients List */}
            <td>Its yah boi Mark</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
