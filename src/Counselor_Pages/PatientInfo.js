import React from "react";
import { Modal } from "react-bootstrap";
import Pic from "../img/ProfilePic.png";
import { useState, useRef, useEffect } from "react";
import "../css/PatientInfo.css";
import Swal from "sweetalert2";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import "../css/customscroll.css";
import "../css/WellnessPageCounselor.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
  getFirestore,
  addDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import HTMLReactParser from "html-react-parser";
import { auth, firestore, storage } from "../firebase/firebase-config";

export const PatientInfo = (props) => {
  const [tasks, setTasks] = useState([]);
  const patientData = props.patientData;
  const intakeFormsData = props.intakeFormsData;
  //!View Assignment Modal Behaviour
  const [showAss, setShowAss] = useState(false);
  const handleCloseAss = () => setShowAss(false);

  const handleShowAss = async (selectedPatientUID) => {
    console.log("handleShowAss called with UID:", selectedPatientUID);

    try {
      // Fetch tasks for the selected patient and set them in state
      const tasks = await fetchTasksForPatient(selectedPatientUID);
      setTasksForSelectedPatient(tasks);

      console.log("Tasks fetched", tasks);
      setShowAss(true);
    } catch (error) {
      console.error("Error in handleShowAss:", error);
    }
  };

  const handleShowWeek = async (selectedPatientUID) => {
    console.log("handleShowWeek called with UID:", selectedPatientUID);
    try {
      const wForm = await fetchWeeklyForPatient(selectedPatientUID);
      setwFormsForSelectedPatient(wForm);
      console.log("Weekly Forms fetched", wForm);
      setShowWeek(true);
    } catch (error) {
      console.error("Error in handleShowAss:", error);
    }
  };

  //!View Case Notes  Modal Behaviour
  const [showCase, setShowCase] = useState(false);
  const handleCloseCase = () => setShowCase(false);

  const [tasksForSelectedPatient, setTasksForSelectedPatient] = useState([]);
  const [wFormsForSelectedPatient, setwFormsForSelectedPatient] = useState([]);

  //!View Weekly Form  Modal Behaviour
  const [showWeek, setShowWeek] = useState(false);
  const handleCloseWeek = () => setShowWeek(false);

  //!View Wellness Form Modal Behaviour
  const [showWell, setShowWell] = useState(false);
  const handleCloseWell = () => setShowWell(false);

  const handleShowWell = async (selectedPatientUID) => {
    console.log("handleShowWellness called with UID:", selectedPatientUID);
    try {
      const wellForm = await fetchWellnessForPatient(selectedPatientUID);
      setwellFormsForSelectedPatient(wellForm);
      console.log("Wellness Forms fetched", wellForm);
      setShowWell(true);
    } catch (error) {
      console.error("Error in handleShowAss:", error);
    }
  };

  const [wellFormsForSelectedPatient, setwellFormsForSelectedPatient] =
    useState([]);

  const fetchWellnessForPatient = async (selectedPatientUID) => {
    console.log("Fetching wellness forms for ", selectedPatientUID);
    try {
      const q = query(
        collection(firestore, "WellnessForm"),
        where("UID", "==", selectedPatientUID)
      );
      const querySnapshot = await getDocs(q);
      const wellForms = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        // Convert specific number fields to strings
        data.WellnessQ1 = String(data.WellnessQ1);
        data.WellnessQ2 = String(data.WellnessQ2);
        data.WellnessQ3 = String(data.WellnessQ3);
        data.WellnessQ4 = String(data.WellnessQ4);

        return { id: doc.id, ...data };
      });
      console.log("Fetched Weekly Forms for", selectedPatientUID, wellForms);
      return wellForms;
    } catch (error) {
      console.error("Error fetching wForms:", error);
      return [];
    }
  };

  //!Create Case Notes Form Modal Behaviour
  const [showCreate, setShowCreate] = useState(false);
  const handleCloseCreate = () => {
    setShowCreate(false);
  };
  const handleShowCreate = () => setShowCreate(true);

  const [showPage, setShowPage] = useState(false);

  const togglePage = () => {
    setShowPage(!showPage);
  };
  const handleClose = () => {
    props.handleClose();
  };
  const fetchTasksForPatient = async (selectedPatientUID) => {
    console.log("Fetching tasks for ", selectedPatientUID);
    try {
      const q = query(
        collection(firestore, "Tasks"),
        where("PatientUID", "==", selectedPatientUID)
      );
      const querySnapshot = await getDocs(q);
      const tasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched tasks for", selectedPatientUID, tasks);
      return tasks;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  };

  const fetchWeeklyForPatient = async (selectedPatientUID) => {
    console.log("Fetching weekly forms for ", selectedPatientUID);
    try {
      const q = query(
        collection(firestore, "WeeklyForm"),
        where("UID", "==", selectedPatientUID)
      );
      const querySnapshot = await getDocs(q);
      const wForms = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        // Convert specific number fields to strings
        data.WeeklyQ1 = String(data.WeeklyQ1);
        data.WeeklyQ2 = String(data.WeeklyQ2);
        data.WeeklyQ3 = String(data.WeeklyQ3);
        data.WeeklyQ4 = String(data.WeeklyQ4);
        data.WeeklyQ5 = String(data.WeeklyQ5);

        return { id: doc.id, ...data };
      });
      console.log("Fetched Weekly Forms for", selectedPatientUID, wForms);
      return wForms;
    } catch (error) {
      console.error("Error fetching wForms:", error);
      return [];
    }
  };

  const [showWellnessGuide, setWellnessGuide] = useState(false);
  const handleCloseWG = () => setWellnessGuide(false);
  const [guideForSelectedPatient, setGuideForSelectedPatient] = useState([]);

  const handleShowWG = async (selectedPatientUID) => {
    console.log("handleShowWG called with UID:", selectedPatientUID);

    try {
      // Fetch tasks for the selected patient and set them in state
      const guide = await fetchGuideForPatient(selectedPatientUID);
      setGuideForSelectedPatient(guide);

      console.log("Guide fetched", guide);
      setWellnessGuide(true);
    } catch (error) {
      console.error("Error in handleShowAss:", error);
    }
  };

  const fetchGuideForPatient = async (selectedPatientUID) => {
    console.log("Fetching Guides for ", selectedPatientUID);
    try {
      const q = query(
        collection(firestore, "Guide"),
        where("PatientUID", "==", selectedPatientUID)
      );
      const querySnapshot = await getDocs(q);
      const guide = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched Guide for", selectedPatientUID, guide);
      return guide;
    } catch (error) {
      console.error("Error fetching Guides:", error);
      return [];
    }
  };

  const [notesForSelectedPatient, setNotesForSelectedPatient] = useState([]);
  const handleShowCase = async (selectedPatientUID) => {
    console.log("handleShowAss called with UID:", selectedPatientUID);

    try {
      // Fetch notes for the selected patient and set them in state
      const notes = await fetchNotesForPatient(selectedPatientUID);
      setNotesForSelectedPatient(notes);

      console.log("Tasks fetched", notes);
      setShowCase(true);
    } catch (error) {
      console.error("Error in handleShowAss:", error);
    }
  };
  const fetchNotesForPatient = async (selectedPatientUID) => {
    console.log("Fetching notes for ", selectedPatientUID);
    try {
      const q = query(
        collection(firestore, "CaseNotes"),
        where("patientUID", "==", selectedPatientUID)
      );
      const querySnapshot = await getDocs(q);
      const notes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched notes for", selectedPatientUID, notes);
      return notes;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  };
  
  return (
    <Modal
      size="xl"
      show={props.show}
      onHide={props.onHide}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body id="piModal">
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Patient Information
          </Modal.Title>
        </Modal.Header>
        <div className="container-fluid">
          <div className="patient-info rounded-5 mt-3 ps-5 pe-5" id="piBG">
            <div className="row d-flex align-items-start d-flex justify-content-start pt-3 ps-3 patient-details">
              <div className="col-1 ">
                <img
                  src={Pic}
                  alt={props.name}
                  className="patient-picture"
                  style={{ width: 100 + "px" }}
                />
              </div>
              <div
                className="col-8 ms-5 d-flex justify-content-center rounded-5"
                id="colBG"
              >
                <div className="container-fluid patient-text">
                  {/*1st Row */}
                  <div className="row">
                    <div className="col">
                      <strong>Name: </strong>
                      <span style={{ color: "red" }}>
                        {props.patientData.firstName}
                      </span>
                    </div>
                    <div className="col">
                      <strong>Age: </strong>
                      <span style={{ color: "red" }}>
                        {props.patientData.Age}
                      </span>
                    </div>
                    <div className="col">
                      <strong>Gender: </strong>
                      <span style={{ color: "red" }}>
                        {props.patientData.Gender}
                      </span>
                    </div>
                  </div>

                  {/*2nd Row */}
                  <div className="row mt-3">
                    <div className="col">
                      <strong>Birthday: </strong>
                      <span style={{ color: "red" }}>{props.birthday}</span>
                    </div>

                    <div className="col">
                      <strong>Address: </strong>
                      <br></br>
                      {intakeFormsData && intakeFormsData[0] ? (
                        <span style={{ color: "red" }}>
                          {intakeFormsData[0].StreetNum || "N/A"}{" "}
                          {intakeFormsData[0].Barangay || ""}{" "}
                          {intakeFormsData[0].City || ""}
                          {intakeFormsData[0].Zip || ""}
                        </span>
                      ) : (
                        <span>Wala</span>
                      )}
                    </div>

                    <div className="col">
                      <strong>Assigned Counselor: </strong>
                      <span style={{ color: "red" }}>{props.counselor}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="container-fluid rounded-5 mt-3 pt-2 pb-2 pe-4"
              id="colBG"
            >
              {/*3rd Row */}
              <div className="row ms-2 mt-2 rounded-5 mb-3" id="bottomBorder">
                <div className="col ">
                  <strong>Cell Phone Number: </strong>
                  <span style={{ color: "red" }}>
                    {props.patientData.CellPhone}
                  </span>
                </div>

                <div className="col">
                  <strong>Home Phone Number: </strong>
                  <span style={{ color: "red" }}>
                    {props.patientData.HomePhone}
                  </span>
                </div>
                <div className="col">
                  <strong>Email: </strong>
                  <span style={{ color: "red" }}>
                    {props.patientData.Email}
                  </span>
                </div>
              </div>

              {/*4th Row  */}
              <div className="row ms-2 mt-2 rounded-5 mb-3" id="bottomBorder">
                <div className="col">
                  <strong>Sexual Preference: </strong>
                  {intakeFormsData &&
                  intakeFormsData[0] &&
                  intakeFormsData[0].CPNum ? (
                    <span style={{ color: "red" }}>
                      {intakeFormsData[0].SexualPref}
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>

                <div className="col">
                  <strong>Marital Status: </strong>
                  {intakeFormsData &&
                  intakeFormsData[0] &&
                  intakeFormsData[0].CPNum ? (
                    <span style={{ color: "red" }}>
                      {intakeFormsData[0].MaritalStatus}
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>

                <div className="col">
                  <strong>Previous Psychotherapy: </strong>
                  {intakeFormsData &&
                  intakeFormsData[0] &&
                  intakeFormsData[0].CPNum ? (
                    <span style={{ color: "red" }}>
                      {intakeFormsData[0].TherapyStatus}
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
              </div>

              {/*5th Row  */}
              <div className="row ms-2 mt-2 rounded-5 mb-3" id="bottomBorder">
                <div className="col">
                  <strong>Current prescribed psychiatric medications: </strong>
                  {intakeFormsData &&
                  intakeFormsData[0] &&
                  intakeFormsData[0].CPNum ? (
                    <span style={{ color: "red" }}>
                      {intakeFormsData[0].CurrPsychMeds}
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>

                <div className="col">
                  <strong>Emergency contact person name: </strong>
                  {intakeFormsData &&
                  intakeFormsData[0] &&
                  intakeFormsData[0].CPNum ? (
                    <span style={{ color: "red" }}>
                      {intakeFormsData[0].CPFname}
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>

                <div className="col">
                  <strong>Emergency contact person number: </strong>
                  {intakeFormsData &&
                  intakeFormsData[0] &&
                  intakeFormsData[0].CPNum ? (
                    <span style={{ color: "red" }}>
                      {intakeFormsData[0].CPNum}
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
              </div>

              {/*6th Row  */}
              <div className="row ms-2 mt-2 rounded-5 mb-3" id="bottomBorder">
                <div className="col">
                  <strong>Suicidal thoughts: </strong>
                  {intakeFormsData &&
                  intakeFormsData[0] &&
                  intakeFormsData[0].CPNum ? (
                    <span style={{ color: "red" }}>
                      {intakeFormsData[0].SuicidalThoughts}
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>

                <div className="col">
                  <strong>Past suicidal thoughts: </strong>
                  {intakeFormsData &&
                  intakeFormsData[0] &&
                  intakeFormsData[0].CPNum ? (
                    <span style={{ color: "red" }}>
                      {intakeFormsData[0].SuicidalThoughtsPast}
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>

                <div className="col">
                  <strong>Current homicidal thoughts: </strong>
                  {intakeFormsData &&
                  intakeFormsData[0] &&
                  intakeFormsData[0].CPNum ? (
                    <span style={{ color: "red" }}>
                      {intakeFormsData[0].CurrentHomicidal}
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
              </div>

              {/*7th Row  */}
              <div className="row ms-2 mt-2 rounded-5 mb-3" id="bottomBorder">
                <div className="col">
                  <strong>Previous homicidal thoughts: </strong>
                  {intakeFormsData &&
                  intakeFormsData[0] &&
                  intakeFormsData[0].CPNum ? (
                    <span style={{ color: "red" }}>
                      {intakeFormsData[0].HadPreviousHomicide}
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>

                <div className="col">
                  <strong>Current physical health: </strong>
                  {intakeFormsData &&
                  intakeFormsData[0] &&
                  intakeFormsData[0].CPNum ? (
                    <span style={{ color: "red" }}>
                      {intakeFormsData[0].currentPhysicalHealth}
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>

                <div className="col">
                  <strong>Last physical examination: </strong>
                  {intakeFormsData &&
                  intakeFormsData[0] &&
                  intakeFormsData[0].CPNum ? (
                    <span style={{ color: "red" }}>
                      {intakeFormsData[0].LastPhysicalExam}
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
              </div>

              {/*8th Row  */}
              <div className="row ms-2 mt-2 rounded-5 mb-3" id="bottomBorder">
                <div className="col">
                  <strong>List of chronic health problem: </strong>
                  {intakeFormsData &&
                  intakeFormsData[0] &&
                  intakeFormsData[0].CPNum ? (
                    <span style={{ color: "red" }}>
                      {intakeFormsData[0].ChronicIll}
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>

                <div className="col">
                  <strong>Any Allergies: </strong>
                  {intakeFormsData &&
                  intakeFormsData[0] &&
                  intakeFormsData[0].CPNum ? (
                    <span style={{ color: "red" }}>
                      {intakeFormsData[0].AllergiesSel}
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>

                <div className="col">
                  <strong>List of maintenance medication: </strong>
                  {intakeFormsData &&
                  intakeFormsData[0] &&
                  intakeFormsData[0].CPNum ? (
                    <span style={{ color: "red" }}>
                      {intakeFormsData[0].MaintMeds}
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
              </div>

              {/*9th Row */}
              <div className="row ms-2 mt-2 rounded-5 mb-3" id="bottomBorder">
                <div className="col">
                  <strong>Regular intake of alcohol: </strong>
                  {intakeFormsData &&
                  intakeFormsData[0] &&
                  intakeFormsData[0].CPNum ? (
                    <span style={{ color: "red" }}>
                      {intakeFormsData[0].alcoholSubstanceAbuseSelNow}
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>

                <div className="col">
                  <strong>Engage in recreational drug use: </strong>
                  {intakeFormsData &&
                  intakeFormsData[0] &&
                  intakeFormsData[0].CPNum ? (
                    <span style={{ color: "red" }}>
                      {intakeFormsData[0].DrugUseSel || ""}{" "}
                      {intakeFormsData[0].DrugUse || ""}
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>

                <div className="col">
                  <strong>Habit of smoke: </strong>
                  {intakeFormsData &&
                  intakeFormsData[0] &&
                  intakeFormsData[0].CPNum ? (
                    <span style={{ color: "red" }}>
                      {intakeFormsData[0].CiggDaily}
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
              </div>

              {/*10th Row */}
              <div className="row ms-2 mt-2 rounded-5 mb-3" id="bottomBorder">
                <div className="col">
                  <strong>Any past head injury: </strong>
                  {intakeFormsData &&
                  intakeFormsData[0] &&
                  intakeFormsData[0].CPNum ? (
                    <span style={{ color: "red" }}>
                      {intakeFormsData[0].HeadInjurySel}
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>

                <div className="col">
                  <strong>Lately significant changes or stressors: </strong>
                  {intakeFormsData &&
                  intakeFormsData[0] &&
                  intakeFormsData[0].Stressors ? (
                    <span style={{ color: "red" }}>
                      {intakeFormsData[0].Stressors}
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>

                <div className="col">
                  <strong>Depressed Mood or Sadness: </strong>
                  {intakeFormsData &&
                  intakeFormsData[0] &&
                  intakeFormsData[0].depressedMoodNowSel ? (
                    <span style={{ color: "red" }}>
                      {intakeFormsData[0].depressedMoodNowSel}
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
              </div>

              {/*11th Row */}
              <div className="row ms-2 mt-2 rounded-5 mb-3" id="bottomBorder">
                <div className="col">
                  <strong>Axiety: </strong>
                  {intakeFormsData &&
                  intakeFormsData[0] &&
                  intakeFormsData[0].anxietySelNow ? (
                    <span style={{ color: "red" }}>
                      {intakeFormsData[0].anxietySelNow}
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>

                <div className="col">
                  <strong>Phobias: </strong>
                  {intakeFormsData &&
                  intakeFormsData[0] &&
                  intakeFormsData[0].phobiasSelNow ? (
                    <span style={{ color: "red" }}>
                      {intakeFormsData[0].phobiasSelNow || ""}{" "}
                      {intakeFormsData[0].phobiasRatingNow || ""}{" "}
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>

                <div className="col">
                  <strong>Hallucinations: </strong>
                  {intakeFormsData &&
                  intakeFormsData[0] &&
                  intakeFormsData[0].hallucinationsSelNow ? (
                    <span style={{ color: "red" }}>
                      {intakeFormsData[0].hallucinationsSelNow || ""}{" "}
                      {intakeFormsData[0].hallucinationsRatingNow || ""}
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
              </div>

              {/*12th Row */}
              <div className="row ms-2 mt-2">
                <div className="col">
                  <strong>Sexual Abuse: </strong>
                  {intakeFormsData &&
                  intakeFormsData[0] &&
                  intakeFormsData[0].sexualAbuseSelNow ? (
                    <span style={{ color: "red" }}>
                      {intakeFormsData[0].sexualAbuseSelNow || ""}{" "}
                      {intakeFormsData[0].sexualAbuseRatingNow || ""}
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>

                <div className="col">
                  <strong>Physical Abuse: </strong>
                  {intakeFormsData &&
                  intakeFormsData[0] &&
                  intakeFormsData[0].physicalAbuseSelNow ? (
                    <span style={{ color: "red" }}>
                      {intakeFormsData[0].physicalAbuseSelNow || ""}{" "}
                      {intakeFormsData[0].physicalAbuseRatingNow || ""}
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>

                <div className="col">
                  <strong>Emotional Abuse: </strong>
                  {intakeFormsData &&
                  intakeFormsData[0] &&
                  intakeFormsData[0].emotionalAbuseSelNow ? (
                    <span style={{ color: "red" }}>
                      {intakeFormsData[0].emotionalAbuseSelNow || ""}{" "}
                      {intakeFormsData[0].emotionalAbuseRatingNow || ""}
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
              </div>
            </div>

            {/*Buttons */}
            <div className="button-group d-flex justify-content-center pt-4 pb-4">
              {console.log("Before 'View Assignment' button click")}
              <button
                className="me-4 rounded-5 fw-semibold"
                onClick={() => {
                  console.log("View Assignment button clicked");
                  handleShowAss(props.selectedPatientUID);
                }}
                id="viewButton"
              >
                View Assingments
              </button>
              {console.log("After 'View Assignment' button click")}

              <button
                className="me-4 rounded-5 fw-semibold"
                onClick={() => {
                  console.log("View Case Notes button clicked");
                  handleShowCase(props.selectedPatientUID);
                }}
                id="viewButton"
              >
                View Case Notes
              </button>

              <button
                className="me-4 rounded-5 fw-semibold"
                onClick={() => {
                  handleShowWeek(props.selectedPatientUID);
                }}
                id="viewButton"
              >
                View Weekly Form
              </button>

              <button
                className="me-4 rounded-5 fw-semibold"
                onClick={() => {
                  console.log("View Assignment button clicked");
                  handleShowWell(props.selectedPatientUID);
                }}
                id="viewButton"
              >
                View Daily Form
              </button>

              <button
                className="me-4 rounded-5 fw-semibold"
                id="viewButton"
                onClick={() => {
                  console.log("View Guide button clicked");
                  handleShowWG(props.selectedPatientUID);
                }}
              >
                View Wellness Guide
              </button>

              <button
                className="rounded-5 fw-semibold"
                onClick={togglePage}
                disabled={showPage}
                id="viewButton"
              >
                Create Case Notes
              </button>

              {/*MODALS */}
              <ViewModalAssign
                show={showAss}
                handleClose={handleCloseAss}
                selectedPatientUID={props.selectedPatientUID}
                tasks={tasksForSelectedPatient}
                updateTasks={setTasks}
              />

              <ViewCaseNotes 
              show={showCase} 
              handleClose={handleCloseCase} 
              selectedPatientUID={props.selectedPatientUID}
              cNotes={notesForSelectedPatient}
              />

              <ViewWeeklyForm
                show={showWeek}
                handleClose={handleCloseWeek}
                selectedPatientUID={props.selectedPatientUID}
                wForms={wFormsForSelectedPatient}
              />

              <ViewWellnessForm
                show={showWell}
                handleClose={handleCloseWell}
                selectedPatientUID={props.selectedPatientUID}
                wellForms={wellFormsForSelectedPatient}
              />

              <ViewWellnessGuide
                show={showWellnessGuide}
                handleClose={handleCloseWG}
                selectedPatientUID={props.selectedPatientUID}
              />
            </div>

            {showPage && (
              <div className="pb-5 pt-5">
                <CreateCaseNotes 
                onClose={togglePage} 
                selectedPatientUID={props.selectedPatientUID}
                />
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

//!MODALS

const ViewModalAssign = (props) => {
  const [activeTab, setActiveTab] = useState("assigned");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState();
  const handleClose = () => setShow(false);
  const handleShowCreate = (selectedPatientUID) => {
    console.log(
      `Creating assignments for patient with UID: ${selectedPatientUID}`
    );
    setShow(true);
  };

  const handleSubmit = () => {
    setShow(false);
  };

  useEffect(() => {
    setTasks(props.tasks || []);
  }, [props.tasks]);

  const updateTaskStatus = async (taskId) => {
    const db = getFirestore(); // Initialize Firestore
    const taskRef = doc(db, "Tasks", taskId);

    try {
      // Update the Status field to "Verified"
      await updateDoc(taskRef, {
        Status: "Verified",
      });
      console.log("Task status updated to Verified");
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      size="lg"
      className="mt-3"
    >
      <Modal.Body style={{ backgroundColor: "#4d455d", color: "#f5e9cf" }}>
        <Modal.Header closeButton>
          <Modal.Title>View Assignment</Modal.Title>
        </Modal.Header>
        <div className="tabs mt-4 d-flex justify-content-start">
          <button
            className={`me-3 ${activeTab === "assigned" ? "active" : ""}`}
            onClick={() => handleTabChange("assigned")}
          >
            Assigned
          </button>
          <button
            className={`me-3 ${activeTab === "turnedIn" ? "active" : ""}`}
            onClick={() => handleTabChange("turnedIn")}
          >
            Turned-in Assignments
          </button>
          <button
            className={activeTab === "verified" ? "active" : ""}
            onClick={() => handleTabChange("verified")}
          >
            Verified Assignments
          </button>
        </div>
        <table class="table table-dark table-hover">
          {activeTab === "assigned" && (
            <>
              <thead>
                <tr>
                  <th scope="col">Activity:</th>
                  <th scope="col">Descsription:</th>
                  <th scope="col">Turn-In Date:</th>{" "}
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {tasks
                  .filter((task) => task.Status === null)
                  .map((task, index) => (
                    <tr key={index}>
                      <td>{task.Activity}</td>
                      <td>{task.Description}</td>
                      <td>{task.Deadline}</td>
                    </tr>
                  ))}
              </tbody>
            </>
          )}
          {activeTab === "verified" && (
            <>
              <thead>
                <tr>
                  <th scope="col">Activity:</th>
                  <th scope="col">Description:</th>
                  <th scope="col">Turn-In Date:</th>{" "}
                  {/* Display Firestore document ID here */}
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {console.log("Tasks:", tasks)}
                {tasks
                  .filter((task) => task.Status === "Verified")
                  .map((task, index) => (
                    <tr key={index}>
                      <td>{task.Activity}</td>
                      <td>{task.Description}</td>
                      <td>{task.Deadline}</td>{" "}
                      {/* Display Firestore document ID here */}
                    </tr>
                  ))}
              </tbody>
            </>
          )}
          {activeTab === "turnedIn" && (
            <>
              <thead>
                <tr>
                  <th scope="col">Activity:</th>
                  <th scope="col">Description:</th>
                  <th scope="col">Turn-In Date:</th>{" "}
                  {/* Display Firestore document ID here */}
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {console.log("Tasks:", tasks)}
                {tasks
                  .filter((task) => task.Status === "turnedIn")
                  .map((task, index) => (
                    <tr key={index}>
                      <td>{task.Activity}</td>
                      <td>{task.Description}</td>
                      <td>{task.Deadline}</td>{" "}
                      {/* Display Firestore document ID here */}
                      <td>
                        <button
                          className="btn"
                          style={{
                            backgroundColor: "#f5e9cf",
                            color: "#4d455d",
                          }}
                          onClick={() => updateTaskStatus(task.id)}
                        >
                          Verify
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </>
          )}
        </table>
        <Modal.Footer>
          <button
            className="btn"
            style={{ backgroundColor: "#f5e9cf", color: "#4d455d" }}
            onClick={() => handleShowCreate(props.selectedPatientUID)}
          >
            Create Assignment
          </button>
          <CreateAssignment
            show={show}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            selectedPatientUID={props.selectedPatientUID}
          />
          <button
            className="btn"
            style={{ backgroundColor: "#f5e9cf", color: "#4d455d" }}
            variant="secondary"
            onClick={props.handleClose}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

const ViewCaseNotes = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [cNotes, setcNotes] = useState(props.cNotes || []);

  React.useEffect(() => {
    console.log("Entered Use Effect");
    setcNotes(props.cNotes || []);
  }, [props.cNotes]);

  const [selectedcNotes, setSelectedcNotes] = useState(null);

  const handleSelectcNotes = async (id) => {
    try {
      // Fetch the entire document by its ID
      const selectedcNotesRef = doc(firestore, "CaseNotes", id); // Replace with your Firestore instance
      const selectedcNotesDocSnap = await getDoc(selectedcNotesRef);

      // Check if the document exists
      if (selectedcNotesDocSnap.exists()) {
        // Get the data from the document
        const selectedcNoteData = selectedcNotesDocSnap.data();

        // Include the document ID in the data
        selectedcNoteData.id = selectedcNotesDocSnap.id;
        // Set the entire document data to selectedwForm
        setSelectedcNotes(selectedcNoteData);
        setShow(true);
        console.log("Fetched form for ID:", id);
        console.log("Selected form data:", selectedcNoteData);
      } else {
        console.error("Document not found for ID:", id);
        // Handle the case where the document doesn't exist
      }
    } catch (error) {
      console.error("Error fetching form for ID:", id, error);
      // Handle the error as needed (e.g., display an error message)
    }
  };
  return (
    <Modal
      className="mt-3"
      show={props.show}
      onHide={props.handleClose}
      size="lg"
    >
      <Modal.Body style={{ backgroundColor: "#4d455d", color: "#f5e9cf" }}>
        <Modal.Header closeButton>
          <Modal.Title>View Case Notes</Modal.Title>
        </Modal.Header>

        <table class="table table-dark table-hover mt-3">
          {}
          <thead>
            <tr>
              <th scope="col">Name:</th>
              <th scope="col">Date Created:</th>
              <th scope="col">View Case:</th>
            </tr>
          </thead>
          <tbody>
          {cNotes
          .map((cNote, index) => (
            <tr key={index}>
              <td>{cNote.id}</td>
              <td>{cNote.dateAdded}</td>
              <td>
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#f5e9cf",
                    color: "#4d455d",
                    width: "auto",
                  }}
                  onClick={() => {
                    handleSelectcNotes(cNote.id);
                    handleShow(cNote.id);
                  }} // Pass the form's ID
                >
                  View Note
                </button>
              </td>
              <PublishCaseNotes 
              show={show} 
              handleClose={handleClose} 
              selectedcNotes={selectedcNotes}
              caseNotes={selectedcNotes}
              />
            </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
};

const ViewWeeklyForm = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [wForms, setwForms] = useState(props.wForms || []);
  const [activeTab, setActiveTab] = useState("submitted");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  React.useEffect(() => {
    console.log("Entered Use Effect");
    setwForms(props.wForms || []);
  }, [props.wForms]);

  const [selectedwForm, setSelectedwForm] = useState(null);

  const handleSelectwForm = async (id) => {
    try {
      // Fetch the entire document by its ID
      const selectedFormDocRef = doc(firestore, "WeeklyForm", id); // Replace with your Firestore instance
      const selectedFormDocSnap = await getDoc(selectedFormDocRef);

      // Check if the document exists
      if (selectedFormDocSnap.exists()) {
        // Get the data from the document
        const selectedFormData = selectedFormDocSnap.data();

        // Include the document ID in the data
        selectedFormData.id = selectedFormDocSnap.id;
        // Set the entire document data to selectedwForm
        setSelectedwForm(selectedFormData);
        setShow(true);
        console.log("Fetched form for ID:", id);
        console.log("Selected form data:", selectedFormData);
      } else {
        console.error("Document not found for ID:", id);
        // Handle the case where the document doesn't exist
      }
    } catch (error) {
      console.error("Error fetching form for ID:", id, error);
      // Handle the error as needed (e.g., display an error message)
    }
  };

  return (
    <Modal
      className="mt-3"
      show={props.show}
      onHide={props.handleClose}
      size="lg"
    >
      <Modal.Body style={{ backgroundColor: "#4d455d", color: "#f5e9cf" }}>
        <Modal.Header closeButton>
          <Modal.Title>Patients Weekly Form</Modal.Title>
        </Modal.Header>
        <div className="tabs mt-4 d-flex justify-content-start">
          <button
            className={`me-3 ${activeTab === "submitted" ? "active" : ""}`}
            onClick={() => handleTabChange("submitted")}
          >
            Submitted Weekly Forms
          </button>
          <button
            className={activeTab === "verified" ? "active" : ""}
            onClick={() => handleTabChange("verified")}
          >
            Verified Weekly Forms
          </button>
        </div>
        {activeTab === "submitted" && (
          <>
            <h5>Submitted:</h5>
            <table className="table table-dark table-hover mt-3">
              <thead>
                <tr>
                  <th scope="col">Name:</th>
                  <th scope="col">Date Submitted:</th>
                  <th scope="col">View Form:</th>
                </tr>
              </thead>
              <tbody>
                {wForms
                  .filter((wForm) => wForm.Status === null)
                  .map((wForm, index) => (
                    <tr key={index}>
                      <td>{wForm.id}</td>
                      <td>{wForm.DateSubmitted}</td>
                      <td>
                        <button
                          className="btn"
                          style={{
                            backgroundColor: "#f5e9cf",
                            color: "#4d455d",
                          }}
                          onClick={() => {
                            handleSelectwForm(wForm.id);
                            handleShow(wForm.id);
                          }} // Pass the form's ID
                        >
                          View Form
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        )}
        {activeTab === "verified" && (
          <>
            <h5>Verified:</h5>
            <table className="table table-dark table-hover mt-3">
              <thead>
                <tr>
                  <th scope="col">Name:</th>
                  <th scope="col">Date Submitted:</th>
                  <th scope="col">View Form:</th>
                </tr>
              </thead>
              <tbody>
                {wForms
                  .filter((wForm) => wForm.Status === "Verified")
                  .map((wForm, index) => (
                    <tr key={index}>
                      <td>{wForm.id}</td>
                      <td>{wForm.DateSubmitted}</td>
                      <td>
                        <button
                          className="btn"
                          style={{
                            backgroundColor: "#f5e9cf",
                            color: "#4d455d",
                          }}
                          onClick={() => {
                            handleSelectwForm(wForm.id);
                            handleShow(wForm.id);
                          }} // Pass the form's ID
                        >
                          View Form
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        )}
        <ViewFormWeek
          show={show}
          handleClose={handleClose}
          selectedwForm={selectedwForm}
          weeklyForm={selectedwForm}
        />
      </Modal.Body>
    </Modal>
  );
};

const ViewWellnessForm = (props) => {
  const [activeTab, setActiveTab] = useState("submitted");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [wellForms, setwellForms] = useState(props.wellForms || []);

  React.useEffect(() => {
    console.log("Entered Use Effect");
    setwellForms(props.wellForms || []);
  }, [props.wellForms]);

  const [selectedwellForm, setSelectedwellForm] = useState(null);

  const handleSelectwellForm = async (id) => {
    try {
      // Fetch the entire document by its ID
      const selectedFormDocRef = doc(firestore, "WellnessForm", id); // Replace with your Firestore instance
      const selectedFormDocSnap = await getDoc(selectedFormDocRef);

      // Check if the document exists
      if (selectedFormDocSnap.exists()) {
        // Get the data from the document
        const selectedFormData = selectedFormDocSnap.data();

        // Include the document ID in the data
        selectedFormData.id = selectedFormDocSnap.id;
        // Set the entire document data to selectedwellForm
        setSelectedwellForm(selectedFormData);
        setShow(true);
        console.log("Fetched form for ID:", id);
        console.log("Selected form data:", selectedFormData);
      } else {
        console.error("Document not found for ID:", id);
        // Handle the case where the document doesn't exist
      }
    } catch (error) {
      console.error("Error fetching form for ID:", id, error);
      // Handle the error as needed (e.g., display an error message)
    }
  };

  return (
    <Modal
      className="mt-3"
      show={props.show}
      onHide={props.handleClose}
      size="lg"
    >
      <Modal.Body style={{ backgroundColor: "#4d455d", color: "#f5e9cf" }}>
        <Modal.Header closeButton>
          <Modal.Title>Patients Daily Form</Modal.Title>
        </Modal.Header>
        <div className="tabs mt-4 d-flex justify-content-start">
          <button
            className={`me-3 ${activeTab === "submitted" ? "active" : ""}`}
            onClick={() => handleTabChange("submitted")}
          >
            Submitted Wellness Forms
          </button>
          <button
            className={activeTab === "verified" ? "active" : ""}
            onClick={() => handleTabChange("verified")}
          >
            Verified Wellness Forms
          </button>
        </div>
        {activeTab === "submitted" && (
          <>
            <h5>Submitted:</h5>
            <table class="table table-dark table-hover mt-3">
              <thead>
                <tr>
                  <th scope="col">Name:</th>
                  <th scope="col">Date Submited:</th>
                  <th scope="col">View Form:</th>
                </tr>
              </thead>
              <tbody>
                {wellForms
                  .filter((wellForm) => wellForm.Status === null)
                  .map((wellForm, index) => (
                    <tr key={index}>
                      <td>{wellForm.id}</td>
                      <td>{wellForm.DateSubmitted}</td>
                      <td>
                        <button
                          className="btn"
                          style={{
                            backgroundColor: "#f5e9cf",
                            color: "#4d455d",
                          }}
                          onClick={() => {
                            handleSelectwellForm(wellForm.id);
                            handleShow(wellForm.id);
                          }} // Pass the form's ID
                        >
                          View Form
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        )}
        {activeTab === "verified" && (
          <>
            <h5>Verified:</h5>
            <table class="table table-dark table-hover mt-3">
              <thead>
                <tr>
                  <th scope="col">Name:</th>
                  <th scope="col">Date Submited:</th>
                  <th scope="col">View Form:</th>
                </tr>
              </thead>
              <tbody>
                {wellForms
                  .filter((wellForm) => wellForm.Status === "Verified")
                  .map((wellForm, index) => (
                    <tr key={index}>
                      <td>{wellForm.id}</td>
                      <td>{wellForm.DateSubmitted}</td>
                      <td>
                        <button
                          className="btn"
                          style={{
                            backgroundColor: "#f5e9cf",
                            color: "#4d455d",
                          }}
                          onClick={() => {
                            handleSelectwellForm(wellForm.id);
                            handleShow(wellForm.id);
                          }} // Pass the form's ID
                        >
                          View Form
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        )}
        <ViewFormWell
          show={show}
          handleClose={handleClose}
          selectedwellForm={selectedwellForm}
          wellForm={selectedwellForm}
        />
      </Modal.Body>
    </Modal>
  );
};

const CreateCaseNotes = (props) => {
  const [editorData, setEditorData] = useState("");

  const handleSubmitCase = async () => {
    const { currentUser } = getAuth();

    // Create a new case note object
    const caseNote = {
      content: editorData, // The formatted content from CKEditor
      patientUID: props.selectedPatientUID,
      counselorUID: currentUser.uid,
      dateAdded: new Date().toISOString().split("T")[0],
    };

    // Save the case note to Firebase
    const db = getFirestore();
    const caseNotesCollection = collection(db, "CaseNotes");

    try {
      await addDoc(caseNotesCollection, caseNote);
      console.log("Case note saved successfully!");
    } catch (error) {
      console.error("Error saving case note: ", error);
    }
  };

  return (
    <div>
      <div style={{ backgroundColor: "#f5e9cf" }} className="rounded-5">
        {/* Add your page content here */}
        <h2 className="pt-3 ps-3" style={{ color: "#4d455d" }}>
          Input Case Note:
        </h2>
        <div style={{ color: "black" }} className="pe-3 ps-3">
          <CKEditor
            editor={Editor}
            config={{
              placeholder: "Input your case note...",
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditorData(data); // Update the editorData state with the new content
            }}
          />
        </div>
        <div className="mt-3 d-flex justify-content-end pe-3">
          <button
            className="close-button mb-3 me-3"
            onClick={props.onClose}
            style={{
              backgroundColor: "#4d455d",
              color: "#f5e9cf",
              borderRadius: "30px",
              width: "8%",
              height: "40px",
              borderStyle: "none",
            }}
          >
            Close
          </button>
          <button
            className="close-button mb-3"
            onClick={handleSubmitCase}
            style={{
              backgroundColor: "#4d455d",
              color: "#f5e9cf",
              borderRadius: "30px",
              width: "8%",
              height: "40px",
              borderStyle: "none",
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const PublishCaseNotes = (props) => {
  const { selectedcNotes } = props;

  // Create a function to decode HTML entities
  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <Modal className="mt-3" show={props.show} onHide={props.handleClose}>
      <Modal.Body style={{ backgroundColor: "#4d455d", color: "#f5e9cf" }}>
        <Modal.Header closeButton>
          <Modal.Title>Publish Case Notes:</Modal.Title>
        </Modal.Header>
        <table className="table table-dark table-hover mt-3">
          <thead>
            <tr>
              <th scope="col">Case Notes:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {/* Use dangerouslySetInnerHTML to display the HTML-parsed content */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: decodeHTML(selectedcNotes?.content || ""),
                  }}
                ></div>
              </td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
};

const ViewFormWeek = (props) => {
  console.log("Selected Weekly Form Data:", props.selectedwForm);

  const mapAnswer = (value) => {
    switch (value) {
      case 0:
        return "At no time - 0";
      case 1:
        return "Some of the time - 1";
      case 2:
        return "Less than half of the time - 2";
      case 3:
        return "More than half of the time - 3";
      case 4:
        return "Most of the time - 4";
      case 5:
        return "All the time - 5";
      default:
        return "";
    }
  };

  const questionsAndAnswers = props.selectedwForm
    ? [
        {
          question: "1. I have felt cheerful and in good spirits.",
          answer: mapAnswer(props.selectedwForm.WeeklyQ1),
          id: props.selectedwForm.id,
        },
        {
          question: "2. I have felt calm and relaxed.",
          answer: mapAnswer(props.selectedwForm.WeeklyQ2),
        },
        {
          question: "3. I have felt active and vigorous.",
          answer: mapAnswer(props.selectedwForm.WeeklyQ3),
        },
        {
          question: "4. I woke up feeling fresh and rested.",
          answer: mapAnswer(props.selectedwForm.WeeklyQ4),
        },
        {
          question:
            "5. My daily life has been filled with things that interest me.",
          answer: mapAnswer(props.selectedwForm.WeeklyQ5),
        },
      ]
    : [];

  const selectedwForm = props.selectedwForm || {};
  const q1 = selectedwForm.WeeklyQ1 || 0;
  const q2 = selectedwForm.WeeklyQ2 || 0;
  const q3 = selectedwForm.WeeklyQ3 || 0;
  const q4 = selectedwForm.WeeklyQ4 || 0;
  const q5 = selectedwForm.WeeklyQ5 || 0;

  const totalScore = q1 + q2 + q3 + q4 + q5;

  const updatewFormVerified = async (wFormId) => {
    const formRef = doc(firestore, "WeeklyForm", wFormId);
    try {
      // Update the 'Status' field to "Verified"
      await updateDoc(formRef, {
        Status: "Verified",
      });
      console.log("Form status updated to Verified");
    } catch (error) {
      console.error("Error updating form status:", error);
    }
  };

  return (
    <Modal
      className="mt-3"
      show={props.show}
      onHide={props.handleClose}
      size="lg"
    >
      <Modal.Body style={{ backgroundColor: "#4d455d", color: "#f5e9cf" }}>
        <Modal.Header closeButton>
          <Modal.Title>View Weekly Form:</Modal.Title>
        </Modal.Header>
        <div className="d-flex justify-content-end mt-3">
          {" "}
          Total Score: {totalScore}/25
        </div>
        <table class="table table-dark table-hover mt-3">
          <thead>
            <tr>
              <th scope="col">Question:</th>
              <th scope="col">Answer:</th>
            </tr>
          </thead>
          <tbody>
            {questionsAndAnswers.map((qa, index) => (
              <tr key={index}>
                <td>{qa.question}</td>
                <td>{qa.answer}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-end">
          <button
            className="btn"
            style={{ backgroundColor: "#f5e9cf", color: "red" }}
            onClick={() => updatewFormVerified(props.selectedwForm.id)}
          >
            Unverify
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const mapAnswer = (value) => {
  switch (value) {
    case 1:
      return "Not a very happy person - 1";
    case 2:
      return "Rather unhappy - 2";
    case 3:
      return "Somewhat unhappy - 3";
    case 4:
      return "Neither happy nor unhappy - 4";
    case 5:
      return "Somewhat happy - 5";
    case 6:
      return "Rather happy - 6";
    case 7:
      return "A very happy person - 7";
    default:
      return "";
  }
};

const ViewFormWell = (props) => {
  const questionsAndAnswers = props.selectedwellForm
    ? [
        {
          question: "1. In general, I consider myself:",
          answer: mapAnswer(props.selectedwellForm.WellnessQ1),
          id: props.selectedwellForm.id,
        },
        {
          question: "2. Compared to most of my peers, I consider myself:",
          answer: mapAnswer(props.selectedwellForm.WellnessQ2),
        },
        {
          question:
            "3. Some people are generally very happy. They enjoy life regardless of what is going on, getting the most out of everything. To what extent does this characterization describe you?",
          answer: mapAnswer(props.selectedwellForm.WellnessQ3),
        },
        {
          question:
            "4. Some people are generally not very happy. Although they are not depressed, they never seem as happy as they might be. To what extent does this characterization describe you?",
          answer: mapAnswer(props.selectedwellForm.WellnessQ4),
        },
      ]
    : [];

  const selectedwellForm = props.selectedwellForm || {};

  const totalScore =
    selectedwellForm.WellnessQ1 +
    selectedwellForm.WellnessQ2 +
    selectedwellForm.WellnessQ3 +
    selectedwellForm.WellnessQ4;

  const updatewellFormVerified = async (wellFormId) => {
    const formRef = doc(firestore, "WellnessForm", wellFormId);
    try {
      // Update the 'Status' field to "Verified"
      await updateDoc(formRef, {
        Status: "Verified",
      });
      console.log("Form status updated to Verified");
    } catch (error) {
      console.error("Error updating form status:", error);
    }
  };

  return (
    <Modal
      className="mt-3"
      show={props.show}
      onHide={props.handleClose}
      size="lg"
    >
      <Modal.Body style={{ backgroundColor: "#4d455d", color: "#f5e9cf" }}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div>View Daily Form:</div>
          </Modal.Title>
        </Modal.Header>
        <div className="d-flex justify-content-end mt-3">
          {" "}
          Total Score: {totalScore}/25
        </div>
        <table className="table table-dark table-hover mt-3">
          <thead>
            <tr>
              <th scope="col">Question:</th>
              <th scope="col">Answer:</th>
            </tr>
          </thead>
          <tbody>
            {questionsAndAnswers.map((qa, index) => (
              <tr key={index}>
                <td>{qa.question}</td>
                <td>{qa.answer}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-end">
          <button
            className="btn"
            style={{ backgroundColor: "#f5e9cf", color: "#4d455d" }}
            onClick={() => updatewellFormVerified(props.selectedwellForm.id)}
          >
            Verify
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const CreateAssignment = (props) => {
  const [date, setDate] = useState("");
  const [activity, setActivity] = useState("");
  const [description, setDescription] = useState("");
  const dateInputRef = useRef(null);

  const handleChange = (e) => {
    setDate(e.target.value);
  };

  const handleActivityChange = (e) => {
    setActivity(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmitCreate = async () => {
    const db = getFirestore();
    const { currentUser } = getAuth();
    console.log("currentUser:", currentUser);
    console.log("selectedPatientUID:", props.selectedPatientUID);

    Swal.fire({
      background: "#4d455d",
      color: "#f5e9cf",
      position: "center",
      icon: "success",
      title: "Assignment successfully created!",
      showConfirmButton: false,
      timer: 2000,
    });
  
    if (currentUser && props.selectedPatientUID) {
      const taskData = {
        Activity: activity,
        Deadline: date,
        Description: description,
        counselorUID: currentUser.uid,
        PatientUID: props.selectedPatientUID,
        Status: null,
      };
  
      console.log("PatientUID:", props.selectedPatientUID);
      console.log("counselorUID:", currentUser.uid);
  
      try {
        const docRef = await addDoc(collection(db, "Tasks"), taskData);
        console.log("Document written with ID: ", docRef.id);

        // Perform any other actions after successful upload
        props.handleClose();
        props.updateTasks([...props.tasks, { id: docRef.id, ...taskData }]);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    } else {
      console.error("currentUser or selectedPatientUID is undefined.");
    }
  };

  return (
    <Modal className="mt-3" show={props.show} onHide={props.handleClose}>
      <Modal.Body style={{ backgroundColor: "#4d455d", color: "#f5e9cf" }}>
        <Modal.Header closeButton>
          <Modal.Title>Create Assignment:</Modal.Title>
        </Modal.Header>
        <h5>Input Activity:</h5>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            aria-label="CreateAssignment"
            aria-describedby="basic-addon1"
            onChange={handleActivityChange}
            value={activity}
          />
        </div>
        <div>
          <h5>Input Date:</h5>
          <input
            className="input-group rounded-2"
            type="date"
            onChange={handleChange}
            ref={dateInputRef}
            style={{ border: "none" }}
            value={date}
          />
        </div>
        <div className="form-floating mt-3 mb-3">
          <h5>Input Description:</h5>
          <textarea
            className="form-control"
            id="floatingTextarea2"
            style={{ height: "150px" }}
            onChange={handleDescriptionChange}
            value={description}
          ></textarea>
        </div>

        <Modal.Footer>
          <button
            className="btn"
            style={{ backgroundColor: "#f5e9cf", color: "#4d455d" }}
            onClick={handleSubmitCreate}
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

const ViewWellnessGuide = (props) => {
  const [show, setShow] = useState(false);
  const [guideData, setGuideData] = useState([]);
  const handleClose = () => setShow(false);
  const handleShowAddGuide = () => setShow(true);
  const handleSubmit = () => {
    Swal.fire({
      background: "#4d455d",
      color: "#f5e9cf",
      position: "center",
      icon: "success",
      title: "Guide Added Successfully!",
      showConfirmButton: false,
      timer: 2000,
    });
    setShow(false);
  };

  const showAddGuideButton = props.selectedPatientUID !== null;

  const fetchGuideData = async () => {
    const db = getFirestore();
    const q = query(collection(db, "Guide"));

    try {
      const querySnapshot = await getDocs(q);
      const guides = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        guides.push(data);
      });
      setGuideData(guides);
    } catch (error) {
      console.error("Error fetching guide data: ", error);
    }
  };

  useEffect(() => {
    if (props.selectedPatientUID) {
      fetchGuideData();
    }
  }, [props.selectedPatientUID]);

  return (
    <Modal
      size="xl"
      show={props.show}
      onHide={props.handleClose}
      style={{ overflowY: "hidden" }}
    >
      <Modal.Body style={{ backgroundColor: "#4d455d", color: "#f5e9cf" }}>
        <Modal.Header closeButton>
          <Modal.Title>View Wellness Guide:</Modal.Title>
        </Modal.Header>
        <div className="d-flex justify-content-center mt-2 custom-scroll-wellness">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">Wellness Video:</th>
                <th scope="col">Title:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row">
                  <iframe
                    src="https://www.youtube.com/embed/-7-CAFhJn78"
                    title="Breathing Exercises for Relaxation or COPD - Ask Doctor Jo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ width: "400px" }}
                  ></iframe>
                </td>
                <th>Breathing Exercise</th>
              </tr>
              <tr>
                <td scope="row">
                  <iframe
                    src="https://www.youtube.com/embed/cyMxWXlX9sU"
                    title="10 Minute Guided Meditation for Positive Energy, Peace &amp; Light 🌤"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ width: "400px" }}
                  ></iframe>
                </td>
                <th>Meditation Guide</th>
              </tr>
              <tr>
                <td scope="row">
                  <iframe
                    src="https://www.youtube.com/embed/rvaqPPjtxng"
                    title="Guided Sleep Meditation &amp; Deep Relaxation 🌙"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ width: "400px" }}
                  ></iframe>
                </td>
                <th>Sleep Meditation</th>
              </tr>
              {guideData
                .filter(
                  (guide) => guide.PatientUID === props.selectedPatientUID
                )
                .map((guide, index) => (
                  <tr key={index}>
                    <td>
                      <iframe
                        src={guide.Link}
                        title={guide.Title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        style={{ width: "400px" }}
                      ></iframe>
                    </td>
                    <th>{guide.Title}</th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Modal.Footer className="mt-2">
          {showAddGuideButton && (
            <button
              className="btn ms-3"
              style={{ backgroundColor: "#f5e9cf" }}
              onClick={() => handleShowAddGuide(props.selectedPatientUID)}
            >
              Add Guide
            </button>
          )}
          <AddGuide
            show={show}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            selectedPatientUID={props.selectedPatientUID}
          />
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

const AddGuide = (props) => {
  const [guide, setGuide] = useState("");
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [vidLink, setVidLink] = useState("");

  const handleGuideChange = (e) => {
    setTitle(e.target.value);
  };

  const handleLinkChange = (e) => {
    setVidLink(e.target.value);
  };

  function extractSrcFromIframe(iframeString) {
    // Use regular expressions to extract the src attribute
    const srcRegex = /src=["'](https:\/\/www\.youtube\.com\/embed\/[^"']+)/;
    const match = iframeString.match(srcRegex);
    return match ? match[1] : ""; // Return the extracted src or an empty string if not found
  }
  const handleAddGuide = () => {
    const db = getFirestore();
    const { currentUser } = getAuth();
    console.log("currentUser:", currentUser.uid);
    console.log("selectedPatientUID:", props.selectedPatientUID);

    if (currentUser && props.selectedPatientUID) {
      const guideData = {
        Title: title,
        Link: extractSrcFromIframe(vidLink),
        dateAdded: new Date().toISOString().split("T")[0],
        counselorUID: currentUser.uid,
        PatientUID: props.selectedPatientUID,
      };

      console.log("PatientUID:", props.selectedPatientUID);
      console.log("counselorUID:", currentUser.uid);

      addDoc(collection(db, "Guide"), guideData)
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          // Perform any other actions after successful upload
          props.handleClose();
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    } else {
      console.error("currentUser or selectedPatientUID is undefined.");
    }
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Body style={{ backgroundColor: "#4d455d", color: "#f5e9cf" }}>
        <Modal.Header closeButton>
          <Modal.Title>Publish A Guide</Modal.Title>
        </Modal.Header>
        <div class="input-group mb-3 mt-3">
          <h5>Input Title:</h5>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              aria-label="VideoTitle"
              aria-describedby="basic-addon1"
              onChange={handleGuideChange}
              value={title}
            />
          </div>
          <h5>Input Video Link:</h5>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              aria-label="VideoLink"
              aria-describedby="basic-addon1"
              onChange={handleLinkChange}
              value={vidLink}
            />
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="btn"
            style={{ backgroundColor: "#f5e9cf" }}
            onClick={handleAddGuide}
          >
            Submit
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
