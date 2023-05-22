import { useState } from "react";
export const CardSix = ({ ButtonBack, ButtonNext }) => {
  const [getCurrentPhysicalHealth, setCurrentPhysicalHealth] = useState(``);
  const handleCurrentPhysicalHealth = (e) => {
    setCurrentPhysicalHealth(e.target.value);
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
                  className="form-check-input ms-2"
                  type="radio"
                  name="currentPhysicalHealth"
                  value="Good"
                  onChange={handleCurrentPhysicalHealth}
                />
                <label className="form-check-label ms-1">Good</label>
                <input
                  className="form-check-input ms-2"
                  type="radio"
                  name="currentPhysicalHealth"
                  value="Very Good"
                  onChange={handleCurrentPhysicalHealth}
                />
                <label className="form-check-label ms-1">Very Good</label>
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
