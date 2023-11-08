import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Modal, Button, Form } from "react-bootstrap";

import {
  collection,
  getFirestore,
  addDoc,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase/firebase-config";
import { getAuth } from "firebase/auth";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CounselorScheduler = () => {
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [patientsData, setPatientsData] = useState([]);
  const [filteredPatientsData, setFilteredPatientsData] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [selectedPatient, setSelectedPatient] = useState("");
  const [title, setTitle] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [callMode, setCallMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [events, setEvents] = useState([]);
  const { currentUser } = getAuth();

  useEffect(() => {
    const fetchPatientsData = async () => {
      try {
        const querySnapshot = await getDocs(
          query(
            collection(firestore, "Users"),
            where("counselorID", "!=", null)
          )
        );
        const patients = querySnapshot.docs.map((doc) => doc.data());

        setPatientsData(patients);
        setFilteredPatientsData(patients);
      } catch (error) {
        console.error("Error fetching patients data:", error);
      }
    };

    fetchPatientsData();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      const db = getFirestore();
      const appointmentsCollection = collection(db, "Appointments");

      // Query appointments where counselorUID is equal to the current user's UID
      const q = query(
        appointmentsCollection,
        where("counselorUID", "==", currentUser.uid)
      );

      try {
        const querySnapshot = await getDocs(q);
        const events = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const start = data.start.toDate();
          const end = data.end.toDate();

          return {
            ...data,
            id: doc.id,
            start: start,
            end: end,
            title: data.title,
            patient: data.patient,
          };
        });
        console.log("Appointments Data:", events);
        setEvents(events);
      } catch (error) {
        console.error("Error fetching appointments data:", error);
      }
    };

    fetchEvents();
  }, [currentUser.uid]);

  const handleSelectAppointment = async (id) => {
    try {
      const db = getFirestore();

      const appointmentsCollection = collection(db, "Appointments");

      const appointmentDocRef = doc(appointmentsCollection, id);
      const appointmentDocSnap = await getDoc(appointmentDocRef);

      if (appointmentDocSnap.exists()) {
        const selectedAppointmentData = appointmentDocSnap.data();

        console.log("Selected appointment data:", selectedAppointmentData);

        setSelectedAppointment(selectedAppointmentData);
        setSelectedAppointmentId(id);
        setShowModal(true);
      } else {
        console.error("Appointment not found for ID:", id);
      }
    } catch (error) {
      console.error("Error fetching appointment for ID:", id, error);
    }
  };

  const handleCreateAppointment = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setShowModal(true);
  };

  const handleEventSelected = (event) => {
    setSelectedPatient(event.patient);
    setTitle(event.title);

    setStartDateTime(moment(event.start).format("HH:mm"));
    setEndDateTime(moment(event.end).format("HH:mm"));

    setSelectedEvent(event);
    setEditMode(true);
    setShowModal(true);

    if (event.id) {
      setSelectedAppointmentId(event.id);
    }
  };

  const handleCloseModal = () => {
    setSelectedDate(null);
    setShowModal(false);

    setSelectedPatient("");
    setTitle("");
    setStartDateTime("");
    setEndDateTime("");

    setSelectedEvent(null);
    setEditMode(false);
    setDeleteMode(false);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const saveAppointment = async () => {
    if (
      title &&
      startDateTime &&
      endDateTime &&
      selectedPatient &&
      selectedPatient.UID
    ) {
      const newAppointment = {
        start: moment(selectedDate)
          .set("hour", moment(startDateTime, "HH:mm").hour())
          .set("minute", moment(startDateTime, "HH:mm").minute())
          .toDate(),
        end: moment(selectedDate)
          .set("hour", moment(endDateTime, "HH:mm").hour())
          .set("minute", moment(endDateTime, "HH:mm").minute())
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
        const docRef = await addDoc(appointmentsCollection, newAppointment);
        newAppointment.id = docRef.id; // Set the appointment's ID
        const updatedEvents = [...events, newAppointment];
        setEvents(updatedEvents);
        handleCloseModal();
      } catch (error) {
        console.error("Error saving appointment: ", error);
      }
    } else {
      console.error("Missing required data for appointment creation.");
    }
  };

  const updateAppointment = async () => {
    // Check if all required variables are defined
    if (!title || !startDateTime || !endDateTime || !selectedAppointmentId) {
      console.error("Missing required data for updating appointment");
      return;
    }

    console.log("startDateTime:", startDateTime);
    console.log("endDateTime:", endDateTime);

    const startTime = moment(startDateTime, "HH:mm", true);
    const endTime = moment(endDateTime, "HH:mm", true);

    if (startTime.isValid() && endTime.isValid()) {
      const updatedStart = startTime
        .set("hour", startTime.hour())
        .set("minute", startTime.minute())
        .toDate();
      const updatedEnd = endTime
        .set("hour", endTime.hour())
        .set("minute", endTime.minute())
        .toDate();

      const updatedEvent = {
        start: updatedStart,
        end: updatedEnd,
        title: title,
      };

      const db = getFirestore();
      const appointmentsCollection = collection(db, "Appointments");

      try {
        const docRef = doc(appointmentsCollection, selectedAppointmentId);
        await setDoc(docRef, updatedEvent, { merge: true });
        console.log("Appointment updated successfully!");

        const updatedEvents = events.map((event) =>
          event.id === selectedAppointmentId
            ? { ...event, ...updatedEvent }
            : event
        );

        setEvents(updatedEvents);
      } catch (error) {
        console.error("Error updating appointment: ", error);
      }

      setSelectedAppointment(null);
      setSelectedAppointmentId(null);
      setShowUpdateModal(false);
      setShowModal(false);
    } else {
      console.error("Invalid time format for startDateTime or endDateTime");
    }
  };

  const deleteAppointment = async () => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        const db = getFirestore();
        const appointmentsCollection = collection(db, "Appointments");
        await deleteDoc(doc(appointmentsCollection, selectedAppointmentId));
        console.log("Appointment deleted successfully!");
        const updatedEvents = events.filter(
          (event) => event.id !== selectedAppointmentId
        );
        setEvents(updatedEvents);
      } catch (error) {
        console.error("Error deleting appointment: ", error);
      }
    } else {
      console.log("Appointment deletion canceled.");
    }

    setSelectedAppointment(null);
    setSelectedAppointmentId(null);
    setShowModal(false);
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
        onSelectEvent={(event) => {
          handleEventSelected(event); // Call handleEventSelected with the event
          handleSelectAppointment(event.id); // Call handleSelectAppointment with the event's ID
        }}
      />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editMode
              ? "Edit Appointment"
              : deleteMode
              ? "Delete Appointment"
              : "Create Appointment"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Patient Name</Form.Label>
              <Form.Select
                value={selectedPatient ? selectedPatient.UID : ""}
                onChange={(e) => {
                  const selectedUID = e.target.value;
                  const selectedPatient = filteredPatientsData.find(
                    (patient) => patient.UID === selectedUID
                  );

                  setSelectedPatient(selectedPatient || null);
                }}
                disabled={editMode}
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
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={editMode}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                value={startDateTime}
                onChange={(e) => setStartDateTime(e.target.value)}
                disabled={editMode}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                value={endDateTime}
                onChange={(e) => setEndDateTime(e.target.value)}
                disabled={editMode}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {editMode || deleteMode ? (
            <div>
              <Button variant="danger" onClick={deleteAppointment}>
                Delete
              </Button>{" "}
              <Button
                variant="success"
                onClick={() => {
                  setShowUpdateModal(true);
                }}
              >
                Edit
              </Button>{" "}
              <Button
                variant="success"
                onClick={() => {
                  setShowUpdateModal(true);
                }}
              >
                Edit
              </Button>{" "}
              <Button variant="success" onClick={handleCallAppointment}>
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

      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Patient Name</Form.Label>
              <Form.Select
                value={selectedPatient ? selectedPatient.UID : ""}
                onChange={(e) => {
                  const selectedUID = e.target.value;
                  const selectedPatient = filteredPatientsData.find(
                    (patient) => patient.UID === selectedUID
                  );
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
                placeholder="Title"
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
          <Button variant="success" onClick={updateAppointment}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CounselorScheduler;
