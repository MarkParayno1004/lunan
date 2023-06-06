import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/AllPatients.css";
 
export const AllCounselors = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [counselorsData, setCounselorsData] = useState([
        // Replace with your actual counselor data
        { id: 1, name: "John Doe", picture: "john.jpg", dateAdded: "2022-01-01", patients: 10 },
        { id: 2, name: "Jane Smith", picture: "jane.jpg", dateAdded: "2022-02-02", patients: 5 },
        // Add more counselor objects as needed
    ]);


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

        <div className="container-fluid d-flex justify-content-center" id="acBG">
            <div className="container-lg mt-3 mb-3 rounded-4 fw-normal d-flex justify-content-center" id="CardBG">
                <h1 className="d-flex justify-content-center mt-3">Counselor List</h1>
                <input
                    type="text"
                    placeholder="Search patients..."
                    value={searchQuery}
                    onChange={handleSearch}
                    style={{ float: 'right' }}
                />
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
                <button onClick={handleAddCounselor}>Add New Counselor</button>

            </div>
        </div>
    )
}
