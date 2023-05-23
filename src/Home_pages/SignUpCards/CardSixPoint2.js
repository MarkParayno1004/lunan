import { useState } from "react";

export const CardSixPoint2 = ({ ButtonBack, ButtonNext }) => {
  //!Sleep Habit with Conditional Statement
  const [showSleepHabits, setSleepHabits] = useState("false");
  const handleSetSleepHabits = (event) => {
    setSleepHabits(event.target.value === "true");
  };

  //!Handle Exercise Regularly with Conditional Statement
  const [showER, setER] = useState("false");
  const handleER = (event) => {
    setER(event.target.value === "true");
  };

  //!Eating Habits with Conditional Statement
  const [showEatingHabits, setEatingHabits] = useState("false");
  const handleEatingHabits = (event) => {
    setEatingHabits(event.target.value === "true");
  };

  //!Regular use of alcohol with Conditional Statement
  const [showUseAlcohol, setUseAlcohol] = useState("false");
  const handleUseAlcohol = (event) => {
    setUseAlcohol(event.target.value === "true");
  };

  //!Engage in recreational drug use
  const [showDrugUse, setDrugUse] = useState("false");
  const handleDrugUse = (event) => {
    setDrugUse(event.target.value === "true");
  };
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
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="currentPhysicalHealth"
                  value="true"
                  onChange={handleSetSleepHabits}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="currentPhysicalHealth"
                  value="false"
                  onChange={handleSetSleepHabits}
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
                  onChange={handleER}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="ExerciseRegularly"
                  value="false"
                  onChange={handleER}
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
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="DifficultEatingHabits"
                  value="true"
                  onChange={handleEatingHabits}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="DifficultEatingHabits"
                  value="false"
                  onChange={handleEatingHabits}
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
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="WeightChange"
                  value="Yes"
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-input ms-2 rounded-5"
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
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="WeightChange"
                  value="false"
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
                  onChange={handleDrugUse}
                />
                <label className="form-check-label ms-1">Daily</label>
                <input
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="WeightChange"
                  value="true"
                  onChange={handleDrugUse}
                />
                <label className="form-check-label ms-1">Weekly</label>
                <input
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="WeightChange"
                  value="true"
                  onChange={handleDrugUse}
                />
                <label className="form-check-label ms-1">Monthly</label>
                <input
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="WeightChange"
                  value="true"
                  onChange={handleDrugUse}
                />
                <label className="form-check-label ms-1">Rarely</label>
                <input
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="WeightChange"
                  value="false"
                  onChange={handleDrugUse}
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
  return (
    <div className="form-check-inline ">
      <span>If yes, check where applicable:</span>
      <div className="mt-1">
        <input
          className="form-input ms-2 rounded-5"
          type="radio"
          name="SleepHabits"
          value="Sleeping too little"
        />
        <label className="form-check-label ms-1">Sleeping too little</label>
        <input
          className="form-input ms-2 rounded-5"
          type="radio"
          name="SleepHabits"
          value="Sleeping too much"
        />
        <label className="form-check-label ms-1">Sleeping too much</label>
        <input
          className="form-input ms-2 rounded-5"
          type="radio"
          name="SleepHabits"
          value="Can't fall asleep"
        />
        <label className="form-check-label ms-1">Can't fall asleep</label>
        <input
          className="form-input ms-2"
          type="radio"
          name="SleepHabits"
          value="Can't stay asleep"
        />
        <label className="form-check-label ms-1">Can't stay asleep</label>
      </div>
    </div>
  );
};

//! if patient answer is yes, in question: Do you exercise regularly?
const ERCOMPONENT = () => {
  return (
    <div class="input-group mt-1">
      <div class="input-group">
        <span class="d-flex align-items-center">
          If yes, how many times per week do you exercise?
        </span>
        <input type="number" class="form-control rounded-4 ms-1" />
        <span class="d-flex align-items-center ms-1">For how long?</span>
        <input type="number" class="form-control rounded-4 ms-1" />
      </div>
      <div class="input-group mt-2">
        <span class="d-flex align-items-center">If yes, what do you do?</span>
        <input type="number" class="form-control rounded-4 ms-1" />
      </div>
    </div>
  );
};

//! if patient answer is yes, in question: Are you having any difficulty with appetite or eating habits?
const EatingHabits = () => {
  return (
    <div className="form-check-inline mt-2">
      <span>If yes, check where applicable:</span>
      <input
        className="form-input ms-2 rounded-5"
        type="radio"
        name="DifficultEatingHabits"
        value="Eating less"
      />
      <label className="form-check-label ms-1">Eating less</label>
      <input
        className="form-input ms-2 rounded-5"
        type="radio"
        name="DifficultEatingHabits"
        value="Eating more"
      />
      <label className="form-check-label ms-1">Eating more</label>
      <input
        className="form-input ms-2 rounded-5"
        type="radio"
        name="DifficultEatingHabits"
        value="Bingeing"
      />
      <label className="form-check-label ms-1">Bingeing</label>
      <input
        className="form-input ms-2 rounded-5"
        type="radio"
        name="DifficultEatingHabits"
        value="Purging"
      />
      <label className="form-check-label ms-1">Purging</label>
    </div>
  );
};

//! if patient answer is yes, in question: Do you regularly use alcohol?
const UseAlochol = () => {
  return (
    <>
      <div className="form-check-inline mt-2">
        <span>If yes, what is your frequency?</span>
        <input
          className="form-input ms-2 rounded-5"
          type="radio"
          name="RegularUseOfAlcohol"
          value="Eating less"
        />
        <label className="form-check-label ms-1">Once a month</label>
        <input
          className="form-input ms-2 rounded-5"
          type="radio"
          name="RegularUseOfAlcohol"
          value="Eating more"
        />
        <label className="form-check-label ms-1">Once a week</label>
        <input
          className="form-input ms-2 rounded-5"
          type="radio"
          name="RegularUseOfAlcohol"
          value="Bingeing"
        />
        <label className="form-check-label ms-1">daily</label>
      </div>
      <div className="form-check-inline mt-2">
        <input
          className="form-input ms-2 rounded-5"
          type="radio"
          name="RegularUseOfAlcohol"
          value="Purging"
        />
        <label className="form-check-label ms-1">daily, 3 or more</label>
        <input
          className="form-input ms-2 rounded-5"
          type="radio"
          name="RegularUseOfAlcohol"
          value="Purging"
        />
        <label className="form-check-label ms-1">intoxicated daily</label>
      </div>
    </>
  );
};

//! if patient answer is yes, in question: How often do you engage in recreational drug use?
const RecreationalDrug = () => {
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
        />
      </div>
    </div>
  );
};
