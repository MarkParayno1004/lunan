import { useState, useEffect } from "react";

export const CardFive = ({ ButtonBack, ButtonNext, formData }) => {
  const [localFormData, setLocalFormData] = useState({
    PsychiatricMeds: "",
    CurrPsychMeds: "",
    PrevPsychMedSel: "",
    PrevPsychMeds: "",
    SuicidalThoughtsPast: "",
    SelfHarm: "",
    SuicidalThoughts: "",
    SuicidalThoughtsPastTime: "",
    CurrentHomicidal: "",
    HadPreviousHomicide: "",
    PastHomicidalTime: "",
  });

  useEffect(() => {
    setLocalFormData(
      formData ?? {
        PsychiatricMeds: "",
        CurrPsychMeds: "",
        PrevPsychMedSel: "",
        PrevPsychMeds: "",
        SuicidalThoughtsPast: "",
        SelfHarm: "",
        SuicidalThoughts: "",
        SuicidalThoughtsPastTime: "",
        CurrentHomicidal: "",
        HadPreviousHomicide: "",
        PastHomicidalTime: "",
      }
    );
  }, [formData]);

  //! Psychiatric Radio Radio Buttons
  const [showPsychiatric, setShowPsychiatric] = useState("");

  //! Suicidal Radio Buttons
  const [showSuicidal, setShowSuicidal] = useState();

  //! Past Suicidal Thoughts Radio Button
  const [showPastSuicidal, setShowPastSuicidal] = useState();

  //! Previous Homicidal Radio Buttons
  const [showPreviousHomicidal, setShowPreviousHomicidal] = useState(false);

  //! Current Homicidal Thoughts
  const [getHomicidalThoughts, setHomicidalThoughts] = useState("");

  const handleNext = () => {
    console.log(localFormData); // Log form data
    ButtonNext(localFormData); // Call the ButtonNext function with form data
  };

  return (
    <div>
      <div className="container-fluid d-flex justify-content-center mt-3">
        <div className="card" style={{ width: "50rem" }}>
          <div className="card-header">
            Please fill up this intake form: (This form will be your Sign Up
            form or Register Form)
          </div>
          <ul className="list-group list-group-flush">
            {/* Psychiatric Medications */}
            <li className="list-group-item">
              <div className="form-check-inline ">
                <span>
                  Are you currently taking prescribed psychiatric medications
                  <br /> (antidepressants or others)?
                </span>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="PsychiatricMeds"
                  value="Yes"
                  onChange={(event) => {
                    setShowPsychiatric(event.target.value);
                    const { name, value } = event.target;
                    setLocalFormData((prevData) => ({
                      ...prevData,
                      [name]: value,
                    }));
                  }}
                  checked={localFormData.PsychiatricMeds === "Yes"}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="PsychiatricMeds"
                  value="No"
                  checked={localFormData.PsychiatricMeds === "No"}
                  onChange={(event) => {
                    setShowPsychiatric(event.target.value);
                    const { name, value } = event.target;
                    setLocalFormData((prevData) => ({
                      ...prevData,
                      [name]: value,
                    }));
                  }}
                />
                <label className="form-check-label ms-1">No</label>
              </div>
              <div className="form-check-inline ">
                {(showPsychiatric === "Yes" && (
                  <PsychiatricMedsTrue
                    setLocalFormData={setLocalFormData}
                    localFormData={localFormData}
                  />
                )) ||
                  (showPsychiatric === "No" && (
                    <PrevPsychMedFalse
                      setLocalFormData={setLocalFormData}
                      localFormData={localFormData}
                    />
                  ))}
              </div>
            </li>

            {/* Future */}
            <li className="list-group-item">
              <div className="form-check-inline ">
                <span>Are you hopeful about your future?</span>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="Future"
                  value="Yes"
                  onChange={(event) => {
                    const { name, value } = event.target;
                    setLocalFormData((prevData) => ({
                      ...prevData,
                      [name]: value,
                    }));
                  }}
                  checked={localFormData.Future === "Yes"}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="Future"
                  value="No"
                  onChange={(event) => {
                    const { name, value } = event.target;
                    setLocalFormData((prevData) => ({
                      ...prevData,
                      [name]: value,
                    }));
                  }}
                  checked={localFormData.Future === "No"}
                />
                <label className="form-check-label ms-1">No</label>
              </div>
            </li>

            {/* Suicidal Thoughts */}
            <li className="list-group-item">
              <div className="form-check-inline ">
                <span>Are you having current suicidal thoughts?</span>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="SuicidalThoughts"
                  value="Frequently"
                  onChange={(event) => {
                    setShowSuicidal(event.target.value);
                    const { name, value } = event.target;
                    setLocalFormData((prevData) => ({
                      ...prevData,
                      [name]: value,
                    }));
                  }}
                  checked={localFormData.SuicidalThoughts === "Frequently"}
                />
                <label className="form-check-label ms-1">Frequently</label>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="SuicidalThoughts"
                  value="Sometimes"
                  onChange={(event) => {
                    setShowSuicidal(event.target.value);
                    const { name, value } = event.target;
                    setLocalFormData((prevData) => ({
                      ...prevData,
                      [name]: value,
                    }));
                  }}
                  checked={localFormData.SuicidalThoughts === "Sometimes"}
                />
                <label className="form-check-label ms-1">Sometimes</label>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="SuicidalThoughts"
                  value="Rarely"
                  onChange={(event) => {
                    setShowSuicidal(event.target.value);
                    const { name, value } = event.target;
                    setLocalFormData((prevData) => ({
                      ...prevData,
                      [name]: value,
                    }));
                  }}
                  checked={localFormData.SuicidalThoughts === "Rarely"}
                />
                <label className="form-check-label ms-1">Rarely</label>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="SuicidalThoughts"
                  value="Never"
                  onChange={(event) => {
                    setShowSuicidal(event.target.value);
                    const { name, value } = event.target;
                    setLocalFormData((prevData) => ({
                      ...prevData,
                      [name]: value,
                    }));
                  }}
                  checked={localFormData.SuicidalThoughts === "Never"}
                />
                <label className="form-check-label ms-1">Never</label>
              </div>
              <div className="form-check-inline ">
                {(showSuicidal === "Frequently" && (
                  <SuicidalThoughts
                    setLocalFormData={setLocalFormData}
                    localFormData={localFormData}
                  />
                )) ||
                  (showSuicidal === "Sometimes" && (
                    <SuicidalThoughts
                      setLocalFormData={setLocalFormData}
                      localFormData={localFormData}
                    />
                  )) ||
                  (showSuicidal === "Rarely" && (
                    <SuicidalThoughts
                      setLocalFormData={setLocalFormData}
                      localFormData={localFormData}
                    />
                  ))}
              </div>
            </li>

            {/* Past Suicidal Thoughts */}
            <li className="list-group-item">
              <div className="form-check-inline ">
                <span>Have you had suicidal thoughts in the past?</span>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="ThoughtsPast"
                  value="Frequently"
                  onChange={(e) => {
                    setShowPastSuicidal(e.target.value);
                    const { name, value } = e.target;
                    setLocalFormData((prevData) => ({
                      ...prevData,
                      [name]: value,
                    }));
                  }}
                  checked={localFormData.ThoughtsPast === "Frequently"}
                />
                <label className="form-check-label ms-1">Frequently</label>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="ThoughtsPast"
                  value="Sometimes"
                  onChange={(e) => {
                    setShowPastSuicidal(e.target.value);
                    const { name, value } = e.target;
                    setLocalFormData((prevData) => ({
                      ...prevData,
                      [name]: value,
                    }));
                  }}
                  checked={localFormData.ThoughtsPast === "Sometimes"}
                />
                <label className="form-check-label ms-1">Sometimes</label>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="ThoughtsPast"
                  value="Rarely"
                  onChange={(e) => {
                    setShowPastSuicidal(e.target.value);
                    const { name, value } = e.target;
                    setLocalFormData((prevData) => ({
                      ...prevData,
                      [name]: value,
                    }));
                  }}
                  checked={localFormData.ThoughtsPast === "Rarely"}
                />
                <label className="form-check-label ms-1">Rarely</label>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="ThoughtsPast"
                  value="Never"
                  onChange={(e) => {
                    setShowPastSuicidal(e.target.value);
                    const { name, value } = e.target;
                    setLocalFormData((prevData) => ({
                      ...prevData,
                      [name]: value,
                    }));
                  }}
                  checked={localFormData.ThoughtsPast === "Never"}
                />
                <label className="form-check-label ms-1">Never</label>
              </div>
              <div className="form-check-inline ">
                {(showPastSuicidal === "Frequently" && (
                  <SuicidalThoughtsPast
                    setLocalFormData={setLocalFormData}
                    localFormData={localFormData}
                  />
                )) ||
                  (showPastSuicidal === "Sometimes" && (
                    <SuicidalThoughtsPast
                      setLocalFormData={setLocalFormData}
                      localFormData={localFormData}
                    />
                  )) ||
                  (showPastSuicidal === "Rarely" && (
                    <SuicidalThoughtsPast
                      setLocalFormData={setLocalFormData}
                      localFormData={localFormData}
                    />
                  ))}
              </div>
            </li>

            {/* Current Homicidal Thoughts */}
            <li className="list-group-item">
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
                    const { name, value } = e.target;
                    setLocalFormData((prevData) => ({
                      ...prevData,
                      [name]: value,
                    }));
                  }}
                  checked={localFormData.CurrentHomicidal === "Yes"}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="CurrentHomicidal"
                  value="No"
                  onChange={(e) => {
                    setHomicidalThoughts(e.target.value);
                    const { name, value } = e.target;
                    setLocalFormData((prevData) => ({
                      ...prevData,
                      [name]: value,
                    }));
                  }}
                  checked={localFormData.CurrentHomicidal === "No"}
                />
                <label className="form-check-label ms-1">No</label>
              </div>
            </li>

            {/* Previous had Homicidal Thoughts */}
            <li className="list-group-item">
              <div className="form-check-inline ">
                <span>Have you previously had homicidal thoughts?</span>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="HadPreviousHomicide"
                  value="Yes"
                  onChange={(e) => {
                    setShowPreviousHomicidal(e.target.value === "Yes");
                    const { name, value } = e.target;
                    setLocalFormData((prevData) => ({
                      ...prevData,
                      [name]: value,
                    }));
                  }}
                  checked={localFormData.HadPreviousHomicide === "Yes"}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="HadPreviousHomicide"
                  value="No"
                  onChange={(e) => {
                    setShowPreviousHomicidal(e.target.value === "Yes");
                    const { name, value } = e.target;
                    setLocalFormData((prevData) => ({
                      ...prevData,
                      [name]: value,
                    }));
                  }}
                  checked={localFormData.HadPreviousHomicide === "No"}
                />
                <label className="form-check-label ms-1">No</label>
              </div>
              <br />
              <div className="input-group">
                {showPreviousHomicidal && (
                  <PreviouslyHomicideThoughts
                    setLocalFormData={setLocalFormData}
                    localFormData={localFormData}
                  />
                )}
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
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

