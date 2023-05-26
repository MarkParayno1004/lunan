import { useState } from "react";

export const CardSixPoint2 = ({ ButtonBack, ButtonNext }) => {
  //!Sleep Habit with Conditional Statement
  const [showSleepHabits, setSleepHabits] = useState("false");

  //!Handle Exercise Regularly with Conditional Statement
  const [showER, setER] = useState("No");

  //!Eating Habits with Conditional Statement
  const [showEatingHabits, setEatingHabits] = useState("false");

  //!Regular use of alcohol with Conditional Statement
  const [showUseAlcohol, setUseAlcohol] = useState("false");

  //!Engage in recreational drug use
  const [showDrugUse, setDrugUse] = useState("false");

  return (
    <div>
      <div className="container-fluid d-flex justify-content-center mt-3">
        <div class="card" style={{ width: 50 + "rem" }}>
          <div class="card-header">Health Information</div>
          <ul class="list-group list-group-flush">
            {/* Sleeping Habits */}
            <li class="list-group-item">
              <div class="input-group">
                <span>Are you having any problems with your sleep habits?</span>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="currentPhysicalHealth"
                  value="true"
                  onChange={(e) => {
                    setSleepHabits(e.target.value === "true");
                  }}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="currentPhysicalHealth"
                  value="false"
                  onChange={(e) => {
                    setSleepHabits(e.target.value === "true");
                  }}
                />
                <label className="form-check-label ms-1">No</label>
              </div>
              {showSleepHabits && <SleepHabits />}
            </li>

            {/* Exercise Regularly */}
            <li class="list-group-item">
              <div class="input-group">
                <span>Do you exercise regularly?</span>
                <input
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="ExerciseRegularly"
                  value="true"
                  onChange={(e) => {
                    setER(e.target.value === "true");
                  }}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="ExerciseRegularly"
                  value="false"
                  onChange={(e) => {
                    setER(e.target.value === "true");
                  }}
                />
                <label className="form-check-label ms-1">No</label>
              </div>
              {showER && <ERCOMPONENT />}
            </li>

            {/* Eating Habits */}
            <li class="list-group-item">
              <div class="input-group">
                <span>
                  Are you having any difficulty with appetite or eating habits?
                </span>
                <input
                  className="form-input ms-2 "
                  type="radio"
                  name="DifficultEatingHabits"
                  value="true"
                  onChange={(e) => {
                    setEatingHabits(e.target.value === "true");
                  }}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-input ms-2 "
                  type="radio"
                  name="DifficultEatingHabits"
                  value="false"
                  onChange={(e) => {
                    setEatingHabits(e.target.value === "true");
                  }}
                />
                <label className="form-check-label ms-1">No</label>
              </div>
              {showEatingHabits && <EatingHabits />}
            </li>

            {/* Weight Change */}
            <li class="list-group-item">
              <div class="input-group">
                <span>
                  Have you experienced significant weight change in the last 2
                  months?
                </span>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="WeightChange"
                  value="Yes"
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="WeightChange"
                  value="No"
                />
                <label className="form-check-label ms-1">No</label>
              </div>
            </li>

            {/* Use of Alcohol */}
            <li class="list-group-item">
              <div class="input-group">
                <span>Do you regularly use alcohol?</span>
                <input
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="WeightChange"
                  value="true"
                  onChange={(e) => {
                    setUseAlcohol(e.target.value === "true");
                  }}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="WeightChange"
                  value="false"
                  onChange={(e) => {
                    setUseAlcohol(e.target.value === "true");
                  }}
                />
                <label className="form-check-label ms-1">No</label>
              </div>
              {showUseAlcohol && <UseAlochol />}
            </li>

            {/* Engage of Drugs */}
            <li class="list-group-item">
              <div class="input-group">
                <span>How often do you engage in recreational drug use?</span>
                <input
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="WeightChange"
                  value="true"
                  onChange={(e) => {
                    setDrugUse(e.target.value === "true");
                  }}
                />
                <label className="form-check-label ms-1">Daily</label>
                <input
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="WeightChange"
                  value="true"
                  onChange={(e) => {
                    setDrugUse(e.target.value === "true");
                  }}
                />
                <label className="form-check-label ms-1">Weekly</label>
                <input
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="WeightChange"
                  value="true"
                  onChange={(e) => {
                    setDrugUse(e.target.value === "true");
                  }}
                />
                <label className="form-check-label ms-1">Monthly</label>
                <input
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="WeightChange"
                  value="true"
                  onChange={(e) => {
                    setDrugUse(e.target.value === "true");
                  }}
                />
                <label className="form-check-label ms-1">Rarely</label>
                <input
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="WeightChange"
                  value="false"
                  onChange={(e) => {
                    setDrugUse(e.target.value === "true");
                  }}
                />
                <label className="form-check-label ms-1">Never</label>
              </div>
              {showDrugUse && <RecreationalDrug />}
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

//! if patients answer is yes, in question: Are you having any problems with your sleep habits?
const SleepHabits = () => {
  //!Get value of fradio buttons in Sleep Habits
  const [getSleepHabits, setSleepHabits] = useState("");
  return (
    <div className="form-check-inline ">
      <span>If yes, check where applicable:</span>
      <div className="mt-1">
        <input
          className="form-input ms-2 rounded-5"
          type="radio"
          name="SleepHabits"
          value="Sleeping too little"
          onChange={(e) => {
            setSleepHabits(e.target.value);
          }}
        />
        <label className="form-check-label ms-1">Sleeping too little</label>
        <input
          className="form-input ms-2 rounded-5"
          type="radio"
          name="SleepHabits"
          value="Sleeping too much"
          onChange={(e) => {
            setSleepHabits(e.target.value);
          }}
        />
        <label className="form-check-label ms-1">Sleeping too much</label>
        <input
          className="form-input ms-2 rounded-5"
          type="radio"
          name="SleepHabits"
          value="Can't fall asleep"
          onChange={(e) => {
            setSleepHabits(e.target.value);
          }}
        />
        <label className="form-check-label ms-1">Can't fall asleep</label>
        <input
          className="form-input ms-2"
          type="radio"
          name="SleepHabits"
          value="Can't stay asleep"
          onChange={(e) => {
            setSleepHabits(e.target.value);
          }}
        />
        <label className="form-check-label ms-1">Can't stay asleep</label>
      </div>
    </div>
  );
};

//! if patient answer is yes, in question: Do you exercise regularly?
const ERCOMPONENT = () => {
  //! If yes, how many times per week do you exercise?
  const [getPerWeek, setPerWeek] = useState();

  //! If yes, for how long?
  const [getHowLong, setHowLong] = useState();

  //! If yes, what do you do?
  const [getWhatYouDo, setWhatYouDo] = useState(``);
  return (
    <>
      <div class="input-group mt-1">
        <span class="d-flex align-items-center">
          If yes, how many times per week do you exercise?
        </span>
        <input
          type="number"
          class="form-control rounded-4 ms-1"
          onChange={(e) => {
            setPerWeek(e.target.value);
          }}
        />
        <span class="d-flex align-items-center ms-1">For how long?</span>
        <input
          type="number"
          class="form-control rounded-4 ms-1"
          onChange={(e) => {
            setHowLong(e.target.value);
          }}
        />
      </div>
      <div class="input-group mt-2">
        <span class="d-flex align-items-center">If yes, what do you do?</span>
        <input
          type="number"
          class="form-control rounded-4 ms-1"
          onChange={(e) => {
            setWhatYouDo(e.target.value);
          }}
        />
      </div>
    </>
  );
};

//! if patient answer is yes, in question: Are you having any difficulty with appetite or eating habits?
const EatingHabits = () => {
  //! Get value of Eating Habits
  const [getEatingHabits, setEatingHabits] = useState("");
  return (
    <div className="form-check-inline mt-2">
      <span>If yes, check where applicable:</span>
      <input
        className="form-input ms-2 rounded-5"
        type="radio"
        name="DifficultEatingHabits"
        value="Eating less"
        onChange={(e) => {
          setEatingHabits(e.target.value);
        }}
      />
      <label className="form-check-label ms-1">Eating less</label>
      <input
        className="form-input ms-2 rounded-5"
        type="radio"
        name="DifficultEatingHabits"
        value="Eating more"
        onChange={(e) => {
          setEatingHabits(e.target.value);
        }}
      />
      <label className="form-check-label ms-1">Eating more</label>
      <input
        className="form-input ms-2 rounded-5"
        type="radio"
        name="DifficultEatingHabits"
        value="Bingeing"
        onChange={(e) => {
          setEatingHabits(e.target.value);
        }}
      />
      <label className="form-check-label ms-1">Bingeing</label>
      <input
        className="form-input ms-2 rounded-5"
        type="radio"
        name="DifficultEatingHabits"
        value="Purging"
        onChange={(e) => {
          setEatingHabits(e.target.value);
        }}
      />
      <label className="form-check-label ms-1">Purging</label>
    </div>
  );
};

//! if patient answer is yes, in question: Do you regularly use alcohol?
const UseAlochol = () => {
  //! Get value of alcohol frequency
  const [getFrequency, setFrequency] = useState("");

  return (
    <>
      <div className="form-check-inline mt-2">
        <span>If yes, what is your frequency?</span>
        <input
          className="form-input ms-2 rounded-5"
          type="radio"
          name="RegularUseOfAlcohol"
          value="Eating less"
          onChange={(e) => {
            setFrequency(e.target.value);
          }}
        />
        <label className="form-check-label ms-1">Once a month</label>
        <input
          className="form-input ms-2 rounded-5"
          type="radio"
          name="RegularUseOfAlcohol"
          value="Eating more"
          onChange={(e) => {
            setFrequency(e.target.value);
          }}
        />
        <label className="form-check-label ms-1">Once a week</label>
        <input
          className="form-input ms-2 rounded-5"
          type="radio"
          name="RegularUseOfAlcohol"
          value="Bingeing"
          onChange={(e) => {
            setFrequency(e.target.value);
          }}
        />
        <label className="form-check-label ms-1">Daily</label>
      </div>
      <div className="form-check-inline mt-2">
        <input
          className="form-input ms-2 rounded-5"
          type="radio"
          name="RegularUseOfAlcohol"
          value="Purging"
          onChange={(e) => {
            setFrequency(e.target.value);
          }}
        />
        <label className="form-check-label ms-1">Daily, 3 or more</label>
        <input
          className="form-input ms-2 rounded-5"
          type="radio"
          name="RegularUseOfAlcohol"
          value="Intoxicated daily"
          onChange={(e) => {
            setFrequency(e.target.value);
          }}
        />
        <label className="form-check-label ms-1">Intoxicated daily</label>
      </div>
    </>
  );
};

//! if patient answer is yes, in question: How often do you engage in recreational drug use?
const RecreationalDrug = () => {
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
          class="form-control rounded-4 ms-1"
          style={{ width: 45 + "rem" }}
          onChange={(e) => {
            setDrugs(e.target.value);
          }}
        />
      </div>
    </div>
  );
};
