import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
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
                      className="rounded-5 fw-medium"
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
                      className="rounded-5 fw-medium"
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
              className="btn nav-link fs-5 mt-2 me-3 mb-2 rounded-4 fw-medium"
              id="buttonCard"
            >
              Back
            </Button>
          </Link>
        </div>
        <div className="col mt-auto">
          <Button
            className="btn nav-link fs-5 mt-2 me-3 mb-2 rounded-4 fw-medium"
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
  //! File Validation
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFile = (event) => {
    const selectedFile = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError("");
    } else {
      setFile(null);
      setError("Please select a valid image file (JPEG, PNG, GIF).");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission
    //!File validation
    // Handle file submission logic here
    if (file) {
      console.log("File:", file);
      // Perform further actions with the file, such as uploading to a server
    } else {
      setError("Please select a file to upload.");
    }
  };

  return (
    <Modal
      className="container-fluid"
      show={props.show}
      onHide={props.handleClose}
      style={{ border: "none", color: "white" }}
    >
      <Modal.Body id="BGmodal">
        <Modal.Header className="mb-3" closeButton>
          <Modal.Title>Add Counselor</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          {/* Name */}
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" required />
          </Form.Group>

          {/* Picture */}
          <Form.Group className="mt-3">
            <Form.Control type="file" accept="image/*" onChange={handleFile} />
            <Form.Text className="text-danger">{error}</Form.Text>
          </Form.Group>

          {/* Contact Number */}
          <Form.Group>
            <Form.Label className="mt-2">Contact Number</Form.Label>
            <Form.Control type="text" required />
          </Form.Group>

          {/* Email */}
          <Form.Group>
            <Form.Label className="mt-2">Contact Number</Form.Label>
            <Form.Control type="text" required />
          </Form.Group>

          <Modal.Footer>
            <Button
              className="rounded-5 fw-medium"
              variant="primary"
              type="submit"
              id="BtnSubmitAC"
            >
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const EditModal = (props) => {
  //! File Validation
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFile = (event) => {
    const selectedFile = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError("");
    } else {
      setFile(null);
      setError("Please select a valid image file (JPEG, PNG, GIF).");
    }
  };

  //! Submit Validation
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission
    //!File validation
    // Handle file submission logic here
    if (file) {
      console.log("File:", file);
      // Perform further actions with the file, such as uploading to a server
    } else {
      setError("Please select a file to upload.");
    }
  };

  return (
    <Modal
      className="container-fluid"
      show={props.show}
      onHide={props.handleClose}
      style={{ color: "white" }}
    >
      <Modal.Body id="BGmodal">
        <Modal.Header className="mb-3" closeButton>
          <Modal.Title>Edit Counselor</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          {/* Name */}
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" required />
          </Form.Group>

          {/* Picture */}
          <Form.Group className="mt-3">
            <Form.Control type="file" accept="image/*" onChange={handleFile} />
            <Form.Text className="text-danger">{error}</Form.Text>
          </Form.Group>

          <Modal.Footer className="mt-3">
            <Button
              variant="primary"
              type="submit"
              className=" rounded-5 fw-medium"
              id="BtnSubmitAC"
            >
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