//! if patient chooses Yes, in the question: Are you currently taking prescribed psychiatric medications
const PsychiatricMedsTrue = ({ setLocalFormData, localFormData }) => {
  const [getNamesandDosesTrue, setNamesAndDosesTrue] = useState(false);

  return (
    <>
      <div className="input-group mt-3 ms-3">
        <p className="me-2 mt-2 d-flex align-items-center">
          Please list names and doses:
        </p>
        <div className="form-floating">
          <textarea
            className="form-control rounded-4"
            placeholder="Answer"
            id="floatingTextarea2"
            name="CurrPsychMeds"
            style={{ height: 100 + "px", width: 30 + "rem" }}
            onChange={(e) => {
              setNamesAndDosesTrue(e.target.value);
              const { name, value } = e.target;
              setLocalFormData((prevData) => ({
                ...prevData,
                [name]: value,
              }));
            }}
            value={localFormData.CurrPsychMeds}
          ></textarea>
          <label for="floatingTextarea2">Answer:</label>
        </div>
      </div>
      <div className="form-check-inline "></div>
    </>
  );
};

//! if patient chooses No, in the question: Are you currently taking prescribed psychiatric medications?
const PrevPsychMedFalse = ({ setLocalFormData, localFormData }) => {
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
          name="PrevPsychMedSel"
          value="Yes"
          onChange={(e) => {
            setPsychiatricFalse(e.target.value);
            const { name, value } = e.target;
            setLocalFormData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
          }}
          checked={localFormData.PrevPsychMedSel === "Yes"}
        />
        <label className="form-check-label ms-1">Yes</label>
        <input
          className="form-input ms-2"
          type="radio"
          name="PrevPsychMedSel"
          value="No"
          onChange={(e) => {
            setPsychiatricFalse(e.target.value);
            const { name, value } = e.target;
            setLocalFormData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
          }}
          checked={localFormData.PrevPsychMedSel === "No"}
        />
        <label className="form-check-label ms-1">No</label>
      </div>

      {showPsychiatricFalse === "Yes" && (
        <PrescribedMedication
          setLocalFormData={setLocalFormData}
          localFormData={localFormData}
        />
      )}
    </>
  );
};

