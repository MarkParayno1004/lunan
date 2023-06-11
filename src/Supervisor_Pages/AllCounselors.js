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

  //! Modal Behaviour for Add Button
  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  //! Modal Behaviour for Edit Button
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);
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
                    <button
                      className="rounded-5"
                      id="editCounselor"
                      onClick={handleShowEdit}
                    >
                      Edit
                    </button>
                    <EditModal
                      show={showEdit}
                      onHide={handleCloseEdit}
                      handleClose={handleCloseEdit}
                    />
                  </td>
                  <td>
                    <button
                      id="removeCounselor"
                      className="rounded-5"
                      onClick={() => handleRemove(counselor.id)}
                    >
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
            onClick={handleShowAdd}
          >
            Add
          </Button>
          <AddModal
            show={showAdd}
            onHide={handleCloseAdd}
            handleClose={handleCloseAdd}
          />
        </div>
      </div>
    </div>
  );
};

const AddModal = (props) => {
  //! Validation
  const [name, setName] = useState("");
  const [picture, setPicture] = useState(null);
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePictureChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const handleContactNumberChange = (e) => {
    setContactNumber(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    if (name && contactNumber && email) {
      // Perform the submit action
      props.handleClose();
    } else {
      // Show validation errors
      if (!name) {
        document.getElementById("NameInput").classList.add("is-invalid");
      } else if (name) {
        document.getElementById("NameInput").classList.remove("is-invalid");
      }
      if (!contactNumber) {
        document.getElementById("ContactNumber").classList.add("is-invalid");
      } else if (contactNumber) {
        document.getElementById("ContactNumber").classList.remove("is-invalid");
      }
      if (!email) {
        document.getElementById("EmailInput").classList.add("is-invalid");
      } else if (contactNumber) {
        document.getElementById("EmailInput").classList.remove("is-invalid");
      }
    }
  };

  return (
    <Modal
      className="container-fluid"
      show={props.show}
      onHide={props.handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Counselor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Name */}
        <div>
          <label htmlFor="NameInput" className="form-label">
            Name:
          </label>
        </div>
        <div className="input-group flex-nowrap">
          <input
            type="text"
            id="NameInput"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>

        {/* Picture */}
        <div className="mt-3">
          <label htmlFor="formFileMultiple" className="form-label">
            Picture:
          </label>
          <input
            className="form-control"
            type="file"
            id="formFileMultiple"
            multiple
            onChange={handlePictureChange}
          />
        </div>

        {/* Contact Number */}
        <div>
          <label htmlFor="ContactNumber" className="form-label mt-3">
            Contact Number:
          </label>
        </div>
        <div className="input-group flex-nowrap">
          <input
            type="text"
            className="form-control"
            id="ContactNumber"
            pattern="[0-10]{11}"
            value={contactNumber}
            onChange={handleContactNumberChange}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="EmailInput" className="form-label mt-3">
            Email:
          </label>
        </div>
        <div className="input-group flex-nowrap">
          <input
            type="email"
            className="form-control"
            id="EmailInput"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const EditModal = (props) => {
  const [editName, setEditName] = useState("");
  const [picture, ediSetPicture] = useState(null);
  const [nameError, setNameError] = useState("");

  const handleNameChange = (e) => {
    const name = e.target.value;
    setEditName(name);
    setNameError(name ? "" : "Name is required");
  };

  const handlePictureChange = (e) => {
    ediSetPicture(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (editName) {
      // Perform the submit action
      props.handleClose();
    }
  };

  return (
    <Modal
      className="container-fluid"
      show={props.show}
      onHide={props.handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Counselor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Name */}
        <div>
          <label htmlFor="EditNameInput" className="form-label">
            Name:
          </label>
        </div>
        <div className="input-group flex-nowrap">
          <input
            type="text"
            id="EditNameInput"
            className={`form-control ${nameError && "is-invalid"}`}
            placeholder="Name"
            value={editName}
            onChange={handleNameChange}
            required
          />
          {nameError && <div className="invalid-feedback">{nameError}</div>}
        </div>

        {/* Picture */}
        <div className="mt-3">
          <label htmlFor="formFileMultiple" className="form-label">
            Picture:
          </label>
          <input
            className="form-control"
            type="file"
            id="formFileMultiple"
            multiple
            onChange={handlePictureChange}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
