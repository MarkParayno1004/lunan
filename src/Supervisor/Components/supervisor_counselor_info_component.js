import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase/firebase-config";
import { query, where, collection, onSnapshot } from "firebase/firestore";
import { Modal } from "react-bootstrap";
import SupervisorCounselorDataComponent from "./supervisor_counselor_data_component";

function SupervisorCounselorInfoComponent(props) {
  const { show, handleClose, counselor } = props;
  const [searchInput, setSearchInput] = useState("");
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    const patientQuery = query(
      collection(firestore, "Users"),
      where("counselorID", "==", counselor.UID)
    );
    const unsubscribe = onSnapshot(patientQuery, (snapshot) => {
      const updatedPatientList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPatients(updatedPatientList);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body id="piModal">
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Counselor Profile
          </Modal.Title>
        </Modal.Header>
        <div className="container-fluid">
          {counselor && (
            <SupervisorCounselorDataComponent
              counselorData={counselor}
              patients={patients}
              setSearchInput={setSearchInput}
              searchInput={searchInput}
            />
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default SupervisorCounselorInfoComponent;
