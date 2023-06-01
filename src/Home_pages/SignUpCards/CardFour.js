import { useState, useEffect } from "react";
export const CardFour = ({ ButtonBack, ButtonNext, formData }) => {
  const [localFormData, setLocalFormData] = useState({
    SexualPref: "",
    MaritalStatus: "",
    RelStatus: "",
    HowLong: "",
    QualRel: "",
    Child: "",
    CountChild: "",
    ChildAge: "",
    TherapyStatus: "",
    WhyTherapy: "",
    WhenTherapy: "",
    showRomanticRelationship: false,
  });
  useEffect(() => {
    setLocalFormData(
      formData ?? {
        SexualPref: "",
        MaritalStatus: "",
        RelStatus: "",
        HowLong: "",
        QualRel: "",
        Child: "",
        CountChild: "",
        ChildAge: "",
        TherapyStatus: "",
        WhyTherapy: "",
        WhenTherapy: "",
      }
    );
  }, [formData]);

  //! If answer is yes in Romantic Relationship
  const [showRomanticRelationship, setRomanticRelationship] = useState(false);
  const handleRomanticRelationship = (event) => {
    setRomanticRelationship(event.target.value === "Yes");
    const { name, value } = event.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //! If answer is yes in Do you have a child?
  const [showChildren, setChildren] = useState(false);
  const handleChildren = (event) => {
    setChildren(event.target.value === "Yes");
    const { name, value } = event.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //! If answer is yes in psychotherapy
  const [showPsychoTherapy, setPsychoTherapy] = useState(false);
  const handlePsychoTherapy = (event) => {
    setPsychoTherapy(event.target.value === "Yes");
    const { name, value } = event.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //! Get value of Radio Button ofSexual Preference
  const [getSexualPref, setSexualPref] = useState("");
  const handleSexualPref = (e) => {
    setSexualPref(e.target.value);
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //! Get Value of Radio Button of Marital Status
  const [getMaritalStatus, setMaritalStatus] = useState("");
  const handleMaritalStatus = (e) => {
    setMaritalStatus(e.target.value);
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleNext = () => {
    console.log(localFormData); // Log form data
    ButtonNext(localFormData); // Call the ButtonNext function with form data
  };
  return (
    <div>
      <div className="container-fluid d-flex justify-content-center mt-3">
        <div className="card" style={{ width: 50 + "rem" }}>
          <div className="card-header">
            Please fill up this intake form: (This form will be your Sign Up
            form or Register Form)
          </div>
          <ul className="list-group list-group-flush">
            {/* Sexual Preference */}
            <li className="list-group-item">
              <span className="">Sexual Preference:</span>
              <div className="form-check-inline ms-2">
                <input
                  className="form-input"
                  type="radio"
                  name="SexualPref"
                  value="Men"
                  checked={localFormData.SexualPref === "Men"}
                  onChange={handleSexualPref}
                />
                <label className="form-check-label ms-1">Men</label>
              </div>
              <div className="form-check-inline">
                <input
                  className="form-input"
                  type="radio"
                  name="SexualPref"
                  value="Women"
                  checked={localFormData.SexualPref === "Women"}
                  onChange={handleSexualPref}
                />
                <label className="form-check-label ms-1">Women</label>
              </div>
              <div className="form-check-inline">
                <input
                  className="form-input"
                  type="radio"
                  name="SexualPref"
                  value="Both"
                  checked={localFormData.SexualPref === "Both"}
                  onChange={handleSexualPref}
                />
                <label className="form-check-label ms-1" for="exampleRadios1">
                  Both
                </label>
              </div>
            </li>

            {/* Marital Status */}
            <li className="list-group-item">
              <span className="">Marital Status:</span>
              <div className="form-check-inline ms-2">
                <input
                  className="form-input"
                  type="radio"
                  name="MaritalStatus"
                  value="Never Married"
                  checked={localFormData.MaritalStatus === "Never Married"}
                  onChange={handleMaritalStatus}
                />
                <label className="form-check-label ms-1">Never Married</label>
              </div>
              <div className="form-check-inline">
                <input
                  className="form-input"
                  type="radio"
                  name="MaritalStatus"
                  value="Partnered"
                  checked={localFormData.MaritalStatus === "Partnered"}
                  onChange={handleMaritalStatus}
                />
                <label className="form-check-label ms-1">Partnered</label>
              </div>
              <div className="form-check-inline">
                <input
                  className="form-input"
                  type="radio"
                  name="MaritalStatus"
                  value="Married"
                  checked={localFormData.MaritalStatus === "Married"}
                  onChange={handleMaritalStatus}
                />
                <label className="form-check-label ms-1" for="exampleRadios1">
                  Married
                </label>
              </div>
              <div className="form-check-inline">
                <input
                  className="form-input"
                  type="radio"
                  name="MaritalStatus"
                  value="Separated"
                  checked={localFormData.MaritalStatus === "Separated"}
                  onChange={handleMaritalStatus}
                />
                <label className="form-check-label ms-1" for="exampleRadios1">
                  Separated
                </label>
              </div>
              <div className="form-check-inline">
                <input
                  className="form-input"
                  type="radio"
                  name="MaritalStatus"
                  value="Divorced"
                  checked={localFormData.MaritalStatus === "Divorced"}
                  onChange={handleMaritalStatus}
                />
                <label className="form-check-label ms-1" for="exampleRadios1">
                  Divorced
                </label>
              </div>
              <div className="form-check-inline">
                <input
                  className="form-input"
                  type="radio"
                  name="MaritalStatus"
                  value="Widowed"
                  checked={localFormData.MaritalStatus === "Widowed"}
                  onChange={handleMaritalStatus}
                />
                <label className="form-check-label " for="exampleRadios1">
                  Widowed
                </label>
              </div>
            </li>

            {/* Series of Questions */}
            {/* Romantic RelationShip Question */}
            <li className="list-group-item">
              <span>Are you currently in a romantic relationship?</span>
              <div className="form-check-inline ms-2">
                <input
                  className="form-input"
                  type="radio"
                  name="RelStatus"
                  value="Yes"
                  checked={localFormData.RelStatus === "Yes"}
                  onChange={handleRomanticRelationship}
                />
                <label className="form-check-label ms-1" for="exampleRadios1">
                  Yes
                </label>
              </div>

              <input
                className="form-input"
                type="radio"
                name="RelStatus"
                value="No"
                checked={localFormData.RelStatus === "No"}
                onChange={handleRomanticRelationship}
              />
              <label className="form-check-label " for="exampleRadios1">
                No
              </label>
              {showRomanticRelationship && (
                <RomanticRelationShipYes
                  setLocalFormData={setLocalFormData}
                  localFormData={localFormData}
                />
              )}
            </li>

            {/* Do you have a child? */}
            <li className="list-group-item">
              <span>Do you have a child?</span>
              <div className="form-check-inline ms-2">
                <input
                  className="form-input"
                  type="radio"
                  name="Child"
                  value="Yes"
                  checked={localFormData.Child === "Yes"}
                  onChange={handleChildren}
                />
                <label className="form-check-label ms-1" for="exampleRadios1">
                  Yes
                </label>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="Child"
                  value="No"
                  checked={localFormData.Child === "No"}
                  onChange={handleChildren}
                />
                <label className="form-check-label ms-1" for="exampleRadios1">
                  No
                </label>
              </div>
              {showChildren && (
                <ChildrenYes
                  setLocalFormData={setLocalFormData}
                  localFormData={localFormData}
                />
              )}
            </li>

            {/* Previous psychotherapy */}
            <li className="list-group-item">
              <div className="form-check-inline ">
                <span>Have you had previous psychotherapy?</span>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="TherapyStatus"
                  value="Yes"
                  checked={localFormData.TherapyStatus === "Yes"}
                  onChange={handlePsychoTherapy}
                />
                <label className="form-check-label ms-1" for="exampleRadios1">
                  Yes
                </label>
                <input
                  className="form-input ms-2"
                  type="radio"
                  name="TherapyStatus"
                  value="No"
                  checked={localFormData.TherapyStatus === "No"}
                  onChange={handlePsychoTherapy}
                />
                <label className="form-check-label ms-1 " for="exampleRadios1">
                  No
                </label>
              </div>

              {showPsychoTherapy && (
                <PsychoTherapy
                  setLocalFormData={setLocalFormData}
                  localFormData={localFormData}
                />
              )}
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

//! if patient chooses yes, in the question: Are you currently in a romantic relationship?
const RomanticRelationShipYes = ({ setLocalFormData, localFormData }) => {
  //!Store the answer
  const [getCurrentRelationAnswer, setCurrentRelationAnswer] = useState();
  const handleCurrentRelation = (e) => {
    setCurrentRelationAnswer(e.target.value);
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [getScale, setScale] = useState();
  const handleScale = (e) => {
    setScale(e.target.value);
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
        name="HowLong"
        value={localFormData.HowLong}
        className="form-control me-3 rounded-4"
        onChange={handleCurrentRelation}
      />
      <div className="input-group mt-3">
        <p className="me-2 d-flex align-items-center">
          If yes, on a scale of 1-10 (10=great), <br />
          how would you rate the quality of your romantic relationship?
        </p>
        <input
          type="number"
          aria-label="CurrentRelationAnswer"
          placeholder="Answer:"
          name="QualRel"
          value={localFormData.QualRel}
          className="form-control me-3 rounded-4"
          onChange={handleScale}
        />
      </div>
    </>
  );
};

//! if patient chooses yes, in the question: Do you have a child??
const ChildrenYes = ({ setLocalFormData, localFormData }) => {
  const [getChildren, setChildren] = useState();
  const handleChildren = (e) => {
    setChildren(e.target.value);
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [getChildrenAge, setChildrenAge] = useState();
  const handleChildrenAge = (e) => {
    setChildrenAge(e.target.value);
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      <div className="input-group">
        <span className="me-2 d-flex align-items-center">
          If yes, how many?
        </span>
        <input
          type="text"
          aria-label="Patient's Child"
          placeholder="Answer:"
          name="CountChild"
          value={localFormData.CountChild}
          className="form-control me-3 rounded-4"
          onChange={handleChildren}
        />
        <span className="d-flex align-items-center">Age?</span>
        <input
          type="number"
          aria-label="Patient's Child"
          placeholder="Answer:"
          name="ChildAge"
          value={localFormData.ChildAge}
          className="form-control ms-1 rounded-4"
          onChange={handleChildrenAge}
        />
      </div>
    </>
  );
};

//! if patient chooses yes, in the question: Have you had previous psychotherapy?
const PsychoTherapy = ({ setLocalFormData, localFormData }) => {
  const [getWhyPsychoTherapy, setWhyPsychoTherapy] = useState(``);
  const handleWhyPsychoTherapyR = (e) => {
    setWhyPsychoTherapy(e.target.value);
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [getWhenPsychoTherapy, setWhenPsychoTherapy] = useState(``);
  const handleWhenPsychoTherapy = (e) => {
    setWhenPsychoTherapy(e.target.value);
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      <span className="me-2 d-flex align-items-center">If yes, why?</span>
      <textarea
        type="text"
        aria-label="PsychoTherapyResult"
        placeholder="Answer:"
        name="WhyTherapy"
        value={localFormData.WhyTherapy}
        className="form-control me-3 rounded-4"
        onChange={handleWhyPsychoTherapyR}
      />
      <div className="input-group mt-3">
        <p className="me-2 d-flex align-items-center">If yes, when?</p>
        <textarea
          type="text"
          aria-label="PsychoTherapyResult"
          placeholder="Answer:"
          name="WhenTherapy"
          value={localFormData.WhenTherapy}
          className="form-control me-3 rounded-4"
          onChange={handleWhenPsychoTherapy}
        />
      </div>
    </>
  );
};
