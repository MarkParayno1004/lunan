import { useState, useRef, useEffect } from "react";
export const CardSix = ({ ButtonBack, ButtonNext, formData }) => {
  const [localFormData, setLocalFormData] = useState({
    currentPhysicalHealth: "",
    LastPhysicalExam: "",
    chronicIllnessSel: "",
    ChronicIll: "",
    AllergiesSel: "",
    Sleep: "",
    MaintMeds: "",
    MaintMedsSel: "",
    AllergyList: "",
  });

  useEffect(() => {
    setLocalFormData(
      formData ?? {
        currentPhysicalHealth: "",
        LastPhysicalExam: "",
        chronicIllnessSel: "",
        ChronicIll: "",
        AllergiesSel: "",
        Sleep: "",
        MaintMeds: "",
        AllergyList: "",
      }
    );
  }, [formData]);

  //!Radio Button for Physical Health
  const [getCurrentPhysicalHealth, setCurrentPhysicalHealth] = useState("");

  //! Date of last physicalExamniation
  const [getLastPhysicalExamniation, setLastPhysicalExamniation] = useState("");

  //! List of any chronic Health
  const [getChronicHealth, setChronicHealth] = useState(``);

  //! Radio Button for Any Allergies with Conditional Statements
  const [showAllergies, setAllergies] = useState("No");

  //! List of any Medication
  const [getMedication, setMedication] = useState(``);

  //! Hours of Sleep
  const [getHourSleep, setHourSleep] = useState();

  //! List of any chronic problems
  const [showListChProblem, setListChProblem] = useState();

  //! List of medications
  const [showListMedication, setListMedication] = useState();

  const handleNext = () => {
    console.log(localFormData); // Log form data
    ButtonNext(localFormData); // Call the ButtonNext function with form data
  };
  return (
    <div>
      <div className="container-fluid d-flex justify-content-center mt-3">
        <div className="card" style={{ width: 50 + "rem" }}>
          <div className="card-header">Health Information</div>
          <ul className="list-group list-group-flush">
            {/* Physical Health Currently */}
            <li className="list-group-item">
              <div className="form-check-inline ">
                <p className="">
                  How is your physical health currently? (please choose)
                </p>

                <label>
                  <input
                    className="form-input ms-2"
                    type="radio"
                    name="currentPhysicalHealth"
                    value="Poor"
                    onChange={(e) => {
                      setCurrentPhysicalHealth(e.target.value);
                      const { name, value } = e.target;
                      setLocalFormData((prevData) => ({
                        ...prevData,
                        [name]: value,
                      }));
                    }}
                    checked={localFormData.currentPhysicalHealth === "Poor"}
                  />
                  <label className="form-check-label ms-1">Poor</label>

                  <input
                    className="form-input ms-2"
                    type="radio"
                    name="currentPhysicalHealth"
                    value="Unsatisfactory"
                    onChange={(e) => {
                      setCurrentPhysicalHealth(e.target.value);
                      const { name, value } = e.target;
                      setLocalFormData((prevData) => ({
                        ...prevData,
                        [name]: value,
                      }));
                    }}
                    checked={
                      localFormData.currentPhysicalHealth === "Unsatisfactory"
                    }
                  />
                  <label className="form-check-label ms-1">
                    Unsatisfactory
                  </label>

                  <input
                    className="form-input ms-2"
                    type="radio"
                    name="currentPhysicalHealth"
                    value="Satisfactory"
                    onChange={(e) => {
                      setCurrentPhysicalHealth(e.target.value);
                      const { name, value } = e.target;
                      setLocalFormData((prevData) => ({
                        ...prevData,
                        [name]: value,
                      }));
                    }}
                    checked={
                      localFormData.currentPhysicalHealth === "Satisfactory"
                    }
                  />
                  <label className="form-check-label ms-1">Satisfactory</label>

                  <input
                    className="form-input ms-2"
                    type="radio"
                    name="currentPhysicalHealth"
                    value="Good"
                    onChange={(e) => {
                      setCurrentPhysicalHealth(e.target.value);
                      const { name, value } = e.target;
                      setLocalFormData((prevData) => ({
                        ...prevData,
                        [name]: value,
                      }));
                    }}
                    checked={localFormData.currentPhysicalHealth === "Good"}
                  />
                  <label className="form-check-label ms-1">Good</label>

                  <input
                    className="form-input ms-2"
                    type="radio"
                    name="currentPhysicalHealth"
                    value="Very Good"
                    onChange={(e) => {
                      setCurrentPhysicalHealth(e.target.value);
                      const { name, value } = e.target;
                      setLocalFormData((prevData) => ({
                        ...prevData,
                        [name]: value,
                      }));
                    }}
                    checked={
                      localFormData.currentPhysicalHealth === "Very Good"
                    }
                  />
                  <label className="form-check-label ms-1">Very Good</label>
                </label>
              </div>
            </li>

            {/* Date of last physical examination */}
            <li className="list-group-item">
              <div className="input-group">
                <span className="d-flex align-items-center">
                  Date of last physical examination
                </span>
                <input
                  type="date"
                  className="form-control  rounded-4 me-1 ms-2"
                  day
                  name="LastPhysicalExam"
                  ref={useRef(null)}
                  onChange={(e) => {
                    setLastPhysicalExamniation(e.target.value);
                    const { name, value } = e.target;
                    setLocalFormData((prevData) => ({
                      ...prevData,
                      [name]: value,
                    }));
                  }}
                  value={localFormData.LastPhysicalExam}
                />
              </div>
            </li>

            {/* list any chronic health problems or concerns */}
            <li className="list-group-item">
              <div className="input-group">
                <div className="form-check-inline">
                  <span>
                    Do you want to list any chronic health problems or concerns?
                    (e.g. asthma, hypertension, diabetes, headaches, stomach
                    pain, seizures, etc.):
                  </span>
                  <label>
                    <input
                      className="form-input ms-2"
                      type="radio"
                      name="chronicIllnessSel"
                      value="Yes"
                      checked={localFormData.chronicIllnessSel === "Yes"}
                      onChange={(event) => {
                        setListChProblem(event.target.value);
                        const { name, value } = event.target;
                        setLocalFormData((prevData) => ({
                          ...prevData,
                          [name]: value,
                        }));
                      }}
                    />
                    <label className="form-check-label ms-1">Yes</label>

                    <input
                      className="form-input ms-2"
                      type="radio"
                      name="chronicIllnessSel"
                      value="No"
                      checked={localFormData.chronicIllnessSel === "No"}
                      onChange={(event) => {
                        setListChProblem(event.target.value);
                        const { name, value } = event.target;
                        setLocalFormData((prevData) => ({
                          ...prevData,
                          [name]: value,
                        }));
                      }}
                    />
                    <label className="form-check-label ms-1">No</label>
                    {showListChProblem === "Yes" && (
                      <div className="form-floating">
                        <textarea
                          className="form-control rounded-4"
                          placeholder="Answer"
                          id="floatingTextarea2"
                          name="ChronicIll"
                          style={{ height: 70 + "px", width: 45 + "rem" }}
                          onChange={(e) => {
                            setChronicHealth(e.target.value);
                            const { name, value } = e.target;
                            setLocalFormData((prevData) => ({
                              ...prevData,
                              [name]: value,
                            }));
                          }}
                          value={localFormData.ChronicIll}
                        ></textarea>
                        <label for="floatingTextarea2">Answer:</label>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </li>

            {/* Any Allergies Radio Button */}
            <li className="list-group-item">
              <div className="input-group">
                <span>Any Allergies?</span>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="AllergiesSel"
                  value="Yes"
                  checked={localFormData.AllergiesSel === "Yes"}
                  onChange={(e) => {
                    setAllergies(e.target.value);
                    const { name, value } = e.target;
                    setLocalFormData((prevData) => ({
                      ...prevData,
                      [name]: value,
                    }));
                  }}
                />
                <label className="form-check-label ms-1">Yes</label>

                <input
                  className="form-input ms-2"
                  type="radio"
                  name="AllergiesSel"
                  value="No"
                  checked={localFormData.AllergiesSel === "No"}
                  onChange={(e) => {
                    setAllergies(e.target.value);
                    const { name, value } = e.target;
                    setLocalFormData((prevData) => ({
                      ...prevData,
                      [name]: value,
                    }));
                  }}
                />
                <label className="form-check-label ms-1">No</label>
                {showAllergies === "Yes" && <Allergies />}
              </div>
            </li>

            {/* Medications and Per hour night sleep*/}
            <li className="list-group-item">
              <div className="input-group">
                <div className="input-group">
                  <span className="d-flex align-items-center me-2">
                    Do you have any maintenance?
                  </span>
                  <input
                    className="form-input "
                    type="radio"
                    name="MaintMedsSel"
                    value="Yes"
                    checked={localFormData.MaintMedsSel === "Yes"}
                    onChange={(e) => {
                      setListMedication(e.target.value);
                      const { name, value } = e.target;
                      setLocalFormData((prevData) => ({
                        ...prevData,
                        [name]: value,
                      }));
                    }}
                  />
                  <label className="form-check-label ms-1">Yes</label>

                  <input
                    className="form-input ms-2"
                    type="radio"
                    name="MaintMedsSel"
                    value="No"
                    checked={localFormData.MaintMedsSel === "No"}
                    onChange={(e) => {
                      setListMedication(e.target.value);
                      const { name, value } = e.target;
                      setLocalFormData((prevData) => ({
                        ...prevData,
                        [name]: value,
                      }));
                    }}
                  />
                  <label className="form-check-label ms-1">No</label>
                </div>

                {showListMedication === "Yes" && (
                  <div className="form-floating">
                    <span className="d-flex align-items-center me-2">
                      List down your maintenance medicine:
                    </span>
                    <textarea
                      className="form-control rounded-4"
                      id="floatingTextarea2"
                      name="MaintMeds"
                      onChange={(e) => {
                        setMedication(e.target.value);
                        const { name, value } = e.target;
                        setLocalFormData((prevData) => ({
                          ...prevData,
                          [name]: value,
                        }));
                      }}
                      style={{ height: 90 + "px", width: 48 + "rem" }}
                      value={localFormData.MaintMeds}
                    ></textarea>
                  </div>
                )}

                <div className="input-group">
                  <span className="d-flex align-items-center me-2">
                    Hours per night you normally sleep
                  </span>
                  <input
                    type="number"
                    name="Sleep"
                    className="form-control rounded-4 mt-2"
                    onChange={(e) => {
                      setHourSleep(e.target.value);
                      const { name, value } = e.target;
                      setLocalFormData((prevData) => ({
                        ...prevData,
                        [name]: value,
                      }));
                    }}
                    value={localFormData.Sleep}
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
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

//! If yes is the answer, in question: Any Allergies?
const Allergies = () => {
  const [getAllergies, setAllergies] = useState(``);
  return (
    <div className="input-group mt-1">
      <span className="d-flex align-items-center me-2">
        If yes, please list:{" "}
      </span>
      <div className="form-floating">
        <textarea
          className="form-control rounded-4"
          placeholder="Answer"
          id="floatingTextarea2"
          name="AllergyList"
          style={{ height: 70 + "px", width: 20 + "rem" }}
          onChange={(e) => {
            setAllergies(e.target.value);
          }}
        ></textarea>
        <label for="floatingTextarea2">Answer:</label>
      </div>
    </div>
  );
};
