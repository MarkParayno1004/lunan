import { useState } from "react";
export const CardSeven = ({ ButtonBack, ButtonNext }) => {
  //! Radio Button for Do you Smoke
  const [showSmoke, setSmoke] = useState("false");

  //! Radio Button for Do you drink Caffeinated Drinks
  const [showCaffeinatedDrinks, setCaffeinatedDrinks] = useState("false");

  //! Radio Button for Have you ever had a Head Injury
  const [showHeadInjury, setHeadInjury] = useState("false");

  //! Changes or Stressors
  const [getChangesorStressors, setChangesorStressors] = useState("");

  return (
    <div>
      <div className="container-fluid d-flex justify-content-center mt-3">
        <div className="card" style={{ width: 50 + "rem" }}>
          <div class="card-header">Health Information</div>
          <ul class="list-group list-group-flush">
            {/* Health Information */}
            <li class="list-group-item">
              <div className="form-check-inline">
                <span>Do you Smoke?</span>
                <input
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="Smoke"
                  value="true"
                  onChange={(e) => {
                    setSmoke(e.target.value === "true");
                  }}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="Smoke"
                  value="false"
                  onChange={(e) => {
                    setSmoke(e.target.value === "true");
                  }}
                />
                <label className="form-check-label ms-1">No</label>
                {showSmoke && <SmokeYes />}
              </div>
            </li>

            {/* Do you drink Caffeinated Drinks? */}
            <li class="list-group-item">
              <div className="form-check-inline">
                <span>Do you drink Caffeinated Drinks?</span>
                <input
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="CaffeinatedDrinks"
                  value="true"
                  onChange={(e) => {
                    setCaffeinatedDrinks(e.target.value === "true");
                  }}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="CaffeinatedDrinks"
                  value="false"
                  onChange={(e) => {
                    setCaffeinatedDrinks(e.target.value === "true");
                  }}
                />
                <label className="form-check-label ms-1">No</label>
                {showCaffeinatedDrinks && <CaffeinatedDrinksYes />}
              </div>
            </li>

            {/* Head Injury */}
            <li class="list-group-item">
              <div className="form-check-inline">
                <span>Have you ever had any Head Injury?</span>
                <input
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="HeadInjury"
                  value="true"
                  onChange={(e) => {
                    setHeadInjury(e.target.value === "true");
                  }}
                />
                <label class="form-check-label ms-1">Yes</label>
                <input
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="HeadInjury"
                  value="false"
                  onChange={(e) => {
                    setHeadInjury(e.target.value === "true");
                  }}
                />
                <label class="form-check-label ms-1">No</label>
                {showHeadInjury && <HeadInjuryYes />}
              </div>
            </li>
            {/* Experience any significant changes or stressors */}
            <li class="list-group-item">
              <div className="form-check-inline">
                <span>
                  In the last year, have you ever experienced any significant
                  changes or stressors?
                </span>
                <textarea
                  class="form-control rounded-4"
                  placeholder="Answer: "
                  id="floatingTextarea2"
                  style={{ height: 70 + "px", width: 45 + "rem" }}
                  onChange={(e) => {
                    setChangesorStressors(e.target.value);
                  }}
                ></textarea>
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

//! If yes is the answer, in question: Do you Smoke?
const SmokeYes = () => {
  //!Get value of smoke
  const [getSmoke, setSmoke] = useState("");

  return (
    <>
      <div class="input-group">
        <span className="me-2 d-flex align-items-center">
          If yes, how many cigarettes per day?
        </span>
        <input
          type="number"
          placeholder="Answer: "
          class="form-control me-3 rounded-4"
          onChange={(e) => {
            setSmoke(e.target.value);
          }}
        />
      </div>
    </>
  );
};

//! If yes is the answer, in question: Do you drink Caffeinated Drinks?
const CaffeinatedDrinksYes = () => {
  //! Get value of sodas per day
  const [getSodas, setSodas] = useState("");
  //! Get value of coffee per day
  const [getCoffee, setCoffee] = useState();

  return (
    <>
      <div class="input-group">
        <span className="me-2 d-flex align-items-center">
          If yes, number of sodas per day
        </span>
        <input
          type="number"
          placeholder="Answer: "
          class="form-control me-3 rounded-4"
          onChange={(e) => {
            setSodas(e.target.value);
          }}
        />
        <span class="me-2 d-flex align-items-center">
          Cups of coffee per day
        </span>
        <input
          type="number"
          placeholder="Answer: "
          class="form-control me-3 rounded-4"
          onChange={(e) => {
            setCoffee(e.target.value);
          }}
        />
      </div>
    </>
  );
};

//! If yes is the answer, in question: Have you ever had any Head Injury?
const HeadInjuryYes = () => {
  //!Get value of headache
  const [getHeadache, setHeadache] = useState();

  return (
    <div class="input-group mt-1">
      <span class="d-flex align-items-center me-2">
        If yes, when and what happened?{" "}
      </span>
      <div class="form-floating">
        <textarea
          class="form-control rounded-4"
          placeholder="Answer:"
          id="floatingTextarea1"
          style={{ height: 70 + "px", width: 20 + "rem" }}
          onChange={(e) => {
            setHeadache(e.target.value);
          }}
        ></textarea>
        <label for="floatingTextarea1">Answer:</label>
      </div>
    </div>
  );
};
