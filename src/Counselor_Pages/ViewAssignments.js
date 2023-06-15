import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import "../css/ViewAssignments.css";

export const ViewAssignments = () => {
    const [activeTab, setActiveTab] = useState('turnedIn');
    const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

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
            <div className="container mt-3 mb-3 rounded-4 fw-normal justify-content-center" id="CardBG">
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
                        <div className="d-flex justify-content-center">
                            <div className="row">
                                <div className="col">
                                    <button className="rounded-2" id="buttonAssTab" onClick={handleShow}>
                                        <h5 className="d-flex justify-content-start mt-2">Patient Name: John Doe</h5>
                                        <p className="d-flex justify-content-start">Activity 1: Journal and Drawing Entry</p>
                                        <p className="d-flex justify-content-start">Turned in on: March 8, 2023</p>
                                    </button>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Body id="modalBG">
                                            <div style={{ color: "white" }}>
                                                <Modal.Title>Activity #1</Modal.Title>
                                                <div id="modalContainer">
                                                    <p style={{ color:"black" }}>
                                                        JournalEntry.pdf
                                                    </p>
                                                </div>
                                                <div className="d-flex justify-content-end mt-3">
                                                    <Button variant="primary" type="submit" id="verifyButton">
                                                        Verify
                                                    </Button>
                                                </div>
                                            </div>
                                        </Modal.Body>
                                    </Modal>
                                </div>
                                <div className="col">
                                    <button className="rounded-2" id="buttonAssTab" onClick={handleShow}>
                                        <h5 className="d-flex justify-content-start mt-2">Patient Name: Jane Doe</h5>
                                        <p className="d-flex justify-content-start">Activity 1: Journal and Drawing Entry</p>
                                        <p className="d-flex justify-content-start">Turned in on: March 10, 2023</p>
                                    </button>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Body id="modalBG">
                                            <div style={{ color: "white" }}>
                                                <Modal.Title>Activity #1</Modal.Title>
                                                <div id="modalContainer">
                                                    <p style={{ color:"black" }}>
                                                        JournalEntry.pdf
                                                    </p>
                                                </div>
                                                <div className="d-flex justify-content-end mt-3">
                                                    <Button variant="primary" type="submit" id="verifyButton">
                                                        Verify
                                                    </Button>
                                                </div>
                                            </div>
                                        </Modal.Body>
                                    </Modal>
                                </div>
                            </div>    
                        </div>
                    )}
                    {activeTab === 'verified' && (
                        <div className="d-flex justify-content-center">
                            <div className="row">
                                <div className="col">
                                    <button
                                        className="rounded-2"
                                        id="buttonAssTab"
                                        style={{ opacity: 80 + "%" }}
                                        disabled
                                    >
                                        <h5 className="d-flex justify-content-start mt-2">Patient Name: John Doe</h5>
                                        <p className="d-flex justify-content-start">Activity 1: Journal and Drawing Entry</p>
                                        <p className="d-flex justify-content-start">Turned in on: March 8, 2023</p>
                                    </button>
                                </div>
                                <div className="col">
                                    <button
                                        className="rounded-2"
                                        id="buttonAssTab"
                                        style={{ opacity: 80 + "%" }}
                                        disabled
                                    >
                                        <h5 className="d-flex justify-content-start mt-2">Patient Name: Jane Doe</h5>
                                        <p className="d-flex justify-content-start">Activity 1: Journal and Drawing Entry</p>
                                        <p className="d-flex justify-content-start">Turned in on: March 10, 2023</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    </div>
            </div>
        </div>
    )
}