import "../../css/SignUp.css";
import { useNavigate } from "react-router-dom";
import { BDAY } from "../SignUpQuestions.js/SignUp_BirthDay";
import React, { useRef, useState } from "react";
import { RBUTTON } from "../SignUpQuestions.js/SignUp_Radio";
import { CONTACT } from "../SignUpQuestions.js/SignUp_Contact";
import { CPERSON } from "../SignUpQuestions.js/SignUp_ContactPerson";
import { SignUpPageTwo } from "./SignUp_Page2";

export const SignUpPageOne = () => {
  //! Handle Full Name
  const [getFName, setFname] = useState("");
  const handleInputFname = (event) => {
    setFname(event.target.value);
  };

  //! Handle Input Date
  const [date, setDate] = useState("");
  const dateInputRef = useRef(null);
  const handleChangeDate = (e) => {
    setDate(e.target.value);
  };

  //! Handle Radio Button
  const [gender, setGender] = useState("");
  const handleInputGender = (event) => {
    setGender(event.target.value);
  };

  //! Handle Local Address
  const [getLocalAddress, setLocalAddress] = useState("");
  const handleLocalAddress = (event) => {
    setLocalAddress(event.target.value);
  };

  //! Handle Contact and CheckBox and Email
  const [getContact, setContact] = useState("");
  const handleContact = (event) => {
    setContact(event.target.value);
  };

  const [getCheck, setCheck] = useState("");
  const handleContactCheck = (event) => {
    setCheck(event.target.value);
  };

  const [getEmail, setEmail] = useState("");
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  //!Contact Person Info and Doctor Info also Description Box
  //*Full name of Person if emergency
  const [getContactFName, setContactFName] = useState("");
  const handleContactFName = (event) => {
    setContactFName(event.target.value);
  };

  //*Relataionship of contact Person to patient
  const [getRelationship, setRelationship] = useState("");
  const handleRelationship = (event) => {
    setRelationship(event.target.value);
  };

  //*Emergency contact Person phone number
  const [getContactPhone, setContactPhone] = useState("");
  const handleContactPhone = (event) => {
    setContactPhone(event.target.value);
  };

  //*Doctor Full Name
  const [getDoctorFullName, setDoctorFullName] = useState("");
  const handleDoctorFullName = (event) => {
    setDoctorFullName(event.target.value);
  };

  //*Doctor Phone Number
  const [getDoctorPhone, setDoctorPhone] = useState("");
  const handleDoctorPhone = (event) => {
    setDoctorPhone(event.target.value);
  };

  //*Description Box
  const [getDescriptionBox, setDescriptionBox] = useState(``);
  const handleDescriptionBox = (event) => {
    setDescriptionBox(event.target.value);
  };

  //*Assessment Description Box
  const [getAssessmentBox, setAssessmentBox] = useState(``);
  const handleAssessmentBox = (event) => {
    setAssessmentBox(event.target.value);
  };

  //*Button Navigation
  const navigate = useNavigate();
  const routeChange = () => {
    let path = "/Sign Up=Page Two";
    navigate(path);
  };

  return (
    <>
      <h1 id="textHead" class="d-flex justify-content-center ">
        Sign Up Form
      </h1>
      <form>
        {/* Input Full Name */}
        <div>
          <p>Full Name:</p>
          <input
            type="text"
            placeholder="e.g(Surname, First, M.I)"
            class="form-control  rounded-4"
            onChange={handleInputFname}
          />
        </div>
        {/*Date for BDAY */}
        <div class="mt-3">
          <BDAY
            handleChangeDate={handleChangeDate}
            dateInputRef={dateInputRef}
          />
        </div>
        {/* Radio Button For Gender */}
        <div class="mt-3">
          <p>Gender:</p>
          <RBUTTON handleInputGender={handleInputGender} />
        </div>
        {/* Input Local Address and Contact*/}
        <div>
          <CONTACT
            setContact={handleContact}
            setChecked={handleContactCheck}
            setEmail={handleEmail}
            setLocalAddress={handleLocalAddress}
          />
        </div>
        {/* Person to contact */}
        <div>
          <CPERSON
            contactFNPerson={handleContactFName}
            contactRelationship={handleRelationship}
            contactEmgPhone={handleContactPhone}
            doctorFName={handleDoctorFullName}
            doctorPhone={handleDoctorPhone}
            descriptionAREA={handleDescriptionBox}
            descriptionAssessment={handleAssessmentBox}
          />
        </div>
      </form>
      <div class="d-flex justify-content-end mt-3 mb-3">
        <button
          class="fw-semibold rounded-4"
          id="buttonNext"
          onClick={routeChange}
        >
          Next
        </button>
      </div>
    </>
  );
};
