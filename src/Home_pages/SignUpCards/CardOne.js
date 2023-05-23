import { useState } from "react";
import { useRef } from "react";
export const CardOne = ({ ButtonNext }) => {
  //! Get Patient's Full Name , Age and Handle Full Name Inputed
  const [getFname, setFname] = useState("");
  const handleFname = (event) => {
    setFname(event.target.value);
  };

  const [getAge, setAge] = useState();
  const handleAge = (event) => {
    setAge(event.target.value);
  };

  //! Get Patient's Birth Date and Handle Date Inputed
  const [getBirhdate, setBirthDate] = useState("");
  const birthDateInputRef = useRef(null);
  const handleBirthDate = (e) => {
    setBirthDate(e.target.value);
  };

  const [getdateToday, setdateToday] = useState("");
  const dateTodayInputRef = useRef(null);
  const handleDateToday = (e) => {
    setdateToday(e.target.value);
  };

  //! Get Patient's Gender
  const [getGender, setGender] = useState("");
  const handleGender = (e) => {
    setGender(e.target.value);
  };

  return (
    <>
      <div className="container-fluid d-flex justify-content-center mt-3">
        <div class="card " style={{ width: 50 + "rem" }}>
          <div class="card-header">
            Please fill up this intake form: (This form will be your Sign Up
            form or Register Form)
          </div>
          <ul class="list-group list-group-flush">
            {/* Input Patient's Full Name */}
            <li class="list-group-item">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control rounded-4 me-1"
                  placeholder="Full Name:"
                  onChange={handleFname}
                />
                <input
                  type="number"
                  class="form-control rounded-4"
                  placeholder="Age:"
                  onChange={handleAge}
                />
              </div>
            </li>

            {/* Input Date Today and Birth Date */}
            <li class="list-group-item">
              <p>Date today & your birth date:</p>
              <div class="input-group">
                <input
                  type="date"
                  class="form-control  rounded-4 me-1"
                  day
                  ref={dateTodayInputRef}
                  onChange={handleDateToday}
                />
                <input
                  type="date"
                  class="form-control  rounded-4"
                  ref={birthDateInputRef}
                  onChange={handleBirthDate}
                />
              </div>
            </li>

            {/* Radio Button for Gender */}
            <li class="list-group-item">
              <div class="form-check-inline">
                <p>Gender:</p>
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleGender}
                />
                <label class="form-check-label ms-1" for="exampleRadios1">
                  Male
                </label>
              </div>
              <div class="form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleGender}
                />
                <label class="form-check-label ms-1" for="exampleRadios1">
                  Female
                </label>
              </div>
              <div class="form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  value="Transgender"
                  onChange={handleGender}
                />
                <label class="form-check-label ms-1" for="exampleRadios1">
                  Transgender
                </label>
              </div>
              <div class="form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  value="Other"
                  onChange={handleGender}
                />
                <label class="form-check-label ms-1" for="exampleRadios1">
                  Other
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button
          className="nav-link fs-5 mt-2 me-3 mb-2 rounded-4"
          id="buttonCard"
          onClick={ButtonNext}
        >
          Next
        </button>
      </div>
    </>
  );
};
