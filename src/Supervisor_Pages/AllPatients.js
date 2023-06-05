import { useState } from "react";
import "../css/AllPatients";

export const AllPatients = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const filteredPatients = patientsData.filter(patient =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearch = event => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="container-fluid d-flex justify-content-center" id="apBG">
            <div className="container-lg mt-3 mb-3 rounded-4 fw-normal d-flex justify-content-center" id="CardBG">
                <h1 className="d-flex justify-content-center mt-3">All Patients List</h1>
                <input
                    type="text"
                    placeholder="Search counselors..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="search-input"
                />
                <table id="patient-table">
                <thead>
                    <tr>
                        <th>Picture</th>
                        <th>Name</th>
                        <th>Date Added</th>
                        <th>Counselor</th>
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
        </div>
    );
};