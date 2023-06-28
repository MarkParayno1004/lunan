import "../css/ViewAnswerWeek.css";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
export const ViewWeekTable = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div
      className="container-lg mt-5 pt-3 pb-4 ps-4 pe-3 rounded-4 fw-normal d-flex justify-content-center"
      id="VAWell"
    >
      <div className="container-fluid rounded-5 pt-4 ps-3" id="VABodyBG">
        <h1 className="fw-semibold">Daily Form Answers</h1>
        <table class="table table-success table-hover">
          <thead>
            <tr>
              <th scope="col">Form Number:</th>
              <th scope="col">Date Submitted:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span
                  onClick={() => handleShow()}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  1001
                </span>
                <ViewAnswer show={show} handleClose={handleClose} />
              </td>
              <td>06/28/2023</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ViewAnswer = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose} size="xl">
      <Modal.Body style={{ backgroundColor: "#4d455d", color: "#f5e9cf" }}>
        <Modal.Header closeButton>
          <Modal.Title>Form 1001 </Modal.Title>
        </Modal.Header>
        <table class="table table-success table-hover">
          <thead>
            <tr>
              <th scope="col">Question:</th>
              <th scope="col">Answer:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1. I have felt cheerful and in good spirits.</th>
              <td>Most of the time</td>
            </tr>
            <tr>
              <th scope="row">2. I have felt calm and relaxed.</th>
              <td>Most of the time</td>
            </tr>
            <tr>
              <th scope="row">3. I have felt active and vigorous.</th>
              <td>Most of the time</td>
            </tr>
            <tr>
              <th scope="row">4. I woke up feeling fresh and rested.</th>
              <td>Most of the time</td>
            </tr>
            <tr>
              <th scope="row">
                5. My daily life has been filled with things that interest me.
              </th>
              <td>Most of the time</td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
};
