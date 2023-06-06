import React from "react";
import "../css/ViewAssignments";

export const ViewAssignments = () => {
    const [activeTab, setActiveTab] = useState('turnedIn');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const turnedInAssignments = [
        { id: 1, patientName: 'John Doe', dateGiven: '2023-05-30', homeworkName: 'Math Assignment' },
        // Add more turned-in assignments
    ];

    const verifiedAssignments = [
        { id: 1, patientName: 'Jane Smith', dateGiven: '2023-05-31', homeworkName: 'Science Assignment' },
        // Add more verified assignments
    ];

    return (
        <div className="container-fluid d-flex justify-content-center" id="apBG">
            <div className="container-lg mt-3 mb-3 rounded-4 fw-normal d-flex justify-content-center" id="CardBG">
                <h1 className="d-flex justify-content-center mt-3">Assignments</h1>
                <div className="view-assignments">
                    <div className="tabs">
                        <button
                        className={activeTab === 'turnedIn' ? 'active' : ''}
                        onClick={() => handleTabChange('turnedIn')}
                        >
                        Turned-in Assignments
                        </button>
                        <button
                        className={activeTab === 'verified' ? 'active' : ''}
                        onClick={() => handleTabChange('verified')}
                        >
                        Verified Assignments
                        </button>
                    </div>
                    {activeTab === 'turnedIn' && (
                        <table className="assignments-table">
                        <thead>
                            <tr>
                            <th>Patient Name</th>
                            <th>Date Given</th>
                            <th>Homework Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {turnedInAssignments.map((assignment) => (
                            <tr key={assignment.id}>
                                <td>{assignment.patientName}</td>
                                <td>{assignment.dateGiven}</td>
                                <td>{assignment.homeworkName}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    )}
                    {activeTab === 'verified' && (
                        <table className="assignments-table">
                        <thead>
                            <tr>
                            <th>Patient Name</th>
                            <th>Date Given</th>
                            <th>Homework Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {verifiedAssignments.map((assignment) => (
                            <tr key={assignment.id}>
                                <td>{assignment.patientName}</td>
                                <td>{assignment.dateGiven}</td>
                                <td>{assignment.homeworkName}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    )}
                    </div>
            </div>
        </div>
    )
}