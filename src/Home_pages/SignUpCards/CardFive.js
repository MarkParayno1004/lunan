import { useState } from "react";

export const CardFive = ({ ButtonBack, ButtonNext }) => {
  //! Psychiatric Radio Radio Buttons
  const [showPsychiatric, setShowPsychiatric] = useState("");

  //! Suicidal Radio Buttons
  const [showSuicidal, setShowSuicidal] = useState(false);

  //! Past Suicidal Thoughts Radio Button
  const [showPastSuicidal, setShowPastSuicidal] = useState();

  //! Previous Homicidal Radio Buttons
  const [showPreviousHomicidal, setShowPreviousHomicidal] = useState(false);

  //! Current Homicidal Thoughts
  const [getHomicidalThoughts, setHomicidalThoughts] = useState("");
  return (
    <div>
      <div className="container-fluid d-flex justify-content-center mt-3">
        <div class="card" style={{ width: "50rem" }}>
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
                  className="form-input ms-2"
                  type="radio"
                  name="PsychiatricMeds"
                  value="true"
                  checked={showPsychiatric === "true"}
                  onChange={(event) => {
                    setShowPsychiatric(event.target.value);
                  }}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="PsychiatricMeds"
                  value="false"
                  onChange={(event) => {
                    setShowPsychiatric(event.target.value);
                  }}
                />
                <label className="form-check-label ms-1">No</label>
              </div>
              <div className="form-check-inline ">
                {(showPsychiatric === "true" && <PsychiatricMedsTrue />) ||
                  (showPsychiatric === "false" && <PsychiatricMedsFalse />)}
              </div>
            </li>

            {/* Future */}
            <li class="list-group-item">
              <div className="form-check-inline ">
                <span>Are you hopeful about your future?</span>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="Future"
                  value="Yes"
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-input ms-2"
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
                  className="form-input ms-2"
                  type="radio"
                  name="SuicidalThoughts"
                  value="true"
                  onChange={(e) => {
                    setShowSuicidal(e.target.value === "true");
                  }}
                />
                <label className="form-check-label ms-1">Frequently</label>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="SuicidalThoughts"
                  value="true"
                  onChange={(e) => {
                    setShowSuicidal(e.target.value === "true");
                  }}
                />
                <label className="form-check-label ms-1">Sometimes</label>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="SuicidalThoughts"
                  value="true"
                  onChange={(e) => {
                    setShowSuicidal(e.target.value === "true");
                  }}
                />
                <label className="form-check-label ms-1">Rarely</label>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="SuicidalThoughts"
                  value="false"
                  onChange={(e) => {
                    setShowSuicidal(e.target.value === "true");
                  }}
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
                  className="form-input ms-2"
                  type="radio"
                  name="ThoughtsPast"
                  value="Frequently"
                  checked={showPastSuicidal === "Frequently"}
                  onChange={(e) => {
                    setShowPastSuicidal(e.target.value);
                  }}
                />
                <label className="form-check-label ms-1">Frequently</label>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="ThoughtsPast"
                  value="Sometimes"
                  checked={showPastSuicidal === "Sometimes"}
                  onChange={(e) => {
                    setShowPastSuicidal(e.target.value);
                  }}
                />
                <label className="form-check-label ms-1">Sometimes</label>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="ThoughtsPast"
                  value="Rarely"
                  checked={showPastSuicidal === "Rarely"}
                  onChange={(e) => {
                    setShowPastSuicidal(e.target.value);
                  }}
                />
                <label className="form-check-label ms-1">Rarely</label>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="ThoughtsPast"
                  value="Never"
                  onChange={(e) => {
                    setShowPastSuicidal(e.target.value);
                  }}
                />
                <label className="form-check-label ms-1">Never</label>
              </div>
              <div className="form-check-inline ">
                {(showPastSuicidal === "Frequently" && (
                  <SuicidalThoughtsPast />
                )) ||
                  (showPastSuicidal === "Sometimes" && (
                    <SuicidalThoughtsPast />
                  )) ||
                  (showPastSuicidal === "Rarely" && <SuicidalThoughtsPast />) ||
                  (showPastSuicidal === "Never" && (
                    <SuicidalThoughtsPastNever />
                  ))}
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
                  className="form-input ms-2"
                  type="radio"
                  name="CurrentHomicidal"
                  value="Yes"
                  onChange={(e) => {
                    setHomicidalThoughts(e.target.value);
                  }}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="CurrentHomicidal"
                  value="No"
                  onChange={(e) => {
                    setHomicidalThoughts(e.target.value);
                  }}
                />
                <label className="form-check-label ms-1">No</label>
              </div>
            </li>

            {/* Previous had Homicidal Thoughts */}
            <li class="list-group-item">
              <div className="form-check-inline ">
                <span>Have you previously had homicidal thoughts?</span>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="HadPreviousHomicide"
                  value="true"
                  onChange={(e) => {
                    setShowPreviousHomicidal(e.target.value === "true");
                  }}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="HadPreviousHomicide"
                  value="false"
                  onChange={(e) => {
                    setShowPreviousHomicidal(e.target.value === "true");
                  }}
                />
                <label className="form-check-label ms-1">No</label>
              </div>
              <br />
              <div class="input-group">
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
  const [getNamesandDosesTrue, setNamesAndDosesTrue] = useState(false);

  return (
    <>
      <div class="input-group mt-3 ms-3">
        <p className="me-2 mt-2 d-flex align-items-center">
          If Yes, please list names and doses:
        </p>
        <div class="form-floating">
          <textarea
            class="form-control rounded-4"
            placeholder="Answer"
            id="floatingTextarea2"
            style={{ height: 100 + "px", width: 30 + "rem" }}
            onChange={(e) => {
              setNamesAndDosesTrue(e.target.value);
            }}
          ></textarea>
          <label for="floatingTextarea2">Answer:</label>
        </div>
      </div>
      <div className="form-check-inline "></div>
    </>
  );
};

//! if patient chooses No, in the question: Are you currently taking prescribed psychiatric medications?
const PsychiatricMedsFalse = () => {
  const [showPsychiatricFalse, setPsychiatricFalse] = useState("");

  return (
    <>
      <div className="form-check-inline ms-3">
        <span className="">
          Have you been previously prescribed psychiatric medication?
        </span>
        <input
          className="form-input ms-2"
          type="radio"
          name="PsychiatricMedsFalse"
          value="true"
          checked={showPsychiatricFalse === "true"}
          onChange={(e) => {
            setPsychiatricFalse(e.target.value);
          }}
        />
        <label className="form-check-label ms-1">Yes</label>
        <input
          className="form-input ms-2"
          type="radio"
          name="PsychiatricMedsFalse"
          value="false"
          onChange={(e) => {
            setPsychiatricFalse(e.target.value);
          }}
        />
        <label className="form-check-label ms-1">No</label>
      </div>

      {showPsychiatricFalse === "true" && <PrescribedMedication />}
    </>
  );
};

//! if patient chooses Yes, in the question: have you been previously prescribed psychiatric medication?
const PrescribedMedication = () => {
  const [getNamesAndDosesFalse, setNamesAndDosesFalse] = useState(true);

  return (
    <>
      <div class="input-group mt-3 ms-3">
        <p className="me-2 mt-2 d-flex align-items-center">
          If Yes, please current medication:
        </p>
        <div class="form-floating">
          <textarea
            class="form-control rounded-4"
            placeholder="Answer"
            id="floatingTextarea2"
            style={{ height: 100 + "px", width: 30 + "rem" }}
            onChange={(e) => {
              setNamesAndDosesFalse(e.target.value === "true");
            }}
          ></textarea>
          <label for="floatingTextarea2">Answer:</label>
        </div>
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
        className="form-input ms-2"
        type="radio"
        name="SuicidalThoughtsYes"
        value="Yes"
      />
      <label className="form-check-label ms-1">Yes</label>
      <input
        className="form-input ms-2"
        type="radio"
        name="SuicidalThoughtsYes"
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
        className="form-input ms-2"
        type="radio"
        name="SuicidalThoughtsPast"
        value="Yes"
      />
      <label className="form-check-label ms-1">Yes</label>
      <input
        className="form-input ms-2"
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
        onChange={(e) => {
          setThoughts(e.target.value);
        }}
      />
    </div>
  );
};

//!If patient chooses yes, in question : Have you previously had homicidal thoughts?
const PreviouslyHomicideThoughts = () => {
  const [getThoughts, setThoughts] = useState(``);
  return (
    <div class="input-group">
      <div>
        <span className="">If yes, when?</span>
        <div class="form-floating">
          <textarea
            class="form-control rounded-4"
            placeholder="Answer"
            id="floatingTextarea2"
            style={{ height: 100 + "px", width: 40 + "rem" }}
            onChange={(e) => {
              setThoughts(e.target.value);
            }}
          ></textarea>
          <label for="floatingTextarea2">Answer:</label>
        </div>
      </div>
    </div>
  );
};
