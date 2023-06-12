import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../css/PatientList.css";

export const PatientList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  //   const filteredPatients = patientsData.filter((patient) =>
  //     patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  //   );

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  //! Modal Behaviour
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div
      className="container-fluid d-flex justify-content-center"
      id="patientBG"
    >
      <div
        className="container-lg mt-3 mb-3 rounded-4 fw-normal"
        id="patienCard"
      >
        <div>
          {/*Header */}
          <div className="container-fluid">
            <div className="row mt-4">
              <div className="col-7 d-flex justify-content-end d-flex align-items-center">
                <h1 className="fw-normal">Patient List</h1>
              </div>
              <div className="col-4 d-flex justify-content-center">
                <input
                  type="text"
                  placeholder="Search counselors..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="search-input rounded-5"
                />
              </div>
            </div>
          </div>

          {/*Body */}
          <div className="mt-5">
            <Button
              className="container-fluid d-flex justify-content-start rounded-5"
              id="ButtonCard"
              style={{ width: 50 + "%" }}
              onClick={handleShow}
            >
              <div className="mt-1">
                <img
                  className="rounded-5"
                  src="https://i.pinimg.com/564x/58/51/2e/58512eb4e598b5ea4e2414e3c115bef9.jpg"
                  style={{ width: 100 + "px", height: 80 + "px" }}
                />
              </div>
              <div>
                <ul style={{ listStyleType: "none" }}>
                  <li className="d-flex justify-content-start">
                    <span className="fw-semibold fs-5">Patient A</span>
                  </li>
                  <li>Date Added</li>
                  <li>Last Session</li>
                </ul>
              </div>
            </Button>
            <ModalPatient show={show} handleClose={handleClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalPatient = (props) => {
  const [showWellness, setWellness] = useState("");
  return (
    // <Modal
    //   dialogClassName="modal-90w"
    //   aria-labelledby="example-custom-modal-styling-title"
    //   show={props.show}
    //   onHide={props.handleClose}
    // >
    //   <Modal.Body className="container-lg">
    //     <Modal.Header closeButton>
    //       <Modal.Title>View Patients Forms</Modal.Title>
    //     </Modal.Header>
    //     <div className="d-flex justify-content-center mt-3">
    //       {/*Wellness Form Button Modal */}
    //       <div className="me-3">
    //         <Button
    //           onClick={() => {
    //             setWellness("WellnessForm");
    //           }}
    //         >
    //           Wellness Form
    //         </Button>
    //       </div>

    //       {/*Weekly Form Button Modal */}
    //       <div>
    //         <Button
    //           onClick={() => {
    //             setWellness("WeeklyForm");
    //           }}
    //         >
    //           Weekly Form
    //         </Button>
    //       </div>
    //     </div>

    //     <div className="">
    //       {showWellness === "WellnessForm" ? (
    //         <TableWellForm />
    //       ) : (
    //         <TableWeekForm />
    //       )}
    //     </div>
    //   </Modal.Body>
    // </Modal>
    <Modal
      show={props.show}
      onHide={props.handleClose}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          Custom Modal Styling
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
          commodi aspernatur enim, consectetur. Cumque deleniti temporibus ipsam
          atque a dolores quisquam quisquam adipisci possimus laboriosam.
          Quibusdam facilis doloribus debitis! Sit quasi quod accusamus eos
          quod. Ab quos consequuntur eaque quo rem! Mollitia reiciendis porro
          quo magni incidunt dolore amet atque facilis ipsum deleniti rem!
        </p>
      </Modal.Body>
    </Modal>
  );
};

const TableWeekForm = () => {
  return (
    <div className="container-fluid">
      <h1>TABLE RESULY OF WEEKLY FORM</h1>
    </div>
  );
};
const TableWellForm = () => {
  return (
    <div className="container-fluid">
      <h5>TABLE RESULT OF WELLNESS FORM</h5>
    </div>
  );
};
