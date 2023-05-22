import { useState } from "react";
export const CardFive = ({ ButtonBack, ButtonNext }) => {
  //!For the question psychiatric
  const [showPsychiaTric, setPsychiaTric] = useState(false);
  const handlePschiatric = (event) => {
    setPsychiaTric(event.target.value === "true");
  };

  //!For the question Suicidal Thoughts
  const [showSuicidal, setSuicidal] = useState(false);
  const handleSuicidal = (event) => {
    setSuicidal(event.target.value === "true");
  };

  //!For the question Past Suicidal Thoughts
  const [showpastSuicidal, setpastSuicidal] = useState(false);
  const handlepastSuicidal = (event) => {
    setpastSuicidal(event.target.value === "true");
  };

  //!For the question previous homicidal thoughts
  const [showPreviousHomicidal, setPreviousHomicidal] = useState(false);
  const handlePreviousHomicidal = (event) => {
    setPreviousHomicidal(event.target.value === "true");
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
            {/* Psychiatric Medications */}
            <li class="list-group-item">
              <div className="form-check-inline ">
                <span>
                  Are you currently taking prescribed psychiatric medications
                  <br /> (antidepressants or others)?
                </span>
                <input
                  className="form-check-input ms-2"
                  type="radio"
                  name="PsychiatricMeds"
                  value="true"
                  onChange={handlePschiatric}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check-input ms-2"
                  type="radio"
                  name="PsychiatricMeds"
                  value="false"
                  onChange={handlePschiatric}
                />
                <label className="form-check-label ms-1">No</label>
              </div>
              <div className="form-check-inline ">
                {showPsychiaTric ? (
                  <PsychiatricMedsTrue />
                ) : (
                  <PsychiatricMedsFalse />
                )}
              </div>
            </li>

            {/* Future */}
            <li class="list-group-item">
              <div className="form-check-inline ">
                <span>Are you hopeful about your future?</span>
                <input
                  className="form-check-input ms-2"
                  type="radio"
                  name="Future"
                  value="Yes"
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check-input ms-2"
                  type="radio"
                  name="Future"
                  value="No"
                />
                <label className="form-check-label ms-1">No</label>
              </div>
            </li>

            {/* Suicidal Thoughts */}
            <li class="list-group-item">
              <div className="form-check-inline ">
                <span>Are you having current suicidal thoughts?</span>
                <input
                  className="form-check-input ms-2"
                  type="radio"
                  name="SuicidalThoughts"
                  value="true"
                  onChange={handleSuicidal}
                />
                <label className="form-check-label ms-1">Frequently</label>
                <input
                  className="form-check-input ms-2"
                  type="radio"
                  name="SuicidalThoughts"
                  value="true"
                  onChange={handleSuicidal}
                />
                <label className="form-check-label ms-1">Sometimes</label>
                <input
                  className="form-check-input ms-2"
                  type="radio"
                  name="SuicidalThoughts"
                  value="true"
                  onChange={handleSuicidal}
                />
                <label className="form-check-label ms-1">Rarely</label>
                <input
                  className="form-check-input ms-2"
                  type="radio"
                  name="SuicidalThoughts"
                  value="false"
                  onChange={handleSuicidal}
                />
                <label className="form-check-label ms-1">Never</label>
              </div>
              <div className="form-check-inline ">
                {showSuicidal && <SuicidalThoughts />}
              </div>
            </li>

            {/* Past Suicidal Thoughts */}
            <li class="list-group-item">
              <div className="form-check-inline ">
                <span>Have you had suicidal thoughts in the past?</span>
                <input
                  className="form-check-input ms-2"
                  type="radio"
                  name="SuicidalThoughts"
                  value="true"
                  onChange={handlepastSuicidal}
                />
                <label className="form-check-label ms-1">Frequently</label>
                <input
                  className="form-check-input ms-2"
                  type="radio"
                  name="SuicidalThoughts"
                  value="true"
                  onChange={handlepastSuicidal}
                />
                <label className="form-check-label ms-1">Sometimes</label>
                <input
                  className="form-check-input ms-2"
                  type="radio"
                  name="SuicidalThoughts"
                  value="true"
                  onChange={handlepastSuicidal}
                />
                <label className="form-check-label ms-1">Rarely</label>
                <input
                  className="form-check-input ms-2"
                  type="radio"
                  name="SuicidalThoughts"
                  value="false"
                  onChange={handlepastSuicidal}
                />
                <label className="form-check-label ms-1">Never</label>
              </div>
              <div className="form-check-inline ">
                {showpastSuicidal ? (
                  <SuicidalThoughtsPast />
                ) : (
                  <SuicidalThoughtsPastNever />
                )}
              </div>
            </li>

            {/* Current Homicidal Thoughts */}
            <li class="list-group-item">
              <div className="form-check-inline ">
                <span>
                  Are you having current homicidal thoughts (i.e., thoughts of
                  hurting someone else)?
                </span>
                <input
                  className="form-check-input ms-2"
                  type="radio"
                  name="Future"
                  value="Yes"
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check-input ms-2"
                  type="radio"
                  name="Future"
                  value="No"
                />
                <label className="form-check-label ms-1">No</label>
              </div>
            </li>

            {/* Previous had Homicdial Thoughs */}
            <li class="list-group-item">
              <div className="form-check-inline ">
                <span>Have you previously had homicidal thoughts?</span>
                <input
                  className="form-check-input ms-2"
                  type="radio"
                  name="HadPreviousHomicide"
                  value="true"
                  onChange={handlePreviousHomicidal}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check-input ms-2"
                  type="radio"
                  name="HadPreviousHomicide"
                  value="false"
                  onChange={handlePreviousHomicidal}
                />
                <label className="form-check-label ms-1">No</label>
              </div>
              <br />
              <div className="form-check-inline ">
                {showPreviousHomicidal && <PreviouslyHomicideThoughts />}
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

//! if patient chooses Yes, in the question: Are you currently taking prescribed psychiatric medications
const PsychiatricMedsTrue = () => {
  const [getNamesandDosesTrue, setNamesAndDosesTrue] = useState(``);
  const handleNamesAndDosesTrue = (e) => {
    setNamesAndDosesTrue(e.target.value);
  };
  return (
    <>
      <div class="input-group mt-3 ms-3">
        <p className="me-2 mt-2 d-flex align-items-center">
          If Yes, please list names and doses:
        </p>
        <textarea
          type="text"
          aria-label="PsychiatricMedication"
          placeholder="Answer:"
          class="form-control rounded-4 me-2"
          onChange={handleNamesAndDosesTrue}
        />
      </div>
      <div className="form-check-inline "></div>
    </>
  );
};

//! if patient chooses No, in the question: Are you currently taking prescribed psychiatric medications?
const PsychiatricMedsFalse = () => {
  const [showPsychiatricFalse, setPsychiatricFalse] = useState("false");
  const handlePsychiatricFalse = (event) => {
    setPsychiatricFalse(event.target.value === "true");
  };

  return (
    <>
      <div className="form-check-inline ms-3">
        <span className="">
          If No, have you been previously prescribed psychiatric medication?
        </span>
        <input
          className="form-check-input ms-2"
          type="radio"
          name="PsychiatricMedsFalse"
          value="true"
          onChange={handlePsychiatricFalse}
        />
        <label className="form-check-label ms-1">Yes</label>
        <input
          className="form-check-input ms-2"
          type="radio"
          name="PsychiatricMedsFalse"
          value="false"
          onChange={handlePsychiatricFalse}
        />
        <label className="form-check-label ms-1">No</label>
      </div>
      <div className="form-check-inline ">
        {showPsychiatricFalse && <PrescribedMedication />}
      </div>
    </>
  );
};

//! if patient chooses Yes, in the question: have you been previously prescribed psychiatric medication?
const PrescribedMedication = () => {
  const [getNamesAndDosesFalse, setNamesAndDosesFalse] = useState(``);
  const handleNamesAndDosesFalse = (e) => {
    setNamesAndDosesFalse(e.target.value);
  };
  return (
    <>
      <div class="input-group mt-3 ms-3">
        <p className="me-2 mt-2 d-flex align-items-center">
          If Yes, please list names and doses:
        </p>
        <textarea
          type="text"
          aria-label="PrescribedMedication"
          placeholder="Answer:"
          class="form-control rounded-4"
          onChange={handleNamesAndDosesFalse}
        />
      </div>
      <div className="form-check-inline "></div>
    </>
  );
};

//!If patient chooses Frequently, Sometimes, and Rarely in question : Are you having current suicidal thoughts?
const SuicidalThoughts = () => {
  return (
    <div className="form-check-inline ms-3">
      <span className="">
        If yes, have you recently done anything to hurt yourself?
      </span>
      <input
        className="form-check-input ms-2"
        type="radio"
        name="SuicidalThoughts"
        value="Yes"
      />
      <label className="form-check-label ms-1">Yes</label>
      <input
        className="form-check-input ms-2"
        type="radio"
        name="SuicidalThoughts"
        value="No"
      />
      <label className="form-check-label ms-1">No</label>
    </div>
  );
};

//!If patient chooses Frequently, Sometimes, and Rarely in question : Have you had suicidal thoughts in the past?
const SuicidalThoughtsPast = () => {
  return (
    <div className="form-check-inline ms-3">
      <span className="">Did you ever act on them?</span>
      <input
        className="form-check-input ms-2"
        type="radio"
        name="SuicidalThoughtsPast"
        value="Yes"
      />
      <label className="form-check-label ms-1">Yes</label>
      <input
        className="form-check-input ms-2"
        type="radio"
        name="SuicidalThoughtsPast"
        value="No"
      />
      <label className="form-check-label ms-1">No</label>
    </div>
  );
};

//!If patient chooses Never in question : Have you had suicidal thoughts in the past?
const SuicidalThoughtsPastNever = () => {
  const [getThoughts, setThoughts] = useState(``);
  const handleThoughts = (e) => {
    setThoughts(e.target.value);
  };
  return (
    <div className="form-check-inline ms-3 mt-2">
      <span className="">
        If you checked any box other than “never”, when did you have these
        thoughts?
      </span>
      <textarea
        className="form-control rounded-4"
        name="SuicidalThoughtsPastNever"
        placeholder="Answer:"
        onChange={handleThoughts}
      />
    </div>
  );
};

const PreviouslyHomicideThoughts = () => {
  const [getThoughts, setThoughts] = useState(``);
  const handleThoughts = (e) => {
    setThoughts(e.target.value);
  };
  return (
    <div className="form-check-inline ms-3 mt-2">
      <div>
        <span className="">If yes, when?</span>
        <textarea
          className="form-control rounded-4"
          name="PreviouslyHomicideThoughts"
          placeholder="Answer:"
          onChange={handleThoughts}
          style={{ width: 20 + "rem" }}
        />
      </div>
    </div>
  );
};