//! if patient chooses Yes, in the question: have you been previously prescribed psychiatric medication?
const PrescribedMedication = ({ setLocalFormData, localFormData }) => {
  const [getNamesAndDosesFalse, setNamesAndDosesFalse] = useState(true);

  return (
    <>
      <div className="input-group mt-3 ms-3">
        <p className="me-2 mt-2 d-flex align-items-center">
          Please list previously medication:
        </p>
        <div className="form-floating">
          <textarea
            className="form-control rounded-4"
            placeholder="Answer"
            name="PrevPsychMeds"
            id="floatingTextarea2"
            value={localFormData.PrevPsychMeds}
            style={{ height: 100 + "px", width: 28 + "rem" }}
            onChange={(e) => {
              setNamesAndDosesFalse(e.target.value === "true");
              const { name, value } = e.target;
              setLocalFormData((prevData) => ({
                ...prevData,
                [name]: value,
              }));
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
const SuicidalThoughts = ({ setLocalFormData, localFormData }) => {
  const [getThoughts, setThoughts] = useState(``);
  return (
    <div className="form-check-inline ms-3">
      <span className="">
        Have you recently done anything to hurt yourself?
      </span>
      <input
        className="form-input ms-2"
        type="radio"
        name="SelfHarm"
        value="Yes"
        onChange={(e) => {
          setThoughts(e.target.value);
          const { name, value } = e.target;
          setLocalFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }}
        checked={localFormData.SelfHarm === "Yes"}
      />
      <label className="form-check-label ms-1">Yes</label>
      <input
        className="form-input ms-2"
        type="radio"
        name="SelfHarm"
        value="No"
        onChange={(e) => {
          const { name, value } = e.target;
          setThoughts(e.target.value);
          setLocalFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }}
        checked={localFormData.SelfHarm === "No"}
      />
      <label className="form-check-label ms-1">No</label>
    </div>
  );
};

//!If patient chooses Frequently, Sometimes, and Rarely in question : Have you had suicidal thoughts in the past?
const SuicidalThoughtsPast = ({ setLocalFormData, localFormData }) => {
  const [getThoughts, setThoughts] = useState(``);
  return (
    <div className="form-check-inline ms-3">
      <span className="">Did you ever act on them?</span>
      <input
        className="form-input ms-2"
        type="radio"
        name="SuicidalThoughtsPast"
        value="Yes"
        onChange={(e) => {
          const { name, value } = e.target;
          setLocalFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }}
        checked={localFormData.SuicidalThoughtsPast === "Yes"}
      />
      <label className="form-check-label ms-1">Yes</label>
      <input
        className="form-input ms-2"
        type="radio"
        name="SuicidalThoughtsPast"
        value="No"
        onChange={(e) => {
          setThoughts(e.target.value);
          const { name, value } = e.target;
          setLocalFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }}
        checked={localFormData.SuicidalThoughtsPast === "No"}
      />
      <label className="form-check-label ms-1">No</label>
      <br></br>
      <span className="">
        If you checked any box other than “never”, when did you have these
        thoughts?
      </span>
      <textarea
        className="form-control rounded-4"
        name="SuicidalThoughtsPastTime"
        placeholder="Answer:"
        onChange={(e) => {
          setThoughts(e.target.value);
          const { name, value } = e.target;
          setLocalFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }}
        value={localFormData.SuicidalThoughtsPastTime}
      />
    </div>
  );
};

//!If patient chooses yes, in question : Have you previously had homicidal thoughts?
const PreviouslyHomicideThoughts = ({ setLocalFormData, localFormData }) => {
  const [getThoughts, setThoughts] = useState(``);
  return (
    <div className="input-group">
      <div>
        <span className="">When did you had these homicidal thoughts?</span>
        <div className="form-floating">
          <textarea
            className="form-control rounded-4"
            placeholder="Answer"
            id="floatingTextarea2"
            name="PastHomicidalTime"
            style={{ height: 100 + "px", width: 40 + "rem" }}
            onChange={(e) => {
              setThoughts(e.target.value);
              const { name, value } = e.target;
              setLocalFormData((prevData) => ({
                ...prevData,
                [name]: value,
              }));
            }}
            value={localFormData.PastHomicidalTime}
          ></textarea>
          <label for="floatingTextarea2">Answer:</label>
        </div>
      </div>
    </div>
  );
};
