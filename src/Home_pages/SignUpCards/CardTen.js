import { useState, useRef, useEffect } from "react";
export const CardTen = ({ ButtonBack, ButtonNext, formData }) => {
  const [localFormData, setLocalFormData] = useState({
    EmployeeStatus: "",
    financialConcernsSel: "",
    MilitarySel: "",
    EducationSel: "",
    legalConcernsSel: "",
    Employer: "",
    CurrPos: "",
    Stressors: "",
    MilYesStart: "",
    militaryNo: "",
    LegalExp: "",
    FinExp: "",
  });

  useEffect(() => {
    setLocalFormData(
      formData ?? {
        EmployeeStatus: "",
        financialConcernsSel: "",
        MilitarySel: "",
        EducationSel: "",
        legalConcernsSel: "",
        Employer: "",
        CurrPos: "",
        Stressors: "",
        MilYesStart: "",
        militaryNo: "",
        LegalExp: "",
        FinExp: "",
      }
    );
  }, [formData]);

  //! Radio Button for Are you Employed
  const [showEmployed, setEmployed] = useState(false);
  const handleEmployed = (e) => {
    setEmployed(e.target.value === "Yes");
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //! Radio Button for Do you have financial concerns
  const [showFinancial, setFinancial] = useState(false);
  const handleFinancial = (e) => {
    setFinancial(e.target.value === "Yes");
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //! Highest level of Education
  const [getEducation, setEducation] = useState("");
  const handleEducation = (e) => {
    setEducation(e.target.value);
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const renderComponent = () => {
    switch (localFormData.MilitarySel) {
      case "Yes":
        return (
          <MilitaryYes
            setLocalFormData={setLocalFormData}
            localFormData={localFormData}
          />
        );
      case "No":
        return (
          <MilitaryNo
            setLocalFormData={setLocalFormData}
            localFormData={localFormData}
          />
        );
      default:
        return null;
    }
  };
  const [showMilitaryStatus, setMilitaryStatus] = useState(false);
  const handleMilitaryStatus = (e) => {
    const { name, value } = e.target;
    setMilitaryStatus(value === "Yes");
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //! Radio Button for Do you have any Legal Concerns
  const [showLegal, setLegal] = useState(false);
  const handleLegal = (e) => {
    setLegal(e.target.value === "Yes");
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
      <form onSubmit={handleNext}>
        <div className="container-fluid d-flex justify-content-center mt-3">
          <div class="card" style={{ width: 50 + "rem " }}>
            <div class="card-header">
              Occupational, Educational, Legal Information:
            </div>
            <ul class="list-group list-group-flush">
              {/* Are you Employed */}
              <li class="list-group-item">
                <div className="form-check-inline">
                  <span>Are you Employed?</span>
                  <input
                    className="form-check-input ms-2"
                    type="radio"
                    name="EmployeeStatus"
                    value="Yes"
                    checked={localFormData.EmployeeStatus === "Yes"}
                    onChange={handleEmployed}
                    required
                  />
                  <label className="form-check-label ms-1">Yes</label>
                  <input
                    className="form-check-input ms-2"
                    type="radio"
                    name="EmployeeStatus"
                    value="No"
                    checked={localFormData.EmployeeStatus === "No"}
                    onChange={handleEmployed}
                    required
                  />
                  <label className="form-check-label ms-1">No</label>
                  {showEmployed && (
                    <EmployedYes
                      setLocalFormData={setLocalFormData}
                      localFormData={localFormData}
                    />
                  )}
                </div>
              </li>

              {/* Do you have financial concerns */}
              <li class="list-group-item">
                <div className="form-check-inline">
                  <span>Do you have financial concern</span>
                  <input
                    className="form-check-input ms-2"
                    type="radio"
                    name="financialConcernsSel"
                    value="Yes"
                    checked={localFormData.financialConcernsSel === "Yes"}
                    onChange={handleFinancial}
                    required
                  />
                  <label className="form-check-label ms-1">Yes</label>
                  <input
                    className="form-check-input ms-2"
                    type="radio"
                    name="financialConcernsSel"
                    value="No"
                    checked={localFormData.financialConcernsSel === "No"}
                    onChange={handleFinancial}
                    required
                  />
                  <label className="form-check-label ms-1">No</label>
                  {showFinancial && (
                    <FinancialYes
                      setLocalFormData={setLocalFormData}
                      localFormData={localFormData}
                    />
                  )}
                </div>
              </li>

              {/* Military */}
              <li class="list-group-item">
                <div className="form-check-inline">
                  <span>Are you currently in the military?</span>
                  <input
                    className="form-check-input ms-2"
                    type="radio"
                    name="MilitarySel"
                    value="Yes"
                    checked={localFormData.MilitarySel === "Yes"}
                    onChange={handleMilitaryStatus}
                    required
                  />
                  <label className="form-check-label ms-1">Yes</label>
                  <input
                    className="form-check-input ms-2"
                    type="radio"
                    name="MilitarySel"
                    value="No"
                    checked={localFormData.MilitarySel === "No"}
                    onChange={handleMilitaryStatus}
                    required
                  />
                  <label className="form-check-label ms-1">No</label>
                </div>
                {renderComponent()}
              </li>

              {/* Highest Education */}
              <li class="list-group-item">
                <div className="form-check-inline">
                  <span>Highest level of education:</span>
                  <div class="form-check-inline">
                    <input
                      className="form-check-input ms-2"
                      type="radio"
                      name="EducationSel"
                      value="High School"
                      checked={localFormData.EducationSel === "High School"}
                      onChange={handleEducation}
                      required
                    />
                    <label className="form-check-label ms-1">Highschool</label>
                    <input
                      className="form-check-input ms-2"
                      type="radio"
                      name="EducationSel"
                      value="Senior High School"
                      checked={
                        localFormData.EducationSel === "Senior High School"
                      }
                      onChange={handleEducation}
                      required
                    />
                    <label className="form-check-label ms-1">
                      Senior Highschool
                    </label>
                    <input
                      className="form-check-input ms-2"
                      type="radio"
                      name="EducationSel"
                      value="Bachelor's Degree"
                      checked={
                        localFormData.EducationSel === "Bachelor's Degree"
                      }
                      onChange={handleEducation}
                      required
                    />
                    <label className="form-check-label ms-1">
                      Bachelor's Degree
                    </label>
                    <input
                      className="form-check-input ms-2"
                      type="radio"
                      name="EducationSel"
                      value="Master's Degree"
                      checked={localFormData.EducationSel === "Master's Degree"}
                      onChange={handleEducation}
                      required
                    />
                    <label className="form-check-label ms-1">
                      Master's Degree
                    </label>
                    <input
                      className="form-check-input ms-2"
                      type="radio"
                      name="EducationSel"
                      value="Doctoral"
                      checked={localFormData.EducationSel === "Doctoral"}
                      onChange={handleEducation}
                      required
                    />
                    <label className="form-check-label ms-1">
                      Doctor's Degree
                    </label>
                  </div>
                </div>
              </li>

              {/* Legal Concerns */}
              <li class="list-group-item">
                <div className="form-check-inline">
                  <span>Do you have any legal concerns:</span>
                  <input
                    className="form-check-input ms-2"
                    type="radio"
                    name="legalConcernsSel"
                    value="Yes"
                    checked={localFormData.legalConcernsSel === "Yes"}
                    onChange={handleLegal}
                    required
                  />
                  <label className="form-check-label ms-1">Yes</label>
                  <input
                    className="form-check-input ms-2"
                    type="radio"
                    name="legalConcernsSel"
                    value="No"
                    checked={localFormData.legalConcernsSel === "No"}
                    onChange={handleLegal}
                    required
                  />
                  <label className="form-check-label ms-1">No</label>
                  {showLegal && (
                    <LegalYes
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
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

const EmployedYes = ({ setLocalFormData, localFormData }) => {
  const [getEmployed, setEmployed] = useState();
  const handleEmployed = (e) => {
    setEmployed(e.target.value);
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      <span className="me-2 d-flex align-items-center">
        Who is your current employer/position?
      </span>
      <div class="input-group">
        <input
          type="text"
          class="form-control rounded-4 me-2"
          name="Employer"
          placeholder="Answer:"
          pattern="^[a-zA-Z0-9]+$"
          value={localFormData.Employer}
          onChange={handleEmployed}
          required
        />
        <label className="form-check-label ms-1">Yes</label>
        <input
          type="text"
          class="form-control rounded-4 me-1"
          placeholder="Answer:"
          pattern="^[a-zA-Z0-9]+$"
          name="CurrPos"
          value={localFormData.CurrPos}
          onChange={handleEmployed}
          required
        />
      </div>
      <span className="me-2 d-flex align-items-center">
        Please list any work-related stressors if any:
      </span>
      <div class="input-group">
        <div class="form-floating">
          <textarea
            class="form-control rounded-4"
            placeholder="Answer:"
            pattern="^[a-zA-Z0-9]+$"
            id="floatingTextarea1"
            name="Stressors"
            style={{ height: 70 + "px", width: 45 + "rem" }}
            value={localFormData.Stressors}
            onChange={handleEmployed}
            required
          />
          <label for="floatingTextarea1">Answer:</label>
        </div>
      </div>
    </>
  );
};

const FinancialYes = ({ setLocalFormData, localFormData }) => {
  const [getFinancial, setFinancial] = useState();
  const handleFinancial = (e) => {
    setFinancial(e.target.value);
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      <div class="input-group">
        <span className="me-2 d-flex align-items-center">Please explain:</span>
        <div class="form-floating">
          <textarea
            class="form-control rounded-4"
            placeholder="Answer:"
            id="floatingTextarea1"
            name="FinExp"
            style={{ height: 70 + "px", width: 30 + "rem" }}
            value={localFormData.FinExp}
            onChange={handleFinancial}
            required
          />
          <label for="floatingTextarea1">Answer:</label>
        </div>
      </div>
    </>
  );
};

const MilitaryYes = ({ setLocalFormData, localFormData }) => {
  const [getMilitaryYes, setMilitaryYes] = useState(true);
  const dateSinceWhen = useRef(null);
  const handleSinceWhen = (e) => {
    setMilitaryYes(e.target.value === "Yes");
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      <div class="input-group mt-2">
        <span class="d-flex align-items-center me-2">Since when?</span>
        <input
          className="form-control  rounded-4 me-1"
          type="date"
          day
          name="MilYesStart"
          value={localFormData.MilYesStart}
          ref={dateSinceWhen}
          onChange={handleSinceWhen}
          required
        />
      </div>
    </>
  );
};

const MilitaryNo = ({ setLocalFormData, localFormData }) => {
  const [showMilitaryNo, setMilitaryNo] = useState(false);
  const datePrevious = useRef(null);
  const handleMilitaryNo = (e) => {
    setMilitaryNo(e.target.value === "Yes");
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      <div>
        <span>Previously?</span>
        <input
          className="form-check-input ms-2"
          type="radio"
          name="militaryNo"
          value="Yes"
          checked={localFormData.militaryNo === "Yes"}
          onChange={handleMilitaryNo}
          required
        />
        <label className="form-check-label ms-1">Yes</label>
        <input
          className="form-check-input ms-2"
          type="radio"
          name="militaryNo"
          value="No"
          checked={localFormData.militaryNo === "No"}
          onChange={handleMilitaryNo}
          required
        />
        <label className="form-check-label ms-1">No</label>
        {showMilitaryNo && (
          <PreviouslyNo
            setLocalFormData={setLocalFormData}
            localFormData={localFormData}
          />
        )}
      </div>
    </>
  );
};

const PreviouslyNo = ({ setLocalFormData, localFormData }) => {
  const [getPreviously, setPreviously] = useState();
  const datePreviously = useRef(null);
  const handlePreviously = (e) => {
    setPreviously(e.target.value);
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      <div class="input-group">
        <span class="d-flex align-items-center me-2">Start: </span>
        <input
          className="form-control  rounded-4 me-1"
          type="date"
          day
          name="PrevMilStart"
          value={localFormData.PrevMilStart}
          ref={datePreviously}
          onChange={handlePreviously}
          required
        />
        <span class="d-flex align-items-center me-2">End: </span>
        <input
          className="form-control  rounded-4 me-1"
          type="date"
          day
          name="PrevMilEnd"
          value={localFormData.PrevMilEnd}
          ref={datePreviously}
          onChange={handlePreviously}
          required
        />
      </div>
    </>
  );
};

const LegalYes = ({ setLocalFormData, localFormData }) => {
  const [getLegal, setLegal] = useState();
  const handleLegal = (e) => {
    setLegal(e.target.value);
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      <div class="input-group">
        <span className="me-2 d-flex align-items-center">Please explain:</span>
        <div class="form-floating">
          <textarea
            class="form-control rounded-4"
            placeholder="Answer:"
            pattern="^[a-zA-Z0-9]+$"
            name="LegalExp"
            value={localFormData.LegalExp}
            id="floatingTextarea1"
            style={{ height: 70 + "px", width: 30 + "rem" }}
            onChange={handleLegal}
            required
          />
          <label for="floatingTextarea1">Answer:</label>
        </div>
      </div>
    </>
  );
};
