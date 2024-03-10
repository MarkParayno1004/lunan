import React from "react";
import { Modal } from "react-bootstrap";
import Pic from "../../assets/img/ProfilePic.png";
import { useState } from "react";
import "../../css/PatientInfo.css";
import "../../css/customscroll.css";
import "../../css/WellnessPageCounselor.css";
import { ViewModalAssign } from "../Modals/ViewModalAssign";
import { ViewWeeklyForm } from "../Modals/ViewWeeklyForm";
import { ViewWellnessForm } from "../Modals/ViewWellnessForm";
import { ViewWellnessGuide } from "../Modals/ViewWellnessGuide";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../firebase/firebase-config";

function SupervisorPatientInfoComponent(props) {
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
  const handleShowWG = () => setWellnessGuide(true);

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
                        {props.patientData
                          ? props.patientData.firstName
                          : "N/A"}
                      </span>
                    </div>
                    <div className="col">
                      <strong>Age: </strong>
                      <span style={{ color: "red" }}>
                        {props.patientData ? props.patientData.Age : "N/A"}
                      </span>
                    </div>
                    <div className="col">
                      <strong>Gender: </strong>
                      <span style={{ color: "red" }}>
                        {props.patientData ? props.patientData.Gender : "N/A"}
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
                    {props.patientData ? props.patientData.CellPhone : "N/A"}
                  </span>
                </div>
                <div className="col">
                  <strong>Email: </strong>
                  <span style={{ color: "red" }}>
                    {props.patientData ? props.patientData.Email : "N/A"}
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
                onClick={handleShowWG}
              >
                View Wellness Guide
              </button>

              {/*MODALS */}
              <ViewModalAssign
                show={showAss}
                handleClose={handleCloseAss}
                selectedPatientUID={props.selectedPatientUID}
                tasks={tasksForSelectedPatient}
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
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default SupervisorPatientInfoComponent;
