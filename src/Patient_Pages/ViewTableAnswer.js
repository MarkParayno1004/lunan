import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../css/ViewAnswerWell.css";
export const ViewTableWell = () => {
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
              <th scope="row">1. In general, I consider myself:</th>
              <td>Not a Happy Person</td>
            </tr>
            <tr>
              <th scope="row">
                2. Compared to most of my peers, I consider myself:
              </th>
              <td>Not a Happy Person</td>
            </tr>
            <tr>
              <th scope="row">
                3. Some people are generally very happy. They enjoy life
                regardless of what is going on, getting the most out of
                everything. To what extent does this characterization describe
                you?
              </th>
              <td>Not a Happy Person</td>
            </tr>
            <tr>
              <th scope="row">
                4. Some people are generally not very happy. Although they are
                not depressed, they never seem as happy as they might be. To
                what extent does this characterization describe you?
              </th>
              <td>Not a Happy Person</td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
};
