import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Modal, Button, Form } from 'react-bootstrap';
import {
  collection,
  getFirestore,
  addDoc,
  doc, // Import doc
  setDoc, // Import setDoc
  deleteDoc, // Import deleteDoc
  getDocs, // Import getDocs
} from 'firebase/firestore';
import { firestore } from "../../firebase/firebase-config";
import { getAuth } from 'firebase/auth'; // Import getAuth to retrieve the current user
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CounselorScheduler = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [patientsData, setPatientsData] = useState([]);
  const [filteredPatientsData, setFilteredPatientsData] = useState([]);
  const [patients, setPatients] = useState([]); // Initialize as an empty array
  const [selectedPatient, setSelectedPatient] = useState('');
  const [title, setTitle] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [callMode, setCallMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [events, setEvents] = useState([]);
  const { currentUser } = getAuth();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "Users"));
        const counselorPatients = querySnapshot.docs
          .filter((doc) => doc.data().counselorUID === currentUser.uid)
          .map((doc) => doc.data());
  
        console.log("Counselor's Patients Data:", counselorPatients);
  
        setPatientsData(counselorPatients);
        setFilteredPatientsData(counselorPatients);
      } catch (error) {
        console.error("Error fetching patients data:", error);
      }
    };
  
    fetchPatients();
  }, [currentUser.uid]);

  const handleCreateAppointment = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setShowModal(true);
  }

  const handleEventSelected = (event) => {
    setSelectedPatient(event.patient); // Update selectedPatient
    setSelectedEvent(event);
    setEditMode(true);
    setDeleteMode(true);
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setSelectedDate(null);
    setShowModal(false);
    setSelectedPatient(''); // Reset the selected patient
    setTitle('');
    setStartDateTime('');
    setEndDateTime('');
    setSelectedEvent(null);
    setEditMode(false);
    setDeleteMode(false);
  };

  const saveAppointment = async () => {
    if (title && startDateTime && endDateTime && selectedPatient && selectedPatient.UID) {
      const newAppointment = {
        start: moment(selectedDate)
          .set('hour', moment(startDateTime, 'HH:mm').hour())
          .set('minute', moment(startDateTime, 'HH:mm').minute())
          .toDate(),
        end: moment(selectedDate)
          .set('hour', moment(endDateTime, 'HH:mm').hour())
          .set('minute', moment(endDateTime, 'HH:mm').minute())
          .toDate(),
        title: title,
        dateCreated: new Date().toISOString(),
        dateOfCall: moment(selectedDate).toISOString(),
        patient: selectedPatient.UID,
        counselorUID: currentUser.uid,
      };
  
      const db = getFirestore();
      const appointmentsCollection = collection(db, "Appointments");
  
      try {
        await addDoc(appointmentsCollection, newAppointment);
        console.log("Appointment saved successfully!");
        setEvents([...events, newAppointment]);
        handleCloseModal();
      } catch (error) {
        console.error("Error saving appointment: ", error);
      }
    } else {
      console.error("Missing required data for appointment creation.");
      if (!title) {
        console.error("Title is missing.");
      }
      if (!startDateTime) {
        console.error("Start time is missing.");
      }
      if (!endDateTime) {
        console.error("End time is missing.");
      }
      if (!selectedPatient) {
        console.error("Selected patient is missing.");
      }
      if (selectedPatient && !selectedPatient.UID) {
        console.error("Patient UID is missing.");
      }
    }
  };
  

  const updateAppointment = async () => {
    if (title && startDateTime && endDateTime && selectedEvent) {
      const updatedEvent = {
        start: moment(selectedEvent.start)
          .set('hour', moment(startDateTime, 'HH:mm').hour())
          .set('minute', moment(startDateTime, 'HH:mm').minute())
          .toDate(),
        end: moment(selectedEvent.end)
          .set('hour', moment(endDateTime, 'HH:mm').hour())
          .set('minute', moment(endDateTime, 'HH:mm').minute())
          .toDate(),
        title: title,
        dateCreated: selectedEvent.dateCreated, // Keep the original dateCreated
        dateOfCall: selectedEvent.dateOfCall, // Keep the original dateOfCall
        patient: selectedEvent.patientUID, // Keep the original patientUID
        counselorUID: selectedEvent.counselorUID, // Keep the original counselorUID
      };

      const db = getFirestore();
      const appointmentsCollection = collection(db, "Appointments");

      try {
        // Get the document reference for the selectedEvent
        const docRef = doc(appointmentsCollection, selectedEvent.id);
        // Update the document with the updatedEvent data
        await setDoc(docRef, updatedEvent, { merge: true });
        console.log("Appointment updated successfully!");
      } catch (error) {
        console.error("Error updating appointment: ", error);
      }

      const updatedEvents = events.map((event) =>
        event === selectedEvent ? updatedEvent : event
      );

      setEvents(updatedEvents);
      setSelectedEvent(updatedEvent); // Set selectedEvent to the updated event
      handleCloseModal();
    }
  };

  const deleteAppointment = async () => {
    // Set deleteMode to true when deleting
    setDeleteMode(true);
    // Set editMode to false
    setEditMode(false);

    // Show a confirmation dialog to make sure the user wants to delete
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      const db = getFirestore();
      const appointmentsCollection = collection(db, "Appointments");

      try {
        // Get the document reference for the selectedEvent
        const docRef = doc(appointmentsCollection, selectedEvent.id);
        // Delete the document from the collection
        await deleteDoc(docRef);
        console.log("Appointment deleted successfully!");
      } catch (error) {
        console.error("Error deleting appointment: ", error);
      }

      // Remove the deleted event from the local state
      const updatedEvents = events.filter((event) => event !== selectedEvent);
      setEvents(updatedEvents);
    }

    // Close the modal whether the user confirmed the deletion or not
    handleCloseModal();
  };

  const handleCallAppointment = () => {
    setCallMode(true);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 650, marginTop: 40 }}
        selectable={true}
        onSelectSlot={handleCreateAppointment}
        onSelectEvent={handleEventSelected}
      />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {callMode ? (
              'Call Appointment'
            ) : editMode ? (
              'Edit Appointment'
            ) : deleteMode ? (
              'Delete Appointment'
            ) : (
              'Create Appointment'
            )}
          </Modal.Title>
          {selectedEvent && !editMode && !callMode && (
            <Button
              variant="link"
              onClick={() => setEditMode(true)}
              style={{ color: 'black' }}
            >
              <i className="fas fa-pencil-alt" /> Edit
            </Button>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Patient Name</Form.Label>
              <Form.Select
                value={selectedPatient ? selectedPatient.UID : ''}
                onChange={(e) => {
                  const selectedUID = e.target.value;
                  const selectedPatient = filteredPatientsData.find((patient) => patient.UID === selectedUID);
                  setSelectedPatient(selectedPatient || null);
                }}
              >
                <option value="">Select a patient</option>
                {filteredPatientsData.map((patient) => (
                  <option key={patient.UID} value={patient.UID}>
                    {patient.firstName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                value={startDateTime}
                onChange={(e) => setStartDateTime(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                value={endDateTime}
                onChange={(e) => setEndDateTime(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {editMode ? (
            <Button variant="success" onClick={updateAppointment}>
              Update
            </Button>
          ) : deleteMode ? (
            <Button variant="danger" onClick={deleteAppointment}>
              Delete
            </Button>
          ) : callMode ? (
            <div>
              <Button variant="danger" onClick={deleteAppointment}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleCallAppointment}>
                Call
              </Button>
            </div>
          ) : (
            <Button variant="success" onClick={saveAppointment}>
              Save Appointment
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CounselorScheduler;
