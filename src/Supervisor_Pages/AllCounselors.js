import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "../css/AllCounselors.css";

export const AllCounselors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const counselorsData = [
    {
      id: 1,
      picture: "counselor1.jpg",
      name: "John Doe",
      dateAdded: "2023-06-01",
      patients: 5,
    },
    {
      id: 2,
      picture: "counselor2.jpg",
      name: "Jane Smith",
      dateAdded: "2023-06-02",
      patients: 3,
    },
    // Add more counselor data as needed
  ];
  const filteredCounselors = counselorsData.filter((counselor) =>
    counselor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemove = (counselorId) => {
    // Handle remove functionality for the counselor with the given ID
  };

  const handleEdit = (counselorId) => {
    // Handle edit functionality for the counselor with the given ID
  };

  const handleAddCounselor = () => {
    // Handle adding a new counselor
  };

  const handleSearch = () => {};

  //! Modal Behaviour
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div
      className="container-lg justify-content-center rounded-3 mt-3 mb-3 p-3"
      id="CardBG"
    >
      <div className="row">
        <div className="col"></div>
        <div className="col-4">
          <h2 className="text-center mt-4 mb-4">Counsellor List</h2>
        </div>
        <div className="col">
          <div className="input-group mt-4">
            <input
              type="text"
              placeholder="Counselor Name..."
              value={searchQuery}
              onChange={handleSearch}
              aria-describedby="search"
              className="w-25 form-control"
            />
            <div className="input-group-append">
              <span className="input-group-text" id="search">
                Search
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column">
        <div className="flex-grow-1">
          <table className="table table-dark">
            <thead>
              <tr>
                <th>Picture</th>
                <th>Name</th>
                <th>Date Added</th>
                <th>Patients</th>
                <th>Edit</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {filteredCounselors.map((counselor) => (
                <tr key={counselor.id}>
                  <td>
                    <img
                      src={counselor.picture}
                      alt={counselor.name}
                      width="50"
                      height="50"
                    />
                  </td>
                  <td>{counselor.name}</td>
                  <td>{counselor.dateAdded}</td>
                  <td>{counselor.patients}</td>
                  <td>
                    <button onClick={() => handleEdit(counselor.id)}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleRemove(counselor.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col mt-auto">
          <Link to="/Supervisor Dashboard" style={{ textDecoration: "none" }}>
            <Button
              className="btn nav-link fs-5 mt-2 me-3 mb-2 rounded-4"
              id="buttonCard"
            >
              Back
            </Button>
          </Link>
        </div>
        <div className="col mt-auto">
          <Button
            className="btn nav-link fs-5 mt-2 me-3 mb-2 rounded-4"
            id="buttonCard"
            onClick={handleShow}
          >
            Add
          </Button>
          <AddModal
            show={show}
            onHide={handleClose}
            handleClose={handleClose}
          />
        </div>
      </div>
    </div>
  );
};

const AddModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/*Name: */}
        <div>
          <label for="NameInput" class="form-label">
            Name:
          </label>
        </div>
        <div class="input-group flex-nowrap">
          <input
            type="text"
            id="NameInput"
            class="form-control"
            placeholder="Name"
            required
          />
        </div>

        {/*Picture: */}
        <div class="mt-3">
          <label for="formFileMultiple" class="form-label">
            Picture:
          </label>
          <input
            class="form-control"
            type="file"
            id="formFileMultiple"
            multiple
          />
        </div>

        {/*Contact Number: */}
        <div>
          <label for="ContactNumber" class="form-label mt-3">
            Contact Number:
          </label>
        </div>
        <div class="input-group flex-nowrap">
          <input type="text" class="form-control" id="ContactNumber" />
        </div>

        {/*Email: */}
        <div>
          <label for="EmailInput" class="form-label mt-3">
            Email:
          </label>
        </div>
        <div class="input-group flex-nowrap">
          <input type="text" class="form-control" id="EmailInput" />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={props.handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
