import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/AllPatients.css";
 
export const AllCounselors = () => {
<<<<<<< HEAD
    const [searchQuery, setSearchQuery] = useState('');
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
    const filteredCounselors = counselorsData.filter(counselor =>
        counselor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
 
    const handleSearch = event => {
        setSearchQuery(event.target.value);
    };
 
    const handleEdit = counselorId => {
        // Handle edit functionality for the counselor with the given ID
    };
 
    const handleRemove = counselorId => {
        // Handle remove functionality for the counselor with the given ID
    };
 
    const handleAddCounselor = () => {
        // Handle adding a new counselor
    };
 
    return (
        <div className="container-fluid justify-content-center rounded-3 mt-3 mb-3 p-3" id="cardBG">
            <div className="row">
                <div className="col">
                </div>
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
                            <span className="input-group-text" id="search">Search</span>
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
                            {filteredCounselors.map(counselor => (
                                <tr key={counselor.id}>
                                <td>
                                    <img src={counselor.picture} alt={counselor.name} width="50" height="50" />
                                </td>
                                <td>{counselor.name}</td>
                                <td>{counselor.dateAdded}</td>
                                <td>{counselor.patients}</td>
                                <td>
                                    <button onClick={() => handleEdit(counselor.id)}>Edit</button>
                                </td>
                                <td>
                                    <button onClick={() => handleRemove(counselor.id)}>Remove</button>
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
                    <Link to="/Add Counselors" style={{ textDecoration: "none" }}>
                        <Button
                        className="btn nav-link fs-5 mt-2 me-3 mb-2 rounded-4"
                        id="buttonCard"
                        >
                        Add
                        </Button>
                    </Link>
                </div>
=======
  const [searchQuery, setSearchQuery] = useState("");
  const [counselorsData, setCounselorsData] = useState([
    // Replace with your actual counselor data
    {
      id: 1,
      name: "John Doe",
      picture: "john.jpg",
      dateAdded: "2022-01-01",
      patients: 10,
    },
    {
      id: 2,
      name: "Jane Smith",
      picture: "jane.jpg",
      dateAdded: "2022-02-02",
      patients: 5,
    },
    // Add more counselor objects as needed
  ]);

  const filteredCounselors = counselorsData.filter((counselor) =>
    counselor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleEdit = (counselorId) => {
    // Handle edit functionality for the counselor with the given ID
  };

  const handleRemove = (counselorId) => {
    // Handle remove functionality for the counselor with the given ID
  };

  const handleAddCounselor = () => {
    // Handle adding a new counselor
  };

  return (
    <div className="container-fluid d-flex justify-content-center" id="acBG">
      <div
        className="container-lg mt-3 mb-3 rounded-4 fw-normal d-flex justify-content-center"
        id="CardBG"
      >
        <div className="mt-3">
          <div class="row mb-3">
            <div class="col">
              <div className="d-flex justify-content-center align-items-center">
                <span className="fs-5">Counselor List</span>
              </div>
>>>>>>> 651c242c501ed4ae21f4796861fc6cc5d1278e63
            </div>
            <div class="col">
              <div className="d-flex justify-content-end">
                <input
                  className="form-control d-flex justify-content-end rounded-5"
                  type="text"
                  placeholder="Search patients..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>

          <div>
            <table className="counselor-table">
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

          <div className="d-flex justify-content-end">
            <button
              className="btn mt-3 fw-semibold"
              id="btnAddCounselor"
              onClick={handleAddCounselor}
            >
              Add New Counselor
            </button>
          </div>
        </div>
<<<<<<< HEAD
    )
}
=======
      </div>
    </div>
  );
};
>>>>>>> 651c242c501ed4ae21f4796861fc6cc5d1278e63
