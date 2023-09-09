import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
export const PatientInfo = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} size="xl">
        <Modal.Body id="piModal">
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Handling Counselor
            </Modal.Title>
          </Modal.Header>
          <div className="container-fluid">
            <PatientData />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

const PatientData = () => {
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
        <div className="row">
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

        {/*2nd Row Body Column */}
        <div className="row">
          <div className="col">
            <strong>Sexual preference: </strong>
            <span style={{ color: "red" }}></span>
          </div>
          <div className="col">
            <strong>Marital status: </strong>
            <span style={{ color: "red" }}></span>
          </div>
          <div className="col">
            <strong>Previous psychotherapy: </strong>
            <span style={{ color: "red" }}></span>
          </div>
        </div>

        {/*3rd Row Body Column */}
        <div className="row">
          <div className="col">
            <strong>Current prescribed psychiatric medications:</strong>
            <span style={{ color: "red" }}></span>
          </div>
          <div className="col">
            <strong>Emergency contact person name: </strong>
            <span style={{ color: "red" }}></span>
          </div>
          <div className="col">
            <strong>Emergency contact person number: </strong>
            <span style={{ color: "red" }}></span>
          </div>
        </div>

        {/*4th Row Body Column */}
        <div className="row">
          <div className="col">
            <strong>Suicidal thoughts:</strong>
            <span style={{ color: "red" }}></span>
          </div>
          <div className="col">
            <strong>Emergency contact person name: </strong>
            <span style={{ color: "red" }}></span>
          </div>
          <div className="col">
            <strong>Emergency contact person number: </strong>
            <span style={{ color: "red" }}></span>
          </div>
        </div>
      </div>

      {/*Buttons */}
      <div className="button-group d-flex justify-content-end pb-3 pe-4 mt-5">
        <button className="me-2 rounded-5 fw-semibold" id="viewButton">
          View Assignment
        </button>

        <button className="me-2 rounded-5 fw-semibold" id="viewButton">
          View Case Notes
        </button>

        <button className="me-2 rounded-5 fw-semibold" id="viewButton">
          View Weekly Form
        </button>

        <button className="me-2 rounded-5 fw-semibold" id="viewButton">
          View Daily Form
        </button>

        {/* 
          <ViewModalAssign
            show={showAss}
            handleClose={handleCloseAss}
            selectedPatientUID={props.selectedPatientUID}
          />

          <ViewCaseNotes show={showCase} handleClose={handleCloseCase} />
          <ViewWeeklyForm show={showWeek} handleClose={handleCloseWeek} />
          <ViewWellnessForm
            show={showWell}
            handleClose={handleCloseWell}
          /> */}
      </div>
    </div>
  );
};
