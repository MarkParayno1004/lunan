import { useState } from "react";
export const CardTen = ({ ButtonBack, ButtonNext }) => {
    //! Radio Button for Are you Employed
    const [showEmployed, setEmployed] = useState(false);
    const handleEmployed = (e) => {
        setEmployed(e.target.value === "true");
    };

    //! Radio Button for Do you have financial concerns
    const [showFinancial, setFinancial] = useState(false);
    const handleFinancial = (e) => {
        setFinancial(e.target.value === "true");
    };

    //! Highest level of Education
    const [getEducation, setEducation] = useState("");
    const handleEducation = (e) => {
        setEducation(e.target.value);
    };

    const [getMilitary, setMilitary] = useState(false);
    const handleMilitary = (e) => {
        setMilitary(e.target.value === "true");
    };

    const [getPrevMilitary, setPrevMilitary] = useState(false);
    const handlePrevMilitary = (e) => {
        setPrevMilitary(e.target.value === "true");
    };

    //! Radio Button for Do you have any Legal Concerns
    const [showLegal, setLegal] = useState(false);
    const handleLegal = (e) => {
        setLegal(e.target.value === "true");
    };

    return (
        <div>
            <div className="container-fluid d-flex justify-content-center mt-3">
                <div class="card" style={{ width: 50 + "rem "}}>
                    <div class="card-header">
                        Occupational, Educational, Legal Information:
                    </div>
                    <ul class="list-group list-group-flush">

                        {/* Are you Employed */}
                        <li class="list-group-item">
                            <div className="form-check-inline">
                                <span>
                                    Are you Employed?
                                </span>
                                <input
                                    className="form-check-input ms-2"
                                    type="radio"
                                    name="employed"
                                    value="true"
                                    onChange={handleEmployed}
                                />
                                <label className="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check-input ms-2"
                                    type="radio"
                                    name="employed"
                                    value="false"
                                    onChange={handleEmployed}
                                />
                                <label className="form-check-label ms-1">No</label>
                                {showEmployed && <EmployedYes />}
                            </div>
                        </li>

                        {/* Do you have financial concerns */}
                        <li class="list-group-item">
                            <div className="form-check-inline">
                                <span>Do you have financial concern</span>
                                <input
                                    className="form-check-input ms-2"
                                    type="radio"
                                    name="financialConcerns"
                                    value="true"
                                    onChange={handleFinancial}
                                />
                                <label className="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check-input ms-2"
                                    type="radio"
                                    name="financialConcerns"
                                    value="false"
                                    onChange={handleFinancial}
                                />
                                <label className="form-check-label ms-1">No</label>
                                {showFinancial && <FinancialYes />}
                            </div>
                        </li>

                        {/* Military */}
                        <li class="list-group-item">
                            <div className="form-check-inline">
                                <span>Are you currently in the military?</span>
                                <input
                                    className="form-check-input ms-2"
                                    type="radio"
                                    name="military"
                                    value="true"
                                    onChange={handleMilitary}
                                />
                                <label className="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check-input ms-2"
                                    type="radio"
                                    name="military"
                                    value="false"
                                    onChange={handleMilitary}
                                />
                                <label className="form-check-label ms-1">No</label>
                                <br></br>
                                <span>Previously?</span>
                                <input
                                    className="form-check-input ms-2"
                                    type="radio"
                                    name="prevMilitary"
                                    value="true"
                                    onChange={handlePrevMilitary}
                                />
                                <label className="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check-input ms-2"
                                    type="radio"
                                    name="prevMilitary"
                                    value="false"
                                    onChange={handlePrevMilitary}
                                />
                                <label className="form-check-label ms-1">No</label>
                            </div>
                        </li>

                        {/* Highest Education */}
                        <li class="list-group-item">
                            <div className="form-check-inline">
                                <span>Highest level of education:</span>
                                <input
                                    type="text"
                                    class="form-control rounded-4 me-1"
                                    onChange={handleEducation}
                                />
                            </div>
                        </li>

                        {/* Legal Concerns */}
                        <li class="list-group-item">
                            <div className="form-check-inline">
                                <span>Do you have any legal concerns:</span>
                                <input
                                    className="form-check-input ms-2"
                                    type="radio"
                                    name="legalConcerns"
                                    value="true"
                                    onChange={handleLegal}
                                />
                                <label className="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check-input ms-2"
                                    type="radio"
                                    name="legalConcerns"
                                    value="false"
                                    onChange={handleLegal}
                                />
                                <label className="form-check-label ms-1">No</label>
                                {showLegal && <LegalYes />}
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

const EmployedYes = () => {
    const [getEmployed, setEmployed] = useState();
    const handleEmployed = (e) => {
        setEmployed(e.target.value);
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
                    placeholder="Answer:"
                    onChange={handleEmployed}
                />
            </div>
            <span className="me-2 d-flex align-items-center">
                Are you happy with your current position?
            </span>
            <div class="input-group">
                <input
                    type="text"
                    class="form-control rounded-4 me-1"
                    placeholder="Answer:"
                    onChange={handleEmployed}
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
                        id="floatingTextarea1"
                        style={{ height: 70 + "px", width: 45 + "rem" }}
                        onChange={handleEmployed}
                    ></textarea>
                    <label for="floatingTextarea1">Answer:</label>
                </div>
            </div>
        </>
    );
};

const FinancialYes = () => {
    const [getFinancial, setFinancial] = useState();
    const handleFinancial = (e) => {
        setFinancial(e.target.value);
    };
    return (
        <>
            <div class="input-group">
                <span className="me-2 d-flex align-items-center">
                    Please explain:
                </span>
                <div class="form-floating">
                    <textarea
                        class="form-control rounded-4"
                        placeholder="Answer:"
                        id="floatingTextarea1"
                        style={{ height: 70 + "px", width: 30 + "rem" }}
                        onChange={handleFinancial}
                    ></textarea>
                    <label for="floatingTextarea1">Answer:</label>
                </div>
            </div>
        </>
    );
};

const LegalYes = () => {
    const [getLegal, setLegal] = useState();
    const handleLegal = (e) => {
        setLegal(e.target.value);
    };
    return (
        <>
            <div class="input-group">
                <span className="me-2 d-flex align-items-center">
                    Please explain:
                </span>
                <div class="form-floating">
                    <textarea
                        class="form-control rounded-4"
                        placeholder="Answer:"
                        id="floatingTextarea1"
                        style={{ height: 70 + "px", width: 30 + "rem" }}
                        onChange={handleLegal}
                    ></textarea>
                    <label for="floatingTextarea1">Answer:</label>
                </div>
            </div>
        </>
    );
};