import { useState } from "react";
export const CardSeven = ({ ButtonBack, ButtonNext }) => {
    //! Radio Button for Do you Smoke
    const [showSmoke, setSmoke] = useState("false");
    const handleSmoke = (e) => {
        setSmoke(e.target.value === "true");
    };

    //! Radio Button for Do you drink Caffeinated Drinks
    const [showCaffeinatedDrinks, setCaffeinatedDrinks] = useState("false");
    const handleCaffeinatedDrinks = (e) => {
        setCaffeinatedDrinks(e.target.value === "true");
    };

    //! Radio Button for Have you ever had a Head Injury
    const [showHeadInjury, setHeadInjury] = useState("false");
    const handleHeadInjury = (e) => {
        setHeadInjury(e.target.value === "true");
    };

    //! Changes or Stressors
    const [getChangesorStressors, setChangesorStressors] = useState('');
    const handleChangesorStressors = (e) => {
        setChangesorStressors(e.target.value);
    };
    
    return (
        <div>
            <div className="container-fluid d-flex justify-content-center mt-3">
                <div className="card" style={{width: 50 + "rem"}}>
                    <div class="card-header">Health Information</div>
                    <ul class="list-group list-group-flush">
                        {/* Health Information */}
                        <li class="list-group-item">
                            <div className="form-check-inline">
                                <span>
                                    Do you Smoke?
                                </span>
                                <input
                                    className="form-check-input ms-2 rounded-5"
                                    type="radio"
                                    name="Smoke"
                                    value="true"
                                    onChange={handleSmoke}
                                />
                                <label className="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check-input ms-2 rounded-5"
                                    type="radio"
                                    name="Smoke"
                                    value="false"
                                    onChange={handleSmoke}
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
                                    className="form-check-input ms-2 rounded-5"
                                    type="radio"
                                    name="CaffeinatedDrinks"
                                    value="true"
                                    onChange={handleCaffeinatedDrinks}
                                />
                                <label className="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check-input ms-2 rounded-5"
                                    type="radio"
                                    name="CaffeinatedDrinks"
                                    value="false"
                                    onChange={handleCaffeinatedDrinks}
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
                                    className="form-check-input ms-2 rounded-5"
                                    type="radio"
                                    name="HeadInjury"
                                    value="true"
                                    onChange={handleHeadInjury}
                                />
                                <label class="form-check-label ms-1">Yes</label>
                                <input
                                    className="form-check-input ms-2 rounded-5"
                                    type="radio"
                                    name="HeadInjury"
                                    value="false"
                                    onChange={handleHeadInjury}
                                />
                                <label class="form-check-label ms-1">No</label>
                                {showHeadInjury && <HeadInjuryYes />}
                            </div>
                        </li>
                        {/* Experience any significant changes or stressors */}
                        <li class="list-group-item">
                            <div className="form-check-inline">
                                <span>
                                    In the last year, have you ever experienced any significant changes or stressors?
                                </span>
                                <textarea
                                    class="form-control rounded-4"
                                    placeholder="Answer: "
                                    id="floatingTextarea2"
                                    style={{ height: 70 + "px", width: 45 + "rem"}}
                                    onChange={handleChangesorStressors}
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
    const [getSmoke, setSmoke] = useState();
    const handleSmoke = (e) => {
        setSmoke(e.target.value);
    };
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
                    onChange={handleSmoke}
                />
            </div>
        </>
    );
};

const CaffeinatedDrinksYes = () => {
    const [getSodas, setSodas] = useState();
    const handleSodas = (e) => {
        setSodas(e.target.value);
    };

    const [getCoffee, setCoffee] = useState();
    const handleCoffee = (e) => {
        setCoffee(e.target.value);
    };
    return (
        <>
            <div class="input-group">
                <span className="me-2 d-flex align-items-center">
                    If yes, # of sodas per day
                </span>
                <input
                    type="number"
                    placeholder="Answer: "
                    class="form-control me-3 rounded-4"
                    onChange={handleSodas}
                />
                <span class="me-2 d-flex align-items-center">cups of coffee per day</span>
                <input
                    type="number"
                    placeholder="Answer: "
                    class="form-control me-3 rounded-4"
                    onChange={handleCoffee}
                />
            </div>
        </>
    );
};

const HeadInjuryYes = () => {
    const [getHeadache, setHeadache] = useState();
    const handleHeadache = (e) => {
        setHeadache(e.target.value);
    };
    return (
        <div class="input-group mt-1">
          <span class="d-flex align-items-center me-2">If yes, when and what happened? </span>
          <div class="form-floating">
            <textarea
              class="form-control rounded-4"
              placeholder="Answer:"
              id="floatingTextarea1"
              style={{ height: 70 + "px", width: 20 + "rem" }}
              onChange={handleHeadache}
            ></textarea>
            <label for="floatingTextarea1">Answer:</label>
          </div>
        </div>
    );
};
 