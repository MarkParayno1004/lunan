import "../css/SignUp.css";
import { BDAY } from "./SignUpQuestions.js/SignUp_BirthDay";
import React, { useRef, useState } from "react";
import { RBUTTON } from "./SignUpQuestions.js/SignUp_Radio";
import { CONTACT } from "./SignUpQuestions.js/SignUp_Contact";
export const SignUp = () => {
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
  return (
    <div class="container-fluid d-flex justify-content-center" id="signupBG">
      <div class="container-lg mt-3 mb-3 rounded-4" id="signupForm">
        <h1
          id="textHead"
          class="d-flex justify-content-center fw-light"
          style={{ color: "white" }}
        >
          Sign Up Form
        </h1>
        <form>
          {/* Input Full Name */}
          <div>
            <p>Full Name:</p>
            <input
              type="text"
              placeholder="e.g(Surname, First, M.I)"
              class="form-control"
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
          <div class="mt-3">
            <p>Local Address:</p>
            <input
              type="text"
              class="form-control"
              placeholder="Street and Number/ City / Region / Zip"
              onChange={handleLocalAddress}
            />
          </div>
          <div>
            <CONTACT
              setContact={handleContact}
              setChecked={handleContactCheck}
              setEmail={handleEmail}
            />
          </div>
          {/* Person to contact */}
          <div></div>
        </form>
      </div>
    </div>
  );
};
