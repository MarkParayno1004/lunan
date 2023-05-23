import { useState } from "react";
import { useRef } from "react";
export const CardSix = ({ ButtonBack, ButtonNext }) => {
  //!Radio Button for Physical Health
  const [getCurrentPhysicalHealth, setCurrentPhysicalHealth] = useState("");
  const handleCurrentPhysicalHealth = (e) => {
    setCurrentPhysicalHealth(e.target.value);
  };

  //! Date of last physicalExamniation
  const [getLastPhysicalExamniation, setLastPhysicalExamniation] = useState("");
  const dateLastPhysicalExamniation = useRef(null);
  const handleLastPhysicalExamniation = (e) => {
    setLastPhysicalExamniation(e.target.value);
  };

  //! List of any chronic Health
  const [getChronicHealth, setChronicHealth] = useState(``);
  const handleChronicHealth = (e) => {
    setChronicHealth(e.target.value);
  };

  //! List of any Medication
  const [getMedication, setMedication] = useState(``);
  const handleMedication = (e) => {
    setMedication(e.target.value);
  };

  //! Hours of Sleep
  const [getHourSleep, setHourSleep] = useState();
  const handleHourSleep = (e) => {
    setHourSleep(e.target.value);
  };
  //! Radio Button for Any Allergies with Logical Statements
  const [showAllergies, setAllergies] = useState("false");
  const handleAllergies = (e) => {
    setAllergies(e.target.value === "true");
  };

  return (
    <div>
      <div className="container-fluid d-flex justify-content-center mt-3">
        <div class="card" style={{ width: 50 + "rem" }}>
          <div class="card-header">Health Information</div>
          <ul class="list-group list-group-flush">
            {/* Physical Health Currently */}
            <li class="list-group-item">
              <div className="form-check-inline ">
                <span className="">
                  How is your physical health currently? (please choose)
                </span>
                <input
                  className="form-check-input ms-2"
                  type="radio"
                  name="currentPhysicalHealth"
                  value="Poor"
                  onChange={handleCurrentPhysicalHealth}
                />
                <label className="form-check-label ms-1">Poor</label>
                <input
                  className="form-check-input ms-2"
                  type="radio"
                  name="currentPhysicalHealth"
                  value="Unsatisfactory"
                  onChange={handleCurrentPhysicalHealth}
                />
                <label className="form-check-label ms-1">Unsatisfactory</label>
                <input
                  className="form-check-input ms-2"
                  type="radio"
                  name="currentPhysicalHealth"
                  value="Satisfactory"
                  onChange={handleCurrentPhysicalHealth}
                />
                <label className="form-check-label ms-1">Satisfactory</label>
              </div>
              <div>
                <input
                  className="form-check-input"
                  type="radio"
                  name="currentPhysicalHealth"
                  value="Unsatisfactory"
                  onChange={handleCurrentPhysicalHealth}
                />
                <label className="form-check-label ms-1">Good</label>
                <input
                  className="form-check-input ms-2"
                  type="radio"
                  name="currentPhysicalHealth"
                  value="Satisfactory"
                  onChange={handleCurrentPhysicalHealth}
                />
                <label className="form-check-label ms-1">Very Good</label>
              </div>
            </li>

            {/* Date of last physical examination */}
            <li class="list-group-item">
              <div class="input-group">
                <span class="d-flex align-items-center">
                  Date of last physical examination
                </span>
                <input
                  type="date"
                  class="form-control  rounded-4 me-1 ms-2"
                  day
                  ref={dateLastPhysicalExamniation}
                  onChange={handleLastPhysicalExamniation}
                />
              </div>
            </li>

            {/* list any chronic health problems or concerns */}
            <li class="list-group-item">
              <div class="input-group">
                <span class="d-flex align-items-center">
                  Please list any chronic health problems or concerns (e.g.
                  asthma, hypertension, diabetes, headaches, stomach pain,
                  seizures, etc.):
                </span>
                <div class="form-floating">
                  <textarea
                    class="form-control rounded-4"
                    placeholder="Answer"
                    id="floatingTextarea2"
                    style={{ height: 70 + "px", width: 45 + "rem" }}
                    onChange={handleChronicHealth}
                  ></textarea>
                  <label for="floatingTextarea2">Answer:</label>
                </div>
              </div>
            </li>

            {/* Any Allergies Radio Button */}
            <li class="list-group-item">
              <div class="input-group">
                <span>Any Allergies?</span>
                <input
                  className="form-check-input ms-2 rounded-5"
                  type="radio"
                  name="currentPhysicalHealth"
                  value="true"
                  onChange={handleAllergies}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check-input ms-2 rounded-5"
                  type="radio"
                  name="currentPhysicalHealth"
                  value="false"
                  onChange={handleAllergies}
                />
                <label className="form-check-label ms-1">No</label>
                {showAllergies && <Allergies />}
              </div>
            </li>

            {/* Medications and Per hour night sleep*/}
            <li class="list-group-item">
              <div class="input-group">
                <span class="d-flex align-items-center me-2">Medications:</span>
                <div class="form-floating">
                  <textarea
                    class="form-control rounded-4"
                    placeholder="Answer"
                    id="floatingTextarea2"
                    onChange={handleMedication}
                    style={{ height: 70 + "px", width: 40 + "rem" }}
                  ></textarea>
                  <label for="floatingTextarea2">Answer:</label>
                </div>
                <div class="input-group">
                  <span class="d-flex align-items-center me-2">
                    Hours per night you normally sleep
                  </span>
                  <input
                    type="number"
                    class="form-control rounded-4 mt-2"
                    onChange={handleHourSleep}
                  />
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

//! If yes is the answer, in question: Any Allergies?
const Allergies = () => {
  return (
    <div class="input-group mt-1">
      <span class="d-flex align-items-center me-2">If yes, please list: </span>
      <div class="form-floating">
        <textarea
          class="form-control rounded-4"
          placeholder="Answer"
          id="floatingTextarea2"
          style={{ height: 70 + "px", width: 20 + "rem" }}
        ></textarea>
        <label for="floatingTextarea2">Answer:</label>
      </div>
    </div>
  );
};
