import { useState } from "react";
import { useRef } from "react";
export const CardEleven = ({ ButtonBack, ButtonNext }) => {
  const [parentStatus, setParentStatus] = useState({
    stillTogether: false,
    divorced: false,
    remarried: false,
    unmarried: false,
    deceased: false,
  });
  const dateDivorcedInputRef = useRef(null);
  const handleParentStatus = (e) => {
    const { name, value } = e.target;
    const updateparentStatus = { ...parentStatus };
    updateparentStatus[name] = value === "yes";
    setParentStatus(updateparentStatus);
  };

  const [numberOfSiblings, setNumberOfSiblings] = useState();
  const handleNumberOfSiblings = (e) => {
    setNumberOfSiblings(e.target.value);
  };

  const [siblingAges, setSiblingAges] = useState();
  const handleSiblingAges = (e) => {
    setSiblingAges(e.target.value);
  };

  const [showFamilySupport, setFamilySupport] = useState(false);
  const handleFamilySupport = (e) => {
    setFamilySupport(e.target.value === "true");
  };

  //! Conditional Statement for radio button Divorced and Deceased
  const renderComponent = () => {
    switch (showSelectedParentStatus) {
      case "Divorced":
        return <DivorcedYes />;
      case "Deceased":
        return <DeceasedYes />;

      default:
        return null;
    }
  };

  //! Get Parent Status
  const [showSelectedParentStatus, setSelectedParentStatus] = useState(null);

  const handleSelectedParentStatus = (event) => {
    setSelectedParentStatus(event.target.value);
  };

  return (
    <div>
      <div className="container-fluid d-flex justify-content-center mt-3">
        <div className="card" style={{ width: 50 + "rem" }}>
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
                  value="Stilltogether"
                  checked={showSelectedParentStatus === "Stilltogether"}
                  onChange={handleSelectedParentStatus}
                />
                <label className="form-check-label ms-1">Still together</label>
                <input
                  name="ParentStatus"
                  type="radio"
                  className="form-input ms-2"
                  value="Divorced"
                  checked={showSelectedParentStatus === "Divorced"}
                  onChange={handleSelectedParentStatus}
                />
                <label className="form-check-label ms-1">Divorced</label>
                <input
                  name="ParentStatus"
                  type="radio"
                  className="form-input ms-2"
                  value="Remarried"
                  checked={showSelectedParentStatus === "Remarried"}
                  onChange={handleSelectedParentStatus}
                />
                <label className="form-check-label ms-1">Remarried</label>
                <input
                  name="ParentStatus"
                  type="radio"
                  className="form-input ms-2"
                  value="Unmarried"
                  checked={showSelectedParentStatus === "Unmarried"}
                  onChange={handleSelectedParentStatus}
                />
                <label className="form-check-label ms-1">Unmarried</label>
                <input
                  name="ParentStatus"
                  type="radio"
                  className="form-input ms-2"
                  value="Deceased"
                  checked={showSelectedParentStatus === "Deceased"}
                  onChange={handleSelectedParentStatus}
                />
                <label className="form-check-label ms-1">Deceased</label>
              </div>
              {renderComponent()}
            </li>
            <li className="list-group-item">
              <div className="form-check-inline">
                <span>Number of Siblings:</span>
                <input
                  type="number"
                  className="form-control ms-2"
                  name="siblings"
                  value="siblings"
                  onChange={handleNumberOfSiblings}
                />
                <span>Ages:</span>
                <input
                  type="number"
                  className="form-control ms-2"
                  name="siblingAge"
                  value="siblingAge"
                  onChange={handleSiblingAges}
                />
              </div>
            </li>
            <li className="list-group-item">
              <div className="form-check-inline">
                <span>Do you have good family support?</span>
                <input
                  type="radio"
                  className="form-check-input ms-2"
                  name="familySupport"
                  value="true"
                  onChange={handleFamilySupport}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  type="radio"
                  className="form-check-input ms-2"
                  name="familySupport"
                  value="false"
                  onChange={handleFamilySupport}
                />
                <label className="form-check-label ms-1">No</label>
                {showFamilySupport && <SupportYes />}
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

const SupportYes = () => {
  const [getFamilySupport, setFamilySupport] = useState();
  const handleFamilySupport = (e) => {
    setFamilySupport(e.target.value);
  };
  return (
    <>
      <div className="input-group">
        <span className="me-2 d-flex align-items-center">From whom:</span>
        <input
          type="text"
          className="form-control rounded-4 me-1"
          onChange={handleFamilySupport}
        />
      </div>
    </>
  );
};

const DivorcedYes = () => {
  //!Date Input
  const [getWhenDateDivorced, setWhenDateDivorced] = useState("");
  const dateWhenDivorced = useRef(null);
  const handleDateWhen = (e) => {
    setWhenDateDivorced(e.target.value);
  };
  return (
    <div className="input-group mt-2">
      <span className="d-flex align-items-center me-2">When:</span>
      <input
        type="date"
        className="form-control  rounded-4 me-1"
        day
        ref={dateWhenDivorced}
        onChange={handleDateWhen}
        style={{ width: 20 + "px" }}
      />
    </div>
  );
};

const DeceasedYes = () => {
  return (
    <>
      <div className="input-group mt-1">
        <span className="d-flex align-items-center">if yes whom?</span>
        <input type="text" className="form-control rounded-4 ms-1" />
        <span className="d-flex align-items-center ms-1">age at death?</span>
        <input type="number" className="form-control rounded-4 ms-1" />
      </div>
    </>
  );
};
