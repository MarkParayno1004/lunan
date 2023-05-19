import "../css/SignUp.css";
import { BDAY } from "./SignUpQuestions.js/SignUp_BirthDay";
import React, { useRef, useState } from "react";
export const SignUp = () => {
  //! Handle Full Name
  const [fullName, setFullName] = useState("");
  const handleInputFname = (event) => {
    setFullName(event.target.value);
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
          <p>Full Name e.g(Surname, First, M.I):</p>
          <input type="text" class="form-control" onChange={handleInputFname} />
          <div class="mb-3">
            <BDAY
              handleChangeDate={handleChangeDate}
              dateInputRef={dateInputRef}
            />
          </div>
          {/* Radio Button For Gender */}
          <p class="mb-3">Gender:</p>
          <div></div>
        </form>
      </div>
    </div>
  );
};
