import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/AllPatients.css";

export const NewPatients = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const patientsData = [
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
    const filteredPatients = patientsData.filter(patient =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const handleSearch = event => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="container-fluid justify-content-center rounded-3 mt-3 mb-3 p-3" id="cardBG">
            <div className="row">
                <div className="col">
                </div>
                <div className="col-4">
                    <h2 className="text-center mt-4 mb-4">New Patient List</h2>
                </div>
                <div className="col">
                    <div className="input-group mt-4">
                        <input 
                            type="text" 
                            placeholder="Patient Name..." 
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
                <div className="d-flex flex-column">
                    <div className="flex-grow-1">
                        <table className="table table-dark">
                            <thead>
                            <tr>
                                <th scope="col">Picture</th>
                                <th scope="col">Name</th>
                                <th scope="col">Date Added</th>
                                <th scope="col">Counselor</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredPatients.map(patient => (
                                <tr key={patient.id}>
                                <td>
                                    <img src={patient.picture} alt={patient.name} width="50" height="50" />
                                </td>
                                <td>{patient.name}</td>
                                <td>{patient.dateAdded}</td>
                                <td>{patient.counselor}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-auto">
                    <Link to="/Supervisor Dashboard" style={{ textDecoration: "none" }}>
                        <Button
                        className="btn nav-link fs-5 mt-2 me-3 mb-2 rounded-4"
                        id="buttonCard"
                        >
                        Back
                        </Button>
                    </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}