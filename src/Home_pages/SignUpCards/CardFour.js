import { useState } from "react";
export const CardFour = ({ ButtonBack, ButtonNext }) => {
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

  //! If answer is yes in psychotherapy
  const [showPsychoTherapy, setPsychoTherapy] = useState(false);
  const handlePsychoTherapy = (event) => {
    setPsychoTherapy(event.target.value === "true");
  };
  //! Get value of Radio Button ofSexual Preference
  const [getSexualPref, setSexualPref] = useState("");
  const handleSexualPref = (e) => {
    setSexualPref(e.target.value);
  };

  //! Get Value of Radio Button of Marital Status
  const [getMaritalStatus, setMaritalStatus] = useState("");
  const handleMaritalStatus = (e) => {
    setMaritalStatus(e.target.value);
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
                  onChange={handleSexualPref}
                />
                <label className="form-check-label ms-1">Men</label>
              </div>
              <div className="form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="SexPreference"
                  value="Women"
                  onChange={handleSexualPref}
                />
                <label className="form-check-label ms-1">Women</label>
              </div>
              <div className="form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="SexPreference"
                  value="Both"
                  onChange={handleSexualPref}
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
                  onChange={handleMaritalStatus}
                />
                <label className="form-check-label ms-1">Never Married</label>
              </div>
              <div className="form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="MaritalStatus"
                  value="Partnered"
                  onChange={handleMaritalStatus}
                />
                <label className="form-check-label ms-1">Partnered</label>
              </div>
              <div className="form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="MaritalStatus"
                  value="Married"
                  onChange={handleMaritalStatus}
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
                  onChange={handleMaritalStatus}
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
                  onChange={handleMaritalStatus}
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
                  onChange={handleMaritalStatus}
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

              {/* Previous psychotherapy */}
              <span>Have you had previous psychotherapy?</span>
              <div className="form-check-inline ms-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="psychoTherapy"
                  value="true"
                  onChange={handlePsychoTherapy}
                />
                <label className="form-check-label ms-1" for="exampleRadios1">
                  Yes
                </label>
              </div>
              <div className="form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="psychoTherapy"
                  value="false"
                  onChange={handlePsychoTherapy}
                />
                <label className="form-check-label " for="exampleRadios1">
                  No
                </label>
              </div>
              <div class="input-group mt-3">
                {showPsychoTherapy && <PsychoTherapy />}
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button
          className="btn nav-link fs-5 mt-2 me-3 mb-2 rounded-4"
          id="buttonCard"
          onClick={ButtonBack}
        >
          Back
        </button>
        <button
          className="btn nav-link fs-5 mt-2 me-3 mb-2 rounded-4"
          id="buttonCard"
          onClick={ButtonNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

//! if patient chooses yes, in the question: Are you currently in a romantic relationship?
const RomanticRelationShipYes = () => {
  //!Store the answer
  const [getCurrentRelationAnswer, setCurrentRelationAnswer] = useState();
  const handleCurrentRelation = (e) => {
    setCurrentRelationAnswer(e.target.value);
  };

  const [getScale, setScale] = useState();
  const handleScale = (e) => {
    setScale(e.target.value);
  };
  return (
    <>
      <span className="me-2 d-flex align-items-center">
        If yes, for how long?
      </span>
      <input
        type="number"
        aria-label="CurrentRelationAnswer"
        placeholder="Answer:"
        class="form-control me-3 rounded-4"
        onChange={handleCurrentRelation}
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
          onChange={handleScale}
        />
      </div>
    </>
  );
};

//! if patient chooses yes, in the question: Do you have a child??
const ChildrenYes = () => {
  const [getChildren, setChildren] = useState();
  const handleChildren = (e) => {
    setChildren(e.target.value);
  };

  const [getChildrenAge, setChildrenAge] = useState();
  const handleChildrenAge = (e) => {
    setChildrenAge(e.target.value);
  };
  return (
    <>
      <div class="input-group">
        <span className="me-2 d-flex align-items-center">
          If yes, how many?
        </span>
        <input
          type="text"
          aria-label="Patient's Child"
          placeholder="Answer:"
          class="form-control me-3 rounded-4"
          onChange={handleChildren}
        />
        <span class="d-flex align-items-center">Age?</span>
        <input
          type="number"
          aria-label="Patient's Child"
          placeholder="Answer:"
          class="form-control ms-1 rounded-4"
          onChange={handleChildrenAge}
        />
      </div>
    </>
  );
};

//! if patient chooses yes, in the question: Have you had previous psychotherapy?
const PsychoTherapy = () => {
  const [getWhyPsychoTherapy, setWhyPsychoTherapy] = useState(``);
  const handleWhyPsychoTherapyR = (e) => {
    setWhyPsychoTherapy(e.target.value);
  };
  const [getWhenPsychoTherapy, setWhenPsychoTherapy] = useState(``);
  const handleWhenPsychoTherapy = (e) => {
    setWhenPsychoTherapy(e.target.value);
  };
  return (
    <>
      <span className="me-2 d-flex align-items-center">If yes, why?</span>
      <textarea
        type="text"
        aria-label="PsychoTherapyResult"
        placeholder="Answer:"
        class="form-control me-3 rounded-4"
        onChange={handleWhyPsychoTherapyR}
      />
      <div class="input-group mt-3">
        <p className="me-2 d-flex align-items-center">If yes, when?</p>
        <textarea
          type="text"
          aria-label="PsychoTherapyResult"
          placeholder="Answer:"
          class="form-control me-3 rounded-4"
          onChange={handleWhenPsychoTherapy}
        />
      </div>
    </>
  );
};
