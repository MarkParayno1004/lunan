import { useState, useEffect } from "react";

export const CardSixPoint2 = ({ ButtonBack, ButtonNext, formData }) => {
  const [localFormData, setLocalFormData] = useState({
    SleepProbSel: "",
    SleepHabitProb: "",
    ExerciseSel: "",
    ExerciseTimes: "",
    ExerciseDur: "",
    ExerciseRou: "",
    AppetiteSel: "",
    Appetite: "",
    WeightChange: "",
    AlcoholIntSel: "",
    AlcoholInt: "",
    DrugUseSel: "",
  });

  useEffect(() => {
    setLocalFormData(
      formData ?? {
        SleepProbSel: "",
        SleepHabitProb: "",
        ExerciseSel: "",
        ExerciseTimes: "",
        ExerciseDur: "",
        ExerciseRou: "",
        AppetiteSel: "",
        Appetite: "",
        WeightChange: "",
        AlcoholIntSel: "",
        AlcoholInt: "",
        DrugUseSel: "",
        DrugUse: "",
      }
    );
  }, [formData]);

  //!Sleep Habit with Conditional Statement
  const [showSleepHabits, setSleepHabits] = useState("");

  //!Handle Exercise Regularly with Conditional Statement
  const [showER, setER] = useState("");

  //!Eating Habits with Conditional Statement
  const [showEatingHabits, setEatingHabits] = useState("");

  //!Regular use of alcohol with Conditional Statement
  const [showUseAlcohol, setUseAlcohol] = useState("");

  //!Engage in recreational drug use
  const [showDrugUse, setDrugUse] = useState("");

  const handleNext = (event) => {
    event.preventDefault();
    console.log(localFormData); // Log form data
    ButtonNext(localFormData); // Call the ButtonNext function with form data
  };

  return (
    <div>
      <form onSubmit={handleNext}>
        <div className="container-fluid d-flex justify-content-center">
          <div className="card" style={{ width: 60 + "rem" }}>
            <div className="card-header">Health Information</div>
            <ul className="list-group list-group-flush">
              {/* Sleeping Habits */}
              <li className="list-group-item">
                <div className="input-group">
                  <span>
                    Are you having any problems with your sleep habits?
                  </span>
                  <input
                    className="form-input ms-2"
                    type="radio"
                    name="SleepProbSel"
                    value="Yes"
                    checked={localFormData.SleepProbSel === "Yes"}
                    onChange={(e) => {
                      setSleepHabits(e.target.value);
                      const { name, value } = e.target;
                      setLocalFormData((prevData) => ({
                        ...prevData,
                        [name]: value,
                      }));
                    }}
                    required
                  />
                  <label className="form-check-label ms-1">Yes</label>

                  <input
                    className="form-input ms-2"
                    type="radio"
                    name="SleepProbSel"
                    value="No"
                    checked={localFormData.SleepProbSel === "No"}
                    onChange={(e) => {
                      setSleepHabits(e.target.value);
                      const { name, value } = e.target;
                      setLocalFormData((prevData) => ({
                        ...prevData,
                        [name]: value,
                      }));
                    }}
                    required
                  />
                  <label className="form-check-label ms-1">No</label>
                </div>
                {showSleepHabits === "Yes" && (
                  <SleepHabits
                    setLocalFormData={setLocalFormData}
                    localFormData={localFormData}
                  />
                )}
              </li>

              {/* Exercise Regularly */}
              <li className="list-group-item">
                <div className="input-group">
                  <span>Do you exercise regularly?</span>
                  <input
                    className="form-input ms-2 rounded-5"
                    type="radio"
                    name="ExerciseSel"
                    value="Yes"
                    checked={localFormData.ExerciseSel === "Yes"}
                    onChange={(e) => {
                      setER(e.target.value);
                      const { name, value } = e.target;
                      setLocalFormData((prevData) => ({
                        ...prevData,
                        [name]: value,
                      }));
                    }}
                    required
                  />
                  <label className="form-check-label ms-1">Yes</label>

                  <input
                    className="form-input ms-2 rounded-5"
                    type="radio"
                    name="ExerciseSel"
                    value="No"
                    checked={localFormData.ExerciseSel === "No"}
                    onChange={(e) => {
                      setER(e.target.value === "No");
                      const { name, value } = e.target;
                      setLocalFormData((prevData) => ({
                        ...prevData,
                        [name]: value,
                      }));
                    }}
                    required
                  />
                  <label className="form-check-label ms-1">No</label>
                </div>
                {showER === "Yes" && (
                  <ERCOMPONENT
                    setLocalFormData={setLocalFormData}
                    localFormData={localFormData}
                  />
                )}
              </li>

              {/* Eating Habits */}
              <li className="list-group-item">
                <div className="input-group">
                  <span>
                    Are you having any difficulty with appetite or eating
                    habits?
                  </span>
                  <input
                    className="form-input ms-2 "
                    type="radio"
                    name="AppetiteSel"
                    value="Yes"
                    checked={localFormData.AppetiteSel === "Yes"}
                    onChange={(e) => {
                      setEatingHabits(e.target.value);
                      const { name, value } = e.target;
                      setLocalFormData((prevData) => ({
                        ...prevData,
                        [name]: value,
                      }));
                    }}
                    required
                  />
                  <label className="form-check-label ms-1">Yes</label>

                  <input
                    className="form-input ms-2 "
                    type="radio"
                    name="AppetiteSel"
                    value="No"
                    checked={localFormData.AppetiteSel === "No"}
                    onChange={(e) => {
                      setEatingHabits(e.target.value);
                      const { name, value } = e.target;
                      setLocalFormData((prevData) => ({
                        ...prevData,
                        [name]: value,
                      }));
                    }}
                    required
                  />
                  <label className="form-check-label ms-1">No</label>
                </div>
                {showEatingHabits === "Yes" && (
                  <EatingHabits
                    setLocalFormData={setLocalFormData}
                    localFormData={localFormData}
                  />
                )}
              </li>

              {/* Weight Change */}
              <li className="list-group-item">
                <div className="input-group">
                  <span>
                    Have you experienced significant weight change in the last 2
                    months?
                  </span>
                  <input
                    className="form-input ms-2"
                    type="radio"
                    name="WeightChange"
                    value="Yes"
                    checked={localFormData.WeightChange === "Yes"}
                    onChange={(e) => {
                      const { name, value } = e.target;
                      setLocalFormData((prevData) => ({
                        ...prevData,
                        [name]: value,
                      }));
                    }}
                    required
                  />
                  <label className="form-check-label ms-1">Yes</label>
                  <input
                    className="form-input ms-2"
                    type="radio"
                    name="WeightChange"
                    value="No"
                    checked={localFormData.WeightChange === "No"}
                    onChange={(e) => {
                      const { name, value } = e.target;
                      setLocalFormData((prevData) => ({
                        ...prevData,
                        [name]: value,
                      }));
                    }}
                    required
                  />

                  <label className="form-check-label ms-1">No</label>
                </div>
              </li>

              {/* Use of Alcohol */}
              <li className="list-group-item">
                <div className="input-group">
                  <span>Do you regularly use alcohol?</span>
                  <input
                    className="form-input ms-2 rounded-5"
                    type="radio"
                    name="AlcoholIntSel"
                    value="Yes"
                    checked={localFormData.AlcoholIntSel === "Yes"}
                    onChange={(e) => {
                      setUseAlcohol(e.target.value);
                      const { name, value } = e.target;
                      setLocalFormData((prevData) => ({
                        ...prevData,
                        [name]: value,
                      }));
                    }}
                    required
                  />
                  <label className="form-check-label ms-1">Yes</label>

                  <input
                    className="form-input ms-2 rounded-5"
                    type="radio"
                    name="AlcoholIntSel"
                    value="No"
                    checked={localFormData.AlcoholIntSel === "No"}
                    onChange={(e) => {
                      setUseAlcohol(e.target.value);
                      const { name, value } = e.target;
                      setLocalFormData((prevData) => ({
                        ...prevData,
                        [name]: value,
                      }));
                    }}
                    required
                  />
                  <label className="form-check-label ms-1">No</label>
                </div>
                {showUseAlcohol === "Yes" && (
                  <UseAlochol
                    setLocalFormData={setLocalFormData}
                    localFormData={localFormData}
                  />
                )}
              </li>

              {/* Engage of Drugs */}
              <li className="list-group-item">
                <div className="input-group">
                  <span>How often do you engage in recreational drug use?</span>
                  <input
                    className="form-input ms-2 rounded-5"
                    type="radio"
                    name="DrugUseSel"
                    value="Daily"
                    checked={localFormData.DrugUseSel === "Daily"}
                    onChange={(e) => {
                      setDrugUse(e.target.value);
                      const { name, value } = e.target;
                      setLocalFormData((prevData) => ({
                        ...prevData,
                        [name]: value,
                      }));
                    }}
                    required
                  />
                  <label className="form-check-label ms-1">Daily</label>

                  <input
                    className="form-input ms-2 rounded-5"
                    type="radio"
                    name="DrugUseSel"
                    value="Weekly"
                    checked={localFormData.DrugUseSel === "Weekly"}
                    onChange={(e) => {
                      setDrugUse(e.target.value);
                      const { name, value } = e.target;
                      setLocalFormData((prevData) => ({
                        ...prevData,
                        [name]: value,
                      }));
                    }}
                    required
                  />
                  <label className="form-check-label ms-1">Weekly</label>

                  <input
                    className="form-input ms-2 rounded-5"
                    type="radio"
                    name="DrugUseSel"
                    value="Monthly"
                    checked={localFormData.DrugUseSel === "Monthly"}
                    onChange={(e) => {
                      setDrugUse(e.target.value);
                      const { name, value } = e.target;
                      setLocalFormData((prevData) => ({
                        ...prevData,
                        [name]: value,
                      }));
                    }}
                    required
                  />
                  <label className="form-check-label ms-1">Monthly</label>

                  <input
                    className="form-input ms-2 rounded-5"
                    type="radio"
                    name="DrugUseSel"
                    value="Rarely"
                    checked={localFormData.DrugUseSel === "Rarely"}
                    onChange={(e) => {
                      setDrugUse(e.target.value);
                      const { name, value } = e.target;
                      setLocalFormData((prevData) => ({
                        ...prevData,
                        [name]: value,
                      }));
                    }}
                    required
                  />

                  <label className="form-check-label ms-1">Rarely</label>
                  <input
                    className="form-input ms-2 rounded-5"
                    type="radio"
                    name="DrugUseSel"
                    value="Never"
                    checked={localFormData.DrugUseSel === "Never"}
                    onChange={(e) => {
                      setDrugUse(e.target.value);
                      const { name, value } = e.target;
                      setLocalFormData((prevData) => ({
                        ...prevData,
                        [name]: value,
                      }));
                    }}
                    required
                  />
                  <label className="form-check-label ms-1">Never</label>
                </div>
                {(showDrugUse === "Daily" && (
                  <RecreationalDrug
                    setLocalFormData={setLocalFormData}
                    localFormData={localFormData}
                  />
                )) ||
                  (showDrugUse === "Weekly" && (
                    <RecreationalDrug
                      setLocalFormData={setLocalFormData}
                      localFormData={localFormData}
                    />
                  )) ||
                  (showDrugUse === "Monthly" && (
                    <RecreationalDrug
                      setLocalFormData={setLocalFormData}
                      localFormData={localFormData}
                    />
                  )) ||
                  (showDrugUse === "Rarely" && (
                    <RecreationalDrug
                      setLocalFormData={setLocalFormData}
                      localFormData={localFormData}
                    />
                  ))}
              </li>
            </ul>
          </div>
        </div>
        <div
          className="d-flex justify-content-end"
          style={{
            paddingRight: 25 + "px",
            paddingTop: 10 + "px",
            paddingBottom: 5 + "px",
          }}
        >
          <button
            className="btn nav-link fs-5 rounded-4 me-3"
            id="buttonCard"
            onClick={ButtonBack}
          >
            Back
          </button>
          <button className="btn nav-link fs-5  rounded-4" id="buttonCard">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

//! if patients answer is yes, in question: Are you having any problems with your sleep habits?
const SleepHabits = ({ setLocalFormData, localFormData }) => {
  //!Get value of fradio buttons in Sleep Habits
  const [getSleepHabits, setSleepHabits] = useState("");
  return (
    <div className="form-check-inline ">
      <span>If yes, check where applicable:</span>
      <div className="mt-1">
        <input
          className="form-input ms-2 rounded-5"
          type="radio"
          name="SleepHabitProb"
          value="Sleeping too little"
          checked={localFormData.SleepHabitProb === "Sleeping too little"}
          onChange={(e) => {
            setSleepHabits(e.target.value);
            const { name, value } = e.target;
            setLocalFormData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
          }}
          required
        />
        <label className="form-check-label ms-1">Sleeping too little</label>

        <input
          className="form-input ms-2 rounded-5"
          type="radio"
          name="SleepHabitProb"
          value="Sleeping too much"
          checked={localFormData.SleepHabitProb === "Sleeping too much"}
          onChange={(e) => {
            setSleepHabits(e.target.value);
            const { name, value } = e.target;
            setLocalFormData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
          }}
          required
        />
        <label className="form-check-label ms-1">Sleeping too much</label>

        <input
          className="form-input ms-2 rounded-5"
          type="radio"
          name="SleepHabitProb"
          value="Can't fall asleep"
          checked={localFormData.SleepHabitProb === "Can't fall asleep"}
          onChange={(e) => {
            setSleepHabits(e.target.value);
            const { name, value } = e.target;
            setLocalFormData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
          }}
          required
        />
        <label className="form-check-label ms-1">Can't fall asleep</label>
        <input
          className="form-input ms-2"
          type="radio"
          name="SleepHabitProb"
          value="Can't stay asleep"
          checked={localFormData.SleepHabitProb === "Can't stay asleep"}
          onChange={(e) => {
            setSleepHabits(e.target.value);
            const { name, value } = e.target;
            setLocalFormData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
          }}
          required
        />
        <label className="form-check-label ms-1">Can't stay asleep</label>
      </div>
    </div>
  );
};

//! if patient answer is yes, in question: Do you exercise regularly?
const ERCOMPONENT = ({ setLocalFormData, localFormData }) => {
  //! If yes, how many times per week do you exercise?
  const [getPerWeek, setPerWeek] = useState();

  //! If yes, for how long?
  const [getHowLong, setHowLong] = useState();

  //! If yes, what do you do?
  const [getWhatYouDo, setWhatYouDo] = useState(``);
  return (
    <>
      <div className="input-group mt-1">
        <span className="d-flex align-items-center">
          If yes, how many times per week do you exercise?
        </span>
        <input
          type="number"
          name="ExerciseTimes"
          className="form-control rounded-4 ms-1"
          value={localFormData.ExerciseTimes}
          min="0"
          oninput="validity.valid||(value='');"
          onChange={(e) => {
            setPerWeek(e.target.value);
            const { name, value } = e.target;
            setLocalFormData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
          }}
          required
        />

        <span className="d-flex align-items-center ms-1">For how long?</span>
        <input
          type="number"
          name="ExerciseDur"
          className="form-control rounded-4 ms-1"
          value={localFormData.ExerciseDur}
          min="0"
          oninput="validity.valid||(value='');"
          onChange={(e) => {
            setHowLong(e.target.value);
            const { name, value } = e.target;
            setLocalFormData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
          }}
          required
        />
      </div>

      <div className="input-group mt-2">
        <span className="d-flex align-items-center">
          If yes, what do you do?
        </span>
        <input
          type="text"
          name="ExerciseRou"
          className="form-control rounded-4 ms-1"
          value={localFormData.ExerciseRou}
          onChange={(e) => {
            setWhatYouDo(e.target.value);
            const { name, value } = e.target;
            setLocalFormData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
          }}
          required
        />
      </div>
    </>
  );
};

//! if patient answer is yes, in question: Are you having any difficulty with appetite or eating habits?
const EatingHabits = ({ setLocalFormData, localFormData }) => {
  //! Get value of Eating Habits
  const [getEatingHabits, setEatingHabits] = useState("");
  return (
    <div className="form-check-inline mt-2">
      <span>If yes, check where applicable:</span>
      <input
        className="form-input ms-2 rounded-5"
        type="radio"
        name="Appetite"
        value="Eating less"
        checked={localFormData.Appetite === "Eating less"}
        onChange={(e) => {
          setEatingHabits(e.target.value);
          const { name, value } = e.target;
          setLocalFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }}
        required
      />
      <label className="form-check-label ms-1">Eating less</label>

      <input
        className="form-input ms-2 rounded-5"
        type="radio"
        name="Appetite"
        value="Eating more"
        checked={localFormData.Appetite === "Eating more"}
        onChange={(e) => {
          setEatingHabits(e.target.value);
          const { name, value } = e.target;
          setLocalFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }}
        required
      />
      <label className="form-check-label ms-1">Eating more</label>

      <input
        className="form-input ms-2 rounded-5"
        type="radio"
        name="Appetite"
        value="Bingeing"
        checked={localFormData.Appetite === "Bingeing"}
        onChange={(e) => {
          setEatingHabits(e.target.value);
          const { name, value } = e.target;
          setLocalFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }}
        required
      />
      <label className="form-check-label ms-1">Bingeing</label>

      <input
        className="form-input ms-2 rounded-5"
        type="radio"
        name="Appetite"
        value="Purging"
        checked={localFormData.Appetite === "Purging"}
        onChange={(e) => {
          setEatingHabits(e.target.value);
          const { name, value } = e.target;
          setLocalFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }}
        required
      />
      <label className="form-check-label ms-1">Purging</label>
    </div>
  );
};

//! if patient answer is yes, in question: Do you regularly use alcohol?
const UseAlochol = ({ setLocalFormData, localFormData }) => {
  //! Get value of alcohol frequency
  const [getFrequency, setFrequency] = useState("");

  return (
    <>
      <p className="mt-2">If yes, what is your frequency?</p>
      <input
        className="form-input ms-2 rounded-5"
        type="radio"
        name="AlcoholInt"
        value="Once a month"
        checked={localFormData.AlcoholInt === "Once a month"}
        onChange={(e) => {
          setFrequency(e.target.value);
          const { name, value } = e.target;
          setLocalFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }}
        required
      />
      <label className="form-check-label ms-1">Once a month</label>

      <input
        className="form-input ms-2 rounded-5"
        type="radio"
        name="AlcoholInt"
        value="Once a week"
        checked={localFormData.AlcoholInt === "Once a week"}
        onChange={(e) => {
          setFrequency(e.target.value);
          const { name, value } = e.target;
          setLocalFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }}
        required
      />
      <label className="form-check-label ms-1">Once a week</label>

      <input
        className="form-input ms-2 rounded-5"
        type="radio"
        name="AlcoholInt"
        value="Daily"
        checked={localFormData.AlcoholInt === "Daily"}
        onChange={(e) => {
          setFrequency(e.target.value);
          const { name, value } = e.target;
          setLocalFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }}
        required
      />
      <label className="form-check-label ms-1">Daily</label>

      <input
        className="form-input ms-2 rounded-5"
        type="radio"
        name="AlcoholInt"
        value="3 or more times a week"
        checked={localFormData.AlcoholInt === "3 or more times a week"}
        onChange={(e) => {
          setFrequency(e.target.value);
          const { name, value } = e.target;
          setLocalFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }}
        required
      />
      <label className="form-check-label ms-1">3 or more times a week</label>
      <input
        className="form-input ms-2 rounded-5"
        type="radio"
        name="AlcoholInt"
        value="Intoxicated daily"
        checked={localFormData.AlcoholInt === "Intoxicated daily"}
        onChange={(e) => {
          setFrequency(e.target.value);
          const { name, value } = e.target;
          setLocalFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }}
        required
      />
      <label className="form-check-label ms-1">Intoxicated daily</label>
    </>
  );
};

//! if patient answer is yes, in question: How often do you engage in recreational drug use?
const RecreationalDrug = ({ setLocalFormData, localFormData }) => {
  //! Get value of drugs
  const [getDrugs, setDrugs] = useState("");
  return (
    <div className="form-check-inline mt-2">
      <span>
        If you checked any box other than “never,” which drugs do you use?
      </span>
      <div>
        <textarea
          type="text"
          className="form-control rounded-4 ms-1"
          name="DrugUse"
          value={localFormData.DrugUse}
          style={{ width: 45 + "rem" }}
          onChange={(e) => {
            setDrugs(e.target.value);
            const { name, value } = e.target;
            setLocalFormData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
          }}
          required
        />
      </div>
    </div>
  );
};
