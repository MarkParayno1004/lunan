import { useState } from "react";
export const CardTwelve = ({ ButtonBack, ButtonNext }) => {
  const [difficulty, setDifficulty] = useState({
    depression: false,
    bipolarDisorder: false,
    anxietyDisorder: false,
    panicAttacks: false,
    schizophrenia: false,
    alcoholOrSubstanceAbuse: false,
    eatingDisorder: false,
    learningDisability: false,
    traumaHistory: false,
    suicideAttempts: false,
    psychiatricHospitalization: false,
  });
  const handleDifficulty = (event) => {
    const { name, value } = event.target;
    const updatedDifficulty = { ...difficulty };
    updatedDifficulty[name] = value === "yes";
    setDifficulty(updatedDifficulty);
  };
  return (
    <div>
      <div className="container-fluid d-flex justify-content-center mt-3">
        <div className="card" style={{ width: 50 + "rem" }}>
          <div className="card-header">
            Has anyone in your family (either immediate family members or
            relatives) experienced difficulties with the following? (circle any
            that apply and list family member, e.g., Sibling, Parent, Uncle,
            etc.):
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <div className="form-check form-check-inline">
                <span>Depression</span>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="depression"
                  value="yes"
                  checked={difficulty.depression}
                  onChange={handleDifficulty}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="depression"
                  value="no"
                  checked={difficulty.depression}
                  onChange={handleDifficulty}
                />
                <label className="form-check-label ms-1">No</label>
                {difficulty.depression && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Family Member(s)
                    </span>
                    <input
                      type="text"
                      className="form-control rounded-4 me-1"
                      name="depression_name"
                      required
                    />
                  </div>
                )}
              </div>
            </li>
            <li className="list-group-item">
              <div className="form-check form-check-inline">
                <span>Bipolar Disorder</span>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="bipolarDisorder"
                  value="yes"
                  checked={difficulty.bipolarDisorder}
                  onChange={handleDifficulty}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="bipolarDisorder"
                  value="no"
                  checked={difficulty.bipolarDisorder}
                  onChange={handleDifficulty}
                />
                <label className="form-check-label ms-1">No</label>
                {difficulty.bipolarDisorder && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Family Member(s)
                    </span>
                    <input
                      type="text"
                      className="form-control rounded-4 me-1"
                      name="bipolar_name"
                      required
                    />
                  </div>
                )}
              </div>
            </li>
            <li className="list-group-item">
              <div className="form-check form-check-inline">
                <span>Anxiety Disorder</span>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="anxietyDisorder"
                  value="yes"
                  checked={difficulty.anxietyDisorder}
                  onChange={handleDifficulty}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="anxietyDisorder"
                  value="no"
                  checked={difficulty.anxietyDisorder}
                  onChange={handleDifficulty}
                />
                <label className="form-check-label ms-1">No</label>
                {difficulty.anxietyDisorder && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Family Member(s)
                    </span>
                    <input
                      type="text"
                      className="form-control rounded-4 me-1"
                      name="anxiety_name"
                      required
                    />
                  </div>
                )}
              </div>
            </li>
            <li className="list-group-item">
              <div className="form-check form-check-inline">
                <span>Panic Attacks</span>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="panicAttacks"
                  value="yes"
                  checked={difficulty.panicAttacks}
                  onChange={handleDifficulty}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="panicAttacks"
                  value="no"
                  checked={difficulty.panicAttacks}
                  onChange={handleDifficulty}
                />
                <label className="form-check-label ms-1">No</label>
                {difficulty.panicAttacks && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Family Member(s)
                    </span>
                    <input
                      type="text"
                      className="form-control rounded-4 me-1"
                      name="panic_name"
                      required
                    />
                  </div>
                )}
              </div>
            </li>
            <li className="list-group-item">
              <div className="form-check form-check-inline">
                <span>Schizophrenia</span>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="schizophrenia"
                  value="yes"
                  checked={difficulty.schizophrenia}
                  onChange={handleDifficulty}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="schizophrenia"
                  value="no"
                  checked={difficulty.schizophrenia}
                  onChange={handleDifficulty}
                />
                <label className="form-check-label ms-1">No</label>
                {difficulty.schizophrenia && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Family Member(s)
                    </span>
                    <input
                      type="text"
                      className="form-control rounded-4 me-1"
                      name="schizophrenia_name"
                      required
                    />
                  </div>
                )}
              </div>
            </li>
            <li className="list-group-item">
              <div className="form-check form-check-inline">
                <span>Alcohol/Substance Abuse</span>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="alcoholOrSubstanceAbuse"
                  value="yes"
                  checked={difficulty.alcoholOrSubstanceAbuse}
                  onChange={handleDifficulty}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="alcoholOrSubstanceAbuse"
                  value="no"
                  checked={difficulty.alcoholOrSubstanceAbuse}
                  onChange={handleDifficulty}
                />
                <label className="form-check-label ms-1">No</label>
                {difficulty.alcoholOrSubstanceAbuse && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Family Member(s)
                    </span>
                    <input
                      type="text"
                      className="form-control rounded-4 me-1"
                      name="alcoholOrSubstanceAbuse_name"
                      required
                    />
                  </div>
                )}
              </div>
            </li>
            <li className="list-group-item">
              <div className="form-check form-check-inline">
                <span>Eating Disorder</span>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="eatingDisorder"
                  value="yes"
                  checked={difficulty.eatingDisorder}
                  onChange={handleDifficulty}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="eatingDisorder"
                  value="no"
                  checked={difficulty.eatingDisorder}
                  onChange={handleDifficulty}
                />
                <label className="form-check-label ms-1">No</label>
                {difficulty.eatingDisorder && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Family Member(s)
                    </span>
                    <input
                      type="text"
                      className="form-control rounded-4 me-1"
                      name="eatingDisorder_name"
                      required
                    />
                  </div>
                )}
              </div>
            </li>
            <li className="list-group-item">
              <div className="form-check form-check-inline">
                <span>Learning Disability</span>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="learningDisability"
                  value="yes"
                  checked={difficulty.learningDisability}
                  onChange={handleDifficulty}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="learningDisability"
                  value="no"
                  checked={difficulty.learningDisability}
                  onChange={handleDifficulty}
                />
                <label className="form-check-label ms-1">No</label>
                {difficulty.learningDisability && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Family Member(s)
                    </span>
                    <input
                      type="text"
                      className="form-control rounded-4 me-1"
                      name="learningDisability_name"
                      required
                    />
                  </div>
                )}
              </div>
            </li>
            <li className="list-group-item">
              <div className="form-check form-check-inline">
                <span>Trauma History</span>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="traumaHistory"
                  value="yes"
                  checked={difficulty.traumaHistory}
                  onChange={handleDifficulty}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="traumaHistory"
                  value="no"
                  checked={difficulty.traumaHistory}
                  onChange={handleDifficulty}
                />
                <label className="form-check-label ms-1">No</label>
                {difficulty.traumaHistory && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Family Member(s)
                    </span>
                    <input
                      type="text"
                      className="form-control rounded-4 me-1"
                      name="traumaHistory_name"
                      required
                    />
                  </div>
                )}
              </div>
            </li>
            <li className="list-group-item">
              <div className="form-check form-check-inline">
                <span>Suicide Attempts</span>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="suicideAttempts"
                  value="yes"
                  checked={difficulty.suicideAttempts}
                  onChange={handleDifficulty}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="suicideAttempts"
                  value="no"
                  checked={difficulty.suicideAttempts}
                  onChange={handleDifficulty}
                />
                <label className="form-check-label ms-1">No</label>
                {difficulty.suicideAttempts && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Family Member(s)
                    </span>
                    <input
                      type="text"
                      className="form-control rounded-4 me-1"
                      name="suicideAttempts_name"
                      required
                    />
                  </div>
                )}
              </div>
            </li>
            <li className="list-group-item">
              <div className="form-check form-check-inline">
                <span>Psychiatric Hospitalization</span>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="psychiatricHospitalization"
                  value="yes"
                  checked={difficulty.psychiatricHospitalization}
                  onChange={handleDifficulty}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-check--input ms-2 rounded-5"
                  type="radio"
                  name="psychiatricHospitalization"
                  value="no"
                  checked={difficulty.psychiatricHospitalization}
                  onChange={handleDifficulty}
                />
                <label className="form-check-label ms-1">No</label>
                {difficulty.psychiatricHospitalization && (
                  <div className="input-group">
                    <span className="me-2 d-flex align-items-center">
                      Family Member(s)
                    </span>
                    <input
                      type="text"
                      className="form-control rounded-4 me-1"
                      name="psychiatricHospitalization_name"
                      required
                    />
                  </div>
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
          onClick={ButtonNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};
