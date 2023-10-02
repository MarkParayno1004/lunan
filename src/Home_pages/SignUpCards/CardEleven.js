import { useState, useRef, useEffect } from "react";

export const CardEleven = ({ ButtonBack, ButtonNext, formData }) => {
  const [localFormData, setLocalFormData] = useState({
    ParentStatus: "",
    DivorceDate: "",
    DateDivorced: "",
    DateRemarried: "",
    DeceasedWho: "",
    AgeDeceased: "",
    SiblingsCount: "",
    siblingAge: "",
    familySupport: "",
    SupWhom: "",
  });

  useEffect(() => {
    setLocalFormData(
      formData ?? {
        ParentStatus: "",
        DivorceDate: "",
        DateDivorced: "",
        DateRemarried: "",
        DeceasedWho: "",
        AgeDeceased: "",
        SiblingsCount: "",
        siblingAge: "",
        familySupport: "",
        SupWhom: "",
      }
    );
  }, [formData]);
  const dateDivorcedInputRef = useRef(null);
  const handleParentStatus = (e) => {
    const { name, value } = e.target;
    const updateparentStatus = { ...localFormData };
    updateparentStatus[name] = value === "yes";
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [numberOfSiblings, setNumberOfSiblings] = useState();
  const handleNumberOfSiblings = (e) => {
    setNumberOfSiblings(e.target.value);
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [siblingAges, setSiblingAges] = useState();
  const handleSiblingAges = (e) => {
    setSiblingAges(e.target.value);
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [showFamilySupport, setFamilySupport] = useState(false);
  const handleFamilySupport = (e) => {
    setFamilySupport(e.target.value === "Yes");
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

  //! Conditional Statement for radio button Divorced and Deceased
  const renderComponent = () => {
    switch (showSelectedParentStatus) {
      case "Divorced":
        return (
          <DivorcedYes
            setLocalFormData={setLocalFormData}
            localFormData={localFormData}
          />
        );
      case "Deceased":
        return (
          <DeceasedYes
            setLocalFormData={setLocalFormData}
            localFormData={localFormData}
          />
        );
      case "Remarried":
        return (
          <RemarriedYes
            setLocalFormData={setLocalFormData}
            localFormData={localFormData}
          />
        );

      default:
        return null;
    }
  };

  //! Get Parent Status
  const [showSelectedParentStatus, setSelectedParentStatus] = useState(null);

  const handleSelectedParentStatus = (event) => {
    setSelectedParentStatus(event.target.value);
    const { name, value } = event.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleNext}>
        <div className="container-fluid d-flex justify-content-center">
          <div className="card" style={{ width: 60 + "rem" }}>
            <div className="card-header">Family History:</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                {/* Parent Status */}
                <span className="me-2 d-flex align-items-center">
                  Are your parents:
                </span>
                <div className="form-check-inline">
                  <input
                    name="ParentStatus"
                    type="radio"
                    className="form-input ms-2"
                    value="Still Together"
                    checked={localFormData.ParentStatus === "Still Together"}
                    onChange={handleSelectedParentStatus}
                    required
                  />
                  <label className="form-check-label ms-1">
                    Still together
                  </label>
                  <input
                    name="ParentStatus"
                    type="radio"
                    className="form-input ms-2"
                    value="Divorced"
                    checked={localFormData.ParentStatus === "Divorced"}
                    onChange={handleSelectedParentStatus}
                    required
                  />
                  <label className="form-check-label ms-1">Divorced</label>
                  <input
                    name="ParentStatus"
                    type="radio"
                    className="form-input ms-2"
                    value="Remarried"
                    checked={localFormData.ParentStatus === "Remarried"}
                    onChange={handleSelectedParentStatus}
                    required
                  />
                  <label className="form-check-label ms-1">Remarried</label>
                  <input
                    name="ParentStatus"
                    type="radio"
                    className="form-input ms-2"
                    value="Unmarried"
                    checked={localFormData.ParentStatus === "Unmarried"}
                    onChange={handleSelectedParentStatus}
                    required
                  />
                  <label className="form-check-label ms-1">Unmarried</label>
                  <input
                    name="ParentStatus"
                    type="radio"
                    className="form-input ms-2"
                    value="Deceased"
                    checked={localFormData.ParentStatus === "Deceased"}
                    onChange={handleSelectedParentStatus}
                    required
                  />
                  <label className="form-check-label ms-1">Deceased</label>
                </div>
                {renderComponent()}
              </li>
              <li className="list-group-item">
                <div className="form-check-inline">
                  <span>Number of Siblings:</span>
                  <div className="d-inline-flex">
                    <input
                      type="number"
                      className="form-control ms-2 "
                      name="SiblingsCount"
                      value={localFormData.SiblingsCount}
                      min="0"
                      oninput="validity.valid||(value='');"
                      onChange={handleNumberOfSiblings}
                      required
                    />
                  </div>
                  <span className="ms-5">Ages:</span>
                  <div className="d-inline-flex">
                    <input
                      type="number"
                      className="form-control ms-2"
                      name="siblingAge"
                      value={localFormData.siblingAge}
                      min="0"
                      oninput="validity.valid||(value='');"
                      onChange={handleSiblingAges}
                      required
                    />
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="form-check-inline">
                  <span>Do you have good family support?</span>
                  <input
                    type="radio"
                    className="form-check-input ms-2"
                    name="familySupport"
                    value="Yes"
                    checked={localFormData.familySupport === "Yes"}
                    onChange={handleFamilySupport}
                    required
                  />
                  <label className="form-check-label ms-1">Yes</label>
                  <input
                    type="radio"
                    className="form-check-input ms-2"
                    name="familySupport"
                    value="No"
                    checked={localFormData.familySupport === "No"}
                    onChange={handleFamilySupport}
                    required
                  />
                  <label className="form-check-label ms-1">No</label>
                  {showFamilySupport && (
                    <SupportYes
                      setLocalFormData={setLocalFormData}
                      localFormData={localFormData}
                    />
                  )}
                </div>
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

const SupportYes = ({ setLocalFormData, localFormData }) => {
  const [getFamilySupport, setFamilySupport] = useState();
  const handleFamilySupport = (e) => {
    setFamilySupport(e.target.value);
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      <div className="input-group">
        <span className="me-2 d-flex align-items-center">From whom:</span>
        <input
          type="text"
          name="SupWhom"
          pattern="^[a-zA-Z0-9]+$"
          value={localFormData.SupWhom}
          class="form-control rounded-4 me-1"
          onChange={handleFamilySupport}
          required
        />
      </div>
    </>
  );
};

const DivorcedYes = ({ setLocalFormData, localFormData }) => {
  //!Date Input
  const [getWhenDateDivorced, setWhenDateDivorced] = useState("");
  const dateWhenDivorced = useRef(null);
  const handleDateWhen = (e) => {
    setWhenDateDivorced(e.target.value);
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="input-group mt-2">
      <span className="d-flex align-items-center me-2">When:</span>
      <input
        type="date"
        className="form-control  rounded-4 me-1"
        day
        name="DivorceDate"
        value={localFormData.DivorceDate}
        ref={dateWhenDivorced}
        onChange={handleDateWhen}
        style={{ width: 20 + "px" }}
        required
      />
    </div>
  );
};

const RemarriedYes = ({ setLocalFormData, localFormData }) => {
  const [getRemarried, setRemarried] = useState("");
  const dateRemarried = useRef(null);
  const handleRemarried = (e) => {
    setRemarried(e.target.value);
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      <div class="input-group">
        <span class="d-flex align-items-center me-2">Divorced:</span>
        <input
          className="form-control  rounded-4 me-1"
          type="date"
          day
          name="DateDivorced"
          ref={dateRemarried}
          value={localFormData.DateRemarried}
          onChange={handleRemarried}
          required
        />
        <span class="d-flex align-items-center me-2">Remarried:</span>
        <input
          className="form-control  rounded-4 me-1"
          type="date"
          day
          name="DateRemarried"
          ref={dateRemarried}
          value={localFormData.DateRemarried}
          onChange={handleRemarried}
          required
        />
      </div>
    </>
  );
};

const DeceasedYes = ({ setLocalFormData, localFormData }) => {
  return (
    <>
      <div class="input-group mt-1">
        <span class="d-flex align-items-center">if yes whom?</span>
        <input
          type="text"
          name="DeceasedWho"
          pattern="^[a-zA-Z0-9]+$"
          value={localFormData.DeceasedWho}
          class="form-control rounded-4 ms-1"
          required
        />
        <span class="d-flex align-items-center ms-1">
          Your age when they died?
        </span>
        <input
          type="number"
          name="AgeDeceased "
          value={localFormData.AgeDeceased}
          min="0"
          oninput="validity.valid||(value='');"
          class="form-control rounded-4 ms-1"
          required
        />
      </div>
    </>
  );
};
