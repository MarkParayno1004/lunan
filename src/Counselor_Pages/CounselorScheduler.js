import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Modal, Button, Form } from 'react-bootstrap';
import { collection, getFirestore, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CounselorScheduler = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [patient, setPatient] = useState('');
  const [title, setTitle] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [events, setEvents] = useState([]);

  const handleCreateAppointment = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setShowModal(true);
  }

  const handleEventSelected = (event) => {
    setPatient(selectedEvent.patient);
    setSelectedEvent(event);
    setEditMode(true);
    setDeleteMode(true); // Set both editMode and deleteMode to true
    setShowModal(true);
  };

  const handleEditAppointment = () => {
    // This function can remain the same
    setTitle(selectedEvent.title);
    setStartDateTime(moment(selectedEvent.start).format('HH:mm'));
    setEndDateTime(moment(selectedEvent.end).format('HH:mm'));
  };
  
  const handleDeleteAppointment = () => {
    // This function can remain the same
  };

  const handleCloseModal = () => {
    setSelectedDate(null);
    setShowModal(false);
    setPatient('');
    setTitle('');
    setStartDateTime('');
    setEndDateTime('');
    setSelectedEvent(null);
    setEditMode(false);
    setDeleteMode(false);
  };

  const saveAppointment = async () => {
    if (title && startDateTime && endDateTime) {
      // Create a new appointment object
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
        patient: patient,
      };
  
      // Save the appointment to Firebase
      const db = getFirestore();
      const appointmentsCollection = collection(db, "Appointments");
  
      try {
        await addDoc(appointmentsCollection, newAppointment);
        console.log("Appointment saved successfully!");
      } catch (error) {
        console.error("Error saving appointment: ", error);
      }
  
      setEvents([...events, newAppointment]);
      handleCloseModal();
    }
  }

  const updateAppointment = () => {
    if (title && startDateTime && endDateTime && selectedEvent) {
      const updatedEvent = {
        ...selectedEvent,
        start: moment(selectedEvent.start)
          .set('hour', moment(startDateTime, 'HH:mm').hour())
          .set('minute', moment(startDateTime, 'HH:mm').minute())
          .toDate(),
        end: moment(selectedEvent.end)
          .set('hour', moment(endDateTime, 'HH:mm').hour())
          .set('minute', moment(endDateTime, 'HH:mm').minute())
          .toDate(),
        title: title,
        patient: patient,
      };

      const updatedEvents = [...events];
      const index = updatedEvents.findIndex((event) => event === selectedEvent);

      if (index !== -1) {
        updatedEvents[index] = updatedEvent;
        setEvents(updatedEvents);
        setSelectedEvent(updatedEvent); // Set selectedEvent to the updated event
        handleCloseModal();
      }
    }
  };

  const deleteAppointment = () => {
    setDeleteMode(true); // Set deleteMode to true when deleting
    setEditMode(false); // Set editMode to false
    const updatedEvents = events.filter((event) => event !== selectedEvent);
    setEvents(updatedEvents);
    handleCloseModal();
  }

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
            {editMode
              ? 'Edit Appointment'
              : deleteMode
              ? 'Delete Appointment'
              : 'Create Appointment'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Patient Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter patient"
                value={patient}
                onChange={(e) => setTitle(e.target.value)}
              />
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
          {editMode || deleteMode ? (
            <div>
              <Button
                variant="danger"
                onClick={deleteAppointment}
                disabled={!deleteMode} // Keep this line as is
              >
                Delete
              </Button>{' '}
              <Button
                variant="success"
                onClick={updateAppointment}
                disabled={!editMode}
              >
                Update
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
