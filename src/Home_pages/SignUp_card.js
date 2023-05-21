import { useState } from "react";
import { useRef } from "react";
export const SIGNUPCARD = () => {
  //!Logic of next and Previous Button
  const [card, setStep] = useState(1);

  const handleNext = () => {
    setStep(card + 1);
  };

  const handlePrevious = () => {
    setStep(card - 1);
  };

  const handleSubmit = () => {
    alert("Form submitted!");
  };

  //! First Card
  const Card1 = ({ onNext }) => {
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
      <div>
        <div className="container-fluid d-flex justify-content-center mt-3">
          <div class="card" style={{ width: 50 + "rem" }}>
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
            onClick={onNext}
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  //! Second Card
  const Card2 = ({ onPrevious, onNext }) => {
    //!Get Patient's Address
    const [getStreetNum, setStreeNum] = useState("");
    const handleStreetNum = (e) => {
      setStreeNum(e.target.value);
    };

    const [getBarangay, setBarangay] = useState("");
    const handleBarangay = (e) => {
      setBarangay(e.target.value);
    };

    const [getCity, setCity] = useState("");
    const handleCity = (e) => {
      setCity(e.target.value);
    };

    const [getRegion, setRegion] = useState("");
    const handleRegion = (e) => {
      setRegion(e.target.value);
    };

    const [getZip, setZip] = useState("");
    const handleZip = (e) => {
      setZip(e.target.value);
    };

    //!Patient Current Number and Verification of checkboxes
    const [getHomePhone, setHomePhone] = useState();
    const handleHomePhone = (e) => {
      setHomePhone(e.target.value);
    };

    const [getCellPhone, setCellPhone] = useState();
    const handleCellPhone = (e) => {
      setCellPhone(e.target.value);
    };

    const [getEmail, setEmail] = useState("");
    const handleEmail = (e) => {
      setEmail(e.target.value);
    };

    const [checkMessageHome, setgetMessageHome] = useState("");
    const handleMessageHome = (e) => {
      setgetMessageHome(e.target.value);
    };

    const [checkMessageCell, setMessageCell] = useState("");
    const handleMessageCell = (e) => {
      setMessageCell(e.target.value);
    };

    const [checkEmail, setMessageEmail] = useState("");
    const handleMessageEmail = (e) => {
      setMessageEmail(e.target.value);
    };
    return (
      <div>
        <div className="container-fluid d-flex justify-content-center mt-3">
          <div class="card" style={{ width: 50 + "rem" }}>
            <div class="card-header">
              Please fill up this intake form: (This form will be your Sign Up
              form or Register Form)
            </div>
            <ul class="list-group list-group-flush">
              {/* Input Patient's Local Address */}
              <li class="list-group-item">
                <p>Current Address:</p>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control rounded-4 me-1"
                    placeholder="Street and Number:"
                    onChange={handleStreetNum}
                  />
                  <input
                    type="text"
                    class="form-control rounded-4 me-1"
                    placeholder="Barangay:"
                    onChange={handleBarangay}
                  />
                  <input
                    type="text"
                    class="form-control rounded-4"
                    placeholder="City:"
                    onChange={handleCity}
                  />
                </div>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control rounded-4 mt-2 me-1"
                    placeholder="Region:"
                    onChange={handleRegion}
                  />
                  <input
                    type="number"
                    class="form-control rounded-4 mt-2"
                    placeholder="Zip:"
                    onChange={handleZip}
                  />
                </div>
              </li>

              {/* Home Phone , Cell Phone, Email and Checkboxes*/}
              {/* Home Phone*/}
              <li class="list-group-item">
                <div class="input-group">
                  <input
                    type="number"
                    class="form-control  rounded-4 me-1"
                    placeholder="Home Phone Number:"
                    onChange={handleHomePhone}
                  />
                  <div class="form-check-inline">
                    <span>May I leave a message?:</span>
                    <input
                      class="form-check-input ms-2  "
                      type="radio"
                      name="Approval"
                      value="Yes"
                      onChange={handleMessageHome}
                    />
                    <label class="form-check-label ms-1">Yes</label>
                    <input
                      class="form-check-input ms-2  "
                      type="radio"
                      name="Approval"
                      value="No"
                      onChange={handleMessageHome}
                    />
                    <label class="form-check-label ms-1">No</label>
                  </div>
                </div>

                {/* Cell Phone Number */}
                <div class="input-group">
                  <input
                    type="number"
                    class="form-control  rounded-4 me-1 mt-2"
                    placeholder="Cell Phone Number:"
                    onChange={handleCellPhone}
                  />
                  <div class="form-check-inline mt-2">
                    <span>May I leave a message?:</span>
                    <input
                      class="form-check-input ms-2  "
                      type="radio"
                      name="Approval"
                      value="Yes"
                      onChange={handleMessageCell}
                    />
                    <label class="form-check-label ms-1">Yes</label>
                    <input
                      class="form-check-input ms-2  "
                      type="radio"
                      name="Approval"
                      value="No"
                      onChange={handleMessageCell}
                    />
                    <label class="form-check-label ms-1">No</label>
                  </div>
                </div>

                {/* Email */}
                <div class="input-group mt-2">
                  <input
                    type="text"
                    class="form-control  rounded-4 me-1"
                    placeholder="Email:"
                    onChange={handleEmail}
                  />
                  <div class="form-check-inline ms-5 align-items-start">
                    <span>May I email you?:</span>
                    <input
                      class="form-check-input ms-2  "
                      type="radio"
                      name="Approval"
                      value="Yes"
                      onChange={handleMessageEmail}
                    />
                    <label class="form-check-label ms-1">Yes</label>
                    <input
                      class="form-check-input ms-2  "
                      type="radio"
                      name="Approval"
                      value="No"
                      onChange={handleMessageEmail}
                    />
                    <label class="form-check-label ms-1">No</label>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="btn nav-link fs-5 mt-2 me-3 mb-2 rounded-4"
            id="buttonCard"
            onClick={onPrevious}
          >
            Back
          </button>
          <button
            className="btn nav-link fs-5 mt-2 me-3 mb-2 rounded-4"
            id="buttonCard"
            onClick={onNext}
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  //! Third Card
  //!Person to contact, relationship, phone number
  const Card3 = ({ onPrevious, onNext }) => {
    const [getContactPersonFname, setContactPersonFname] = useState("");
    const handleContactPersonFname = (e) => {
      setContactPersonFname(e.target.value);
    };

    const [getRelationship, setRelationship] = useState("");
    const handleRelationship = (e) => {
      setRelationship(e.target.value);
    };

    const [getContactPersonNum, setContactPersonNum] = useState();
    const handleContactPersonNum = (e) => {
      setContactPersonNum(e.target.value);
    };

    //!Patient's Care Doctor Full Name and Phone Number
    const [getDoctorFName, setDoctorFname] = useState("");
    const handleDoctorFname = (e) => {
      setDoctorFname(e.target.value);
    };

    const [getDoctorNum, setDoctorNum] = useState();
    const handleDoctorNum = (e) => {
      setDoctorNum(e.target.value);
    };

    //!Patient's Comment
    const [getCommentLearn, setCommentLearn] = useState("");
    const handlesetCommentLearn = (e) => {
      setCommentLearn(e.target.value);
    };

    const [getCommentAssessment, setCommentAssessment] = useState("");
    const handlesetCommentAssessment = (e) => {
      setCommentAssessment(e.target.value);
    };

    return (
      <div>
        <div className="container-fluid d-flex justify-content-center mt-3">
          <div class="card" style={{ width: 50 + "rem" }}>
            <div class="card-header">
              Please fill up this intake form: (This form will be your Sign Up
              form or Register Form)
            </div>
            <ul class="list-group list-group-flush">
              {/* Input Patient's Local Address */}
              <li class="list-group-item">
                {/* Person to contact if emergency */}
                <p class="mt-3">Person to contact in case of an emergency:</p>
                <div class="input-group">
                  <input
                    type="text"
                    aria-label="EmergencyFullName"
                    placeholder="Full Name:"
                    class="form-control me-3 rounded-4"
                    onChange={handleContactPersonFname}
                  />
                  <input
                    type="text"
                    aria-label="Relationship"
                    placeholder="Relationship to client"
                    class="form-control me-3 rounded-4"
                    onChange={handleRelationship}
                  />
                  <input
                    type="text"
                    aria-label="Phone"
                    placeholder="Phone Number:"
                    class="form-control rounded-4"
                    onChange={handleContactPersonNum}
                  />
                </div>
                {/* Doctor Info */}
                <p class="mt-3">Patient Care doctor:</p>
                <div class="input-group mt-3">
                  <input
                    type="text"
                    aria-label="DoctorFullName"
                    placeholder="Full Name:"
                    class="form-control me-3 rounded-4"
                    onChange={handleDoctorFname}
                  />
                  <input
                    type="text"
                    aria-label="DoctorPhone"
                    placeholder="Phone Number:"
                    class="form-control me-3 rounded-4"
                    onChange={handleDoctorNum}
                  />
                </div>
                <p class="mt-3">How did you learn about me? :</p>
                <div class="form-floating ">
                  <textarea
                    class="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                    onChange={handlesetCommentLearn}
                  ></textarea>
                  <label for="floatingTextarea">Comments</label>
                </div>
                <p class="mt-3">
                  What prompted you to seek therapy or an assessment? :
                </p>
                <div class="form-floating ">
                  <textarea
                    class="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                    onChange={handlesetCommentAssessment}
                  ></textarea>
                  <label for="floatingTextarea">Comments</label>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="btn nav-link fs-5 mt-2 me-3 mb-2 rounded-4"
            id="buttonCard"
            onClick={onPrevious}
          >
            Back
          </button>
          <button
            className="btn nav-link fs-5 mt-2 me-3 mb-2 rounded-4"
            id="buttonCard"
            onClick={onNext}
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  //! 4th Card
  const Card4 = ({ onPrevious, onNext }) => {
    //! If answer is yes in Romantic Relationship
    const [showRomanticRelationship, setRomanticRelationship] = useState(false);
    const handleRomanticRelationship = (event) => {
      setRomanticRelationship(event.target.value === "true");
    };

    //! If answer is yes in Do you have a child?
    const [showChildren, setChildren] = useState(false);
    const handleChildren = (event) => {
      setChildren(event.target.value === "true");
    };
    return (
      <div>
        <div className="container-fluid d-flex justify-content-center mt-3">
          <div class="card" style={{ width: 50 + "rem" }}>
            <div class="card-header">
              Please fill up this intake form: (This form will be your Sign Up
              form or Register Form)
            </div>
            <ul class="list-group list-group-flush">
              {/* Sexual Preference */}
              <li class="list-group-item">
                <span className="">Sexual Preference:</span>
                <div className="form-check-inline ms-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="SexPreference"
                    value="Men"
                  />
                  <label className="form-check-label ms-1">Men</label>
                </div>
                <div className="form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="SexPreference"
                    value="Women"
                  />
                  <label className="form-check-label ms-1">Women</label>
                </div>
                <div className="form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="SexPreference"
                    value="Both"
                  />
                  <label className="form-check-label ms-1" for="exampleRadios1">
                    Both
                  </label>
                </div>
              </li>

              {/* Marital Status */}
              <li class="list-group-item">
                <span className="">Marital Status:</span>
                <div className="form-check-inline ms-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="MaritalStatus"
                    value="Never Married"
                  />
                  <label className="form-check-label ms-1">Never Married</label>
                </div>
                <div className="form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="MaritalStatus"
                    value="Partnered"
                  />
                  <label className="form-check-label ms-1">Partnered</label>
                </div>
                <div className="form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="MaritalStatus"
                    value="Married"
                  />
                  <label className="form-check-label ms-1" for="exampleRadios1">
                    Married
                  </label>
                </div>
                <div className="form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="MaritalStatus"
                    value="Separated"
                  />
                  <label className="form-check-label ms-1" for="exampleRadios1">
                    Separated
                  </label>
                </div>
                <div className="form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="MaritalStatus"
                    value="Divorced"
                  />
                  <label className="form-check-label ms-1" for="exampleRadios1">
                    Divorced
                  </label>
                </div>
                <div className="form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="MaritalStatus"
                    value="Widowed"
                  />
                  <label className="form-check-label " for="exampleRadios1">
                    Widowed
                  </label>
                </div>
              </li>

              {/* Series of Questions */}
              {/* Romantic RelationShip Question */}
              <li class="list-group-item">
                <span>Are you currently in a romantic relationship?</span>
                <div className="form-check-inline ms-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="RomanticRelationship"
                    value="true"
                    onChange={handleRomanticRelationship}
                  />
                  <label className="form-check-label ms-1" for="exampleRadios1">
                    Yes
                  </label>
                </div>
                <div className="form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="RomanticRelationship"
                    value="false"
                    onChange={handleRomanticRelationship}
                  />
                  <label className="form-check-label " for="exampleRadios1">
                    No
                  </label>
                </div>
                <div class="input-group mt-3">
                  {showRomanticRelationship && <RomanticRelationShipYes />}
                </div>

                {/* Do you have a child? */}
                <span>Do you have a child?</span>
                <div className="form-check-inline ms-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="DoYouHaveAChild"
                    value="true"
                    onChange={handleChildren}
                  />
                  <label className="form-check-label ms-1" for="exampleRadios1">
                    Yes
                  </label>
                </div>
                <div className="form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="DoYouHaveAChild"
                    value="false"
                    onChange={handleChildren}
                  />
                  <label className="form-check-label " for="exampleRadios1">
                    No
                  </label>
                </div>
                <div class="input-group mt-3">
                  {showChildren && <ChildrenYes />}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="btn nav-link fs-5 mt-2 me-3 mb-2 rounded-4"
            id="buttonCard"
            onClick={onPrevious}
          >
            Back
          </button>
          <button
            className="btn nav-link fs-5 mt-2 me-3 mb-2 rounded-4"
            id="buttonCard"
            onClick={onNext}
          >
            Next
          </button>
        </div>
      </div>
    );
  };
  const RomanticRelationShipYes = () => {
    return (
      <>
        <span className="me-2 d-flex align-items-center">
          If yes, for how long?
        </span>
        <input
          type="text"
          aria-label="DoctorPhone"
          placeholder="Answer:"
          class="form-control me-3 rounded-4"
        />
        <div class="input-group mt-3">
          <p className="me-2 d-flex align-items-center">
            If yes, on a scale of 1-10 (10=great), <br />
            how would you rate the quality of your romantic relationship?
          </p>
          <input
            type="number"
            aria-label="CurrentRelationAnswer"
            placeholder="Answer:"
            class="form-control me-3 rounded-4"
          />
        </div>
      </>
    );
  };

  const ChildrenYes = () => {
    return (
      <>
        <div class="input-group">
          <span className="me-2 d-flex align-items-center">
            If yes, how many?
          </span>
          <input
            type="text"
            aria-label="CurrentRelationAnswer"
            placeholder="Answer:"
            class="form-control me-3 rounded-4"
          />
          <span class="d-flex align-items-center">Age?</span>
          <input
            type="number"
            aria-label="ChildAge"
            placeholder="Answer:"
            class="form-control ms-1 rounded-4"
          />
        </div>
      </>
    );
  };

  //!5th Card
  const Card5 = ({ onPrevious, onNext }) => {
    return (
      <div>
        <div class="card-header">
          Please fill up this intake form: (This form will be your Sign Up form
          or Register Form)
        </div>
        <ul class="list-group list-group-flush">
          {/* Input Patient's Full Name */}
          <li class="list-group-item">
            <div class="input-group">
              <input
                type="text"
                class="form-control rounded-4 me-1"
                placeholder="Input Full Name:"
              />
              <input
                type="number"
                class="form-control rounded-4"
                placeholder="Input Age:"
              />
            </div>
          </li>

          {/* Input Date Today and Birth Date */}
          <li class="list-group-item">
            <p>Date today & your birth date:</p>
            <div class="input-group">
              <input type="date" class="form-control  rounded-4 me-1" day />
              <input type="date" class="form-control  rounded-4" />
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
              />
              <label class="form-check-label ms-1" for="exampleRadios1">
                Other
              </label>
            </div>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <div>
      {card === 1 && <Card1 onNext={handleNext} />}
      {card === 2 && <Card2 onPrevious={handlePrevious} onNext={handleNext} />}
      {card === 3 && <Card3 onPrevious={handlePrevious} onNext={handleNext} />}
      {card === 4 && <Card4 onPrevious={handlePrevious} onNext={handleNext} />}
      {card === 5 && (
        <Card5 onPrevious={handlePrevious} onSubmit={handleSubmit} />
      )}
    </div>
  );
};
