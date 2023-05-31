import { useState, useEffect } from "react";
export const CardSeven = ({ ButtonBack, ButtonNext, formData }) => {
  const [localFormData, setLocalFormData] = useState({
    SmokeSel: "",
    CiggDaily: "",
    CaffDrinkSel: "",
    HeadInjurySel:"",
    SignChanSel:"",
    SodasPerDay:"",
    CoffeePerDay:"",
    HeadInjDef:"",
    ChangesDef:"",
  });

  useEffect(() => {
    setLocalFormData(
      formData ?? {
        SmokeSel: "",
        CiggDaily: "",
        CaffDrinkSel: "",
        HeadInjurySel:"",
        SignChanSel:"",
        SodasPerDay:"",
        CoffeePerDay:"",
        HeadInjDef:"",
        ChangesDef:"",
      }
    );
  }, [formData]);

    //! Radio Button for Do you Smoke
    const [showSmoke, setSmoke] = useState(false);
    // const handleSmoke = (e) => {
    //     setSmoke(e.target.value === "true");
    // };

    //! Radio Button for Do you drink Caffeinated Drinks
    const [showCaffeinatedDrinks, setCaffeinatedDrinks] = useState(false);
    // const handleCaffeinatedDrinks = (e) => {
    //     setCaffeinatedDrinks(e.target.value === "No");
    // };

    //! Radio Button for Have you ever had a Head Injury
    const [showHeadInjury, setHeadInjury] = useState(false);
    const handleHeadInjury = (e) => {
        setHeadInjury(e.target.value === "Yes");
    };


  //! Changes or Stressors
  const [getChangesorStressors, setChangesorStressors] = useState("");

  //! Radio Button for any significat change or stressors
  const [showSignificantChanges, setSignificantChanges] = useState("");

  const handleNext = () => {
    console.log(localFormData); // Log form data
    ButtonNext(localFormData); // Call the ButtonNext function with form data
  };

  return (
    <div>
      <div className="container-fluid d-flex justify-content-center mt-3">
        <div className="card" style={{ width: 50 + "rem" }}>
          <div class="card-header">Health Information</div>
          <ul class="list-group list-group-flush">
            {/* Health Information */}
            <li class="list-group-item">
              <div className="form-check-inline">
                <span>Do you Smoke?</span>
                <input
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="SmokeSel"
                  value="Yes"
                  checked={localFormData.SmokeSel === "Yes"}
                  onChange={(e) => {
                    setSmoke(e.target.value);
                    const { name, value } = e.target;
                    setLocalFormData((prevData) => ({
                      ...prevData,
                      [name]: value,
                    }));
                  }}
                />
                <label className="form-check-label ms-1">Yes</label>
                <input
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="SmokeSel"
                  value="No"
                  checked={localFormData.SmokeSel === "No"}
                  onChange={(e) => {
                    setSmoke(e.target.value);
                    const { name, value } = e.target;
                    setLocalFormData((prevData) => ({
                      ...prevData,
                      [name]: value,
                    }));
                  }}
                />

                <label className="form-check-label ms-1">No</label>
                {showSmoke === "Yes" && <SmokeYes setLocalFormData={setLocalFormData} localFormData={localFormData} />}
              </div>
            </li>

            {/* Do you drink Caffeinated Drinks? */}
            <li class="list-group-item">
              <div className="form-check-inline">
                <span>Do you drink Caffeinated Drinks?</span>
                <input
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="CaffDrinkSel"
                  value="Yes"
                  checked={localFormData.CaffDrinkSel === "Yes"}
                  onChange={(e) => {
                    setCaffeinatedDrinks(e.target.value);
                    const { name, value } = e.target;
                    setLocalFormData((prevData) => ({
                      ...prevData,
                      [name]: value,
                    }));
                  }}
                />
                <label className="form-check-label ms-1">Yes</label>

                <input
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="CaffDrinkSel"
                  value="No"
                  checked={localFormData.CaffDrinkSel === "No"}
                  onChange={(e) => {
                    setCaffeinatedDrinks(e.target.value === "No");
                    const { name, value } = e.target;
                    setLocalFormData((prevData) => ({
                      ...prevData,
                      [name]: value,
                    }));
                  }}
                />
                <label className="form-check-label ms-1">No</label>

                {showCaffeinatedDrinks === "Yes" && <CaffeinatedDrinksYes setLocalFormData={setLocalFormData} localFormData={localFormData} />}
              </div>
            </li>

            {/* Head Injury */}
            <li class="list-group-item">
              <div className="form-check-inline">
                <span>Have you ever had any Head Injury?</span>
                <input
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="HeadInjurySel"
                  value="Yes"
                  checked={localFormData.HeadInjurySel === "Yes"}
                  onChange={(e) => {
                    setHeadInjury(e.target.value === "Yes");
                    const { name, value } = e.target;
                    setLocalFormData((prevData) => ({
                      ...prevData,
                      [name]: value,
                    }));
                  }}
                />
                <label class="form-check-label ms-1">Yes</label>


                <input
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="HeadInjurySel"
                  value="No"
                  checked={localFormData.HeadInjurySel === "No"}
                  onChange={(e) => {
                    setHeadInjury(e.target.value === "Yes");
                    const { name, value } = e.target;
                    setLocalFormData((prevData) => ({
                      ...prevData,
                      [name]: value,
                    }));
                  }}
                />
                <label class="form-check-label ms-1">No</label>
                {showHeadInjury && <HeadInjuryYes setLocalFormData={setLocalFormData} localFormData={localFormData} />}
              </div>
            </li>
            {/* Experience any significant changes or stressors */}
            <li class="list-group-item">
              <div className="form-check-inline">
                <span>
                  In the last year, have you ever experienced any significant
                  changes or stressors?
                </span>
                <input
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="SignChanSel"
                  value="Yes"
                  checked={localFormData.SignChanSel === "Yes"}
                  onChange={(e) => {
                    setSignificantChanges(e.target.value === "Yes");
                    const { name, value } = e.target;
                    setLocalFormData((prevData) => ({
                      ...prevData,
                      [name]: value,
                    }));
                  }}
                />
                <label class="form-check-label ms-1">Yes</label>

                <input
                  className="form-input ms-2 rounded-5"
                  type="radio"
                  name="SignChanSel"
                  value="No"
                  checked={localFormData.SignChanSel === "No"}
                  onChange={(e) => {
                    setSignificantChanges(e.target.value === "Yes");
                    const { name, value } = e.target;
                    setLocalFormData((prevData) => ({
                      ...prevData,
                      [name]: value,
                    }));
                  }}
                />
                <label class="form-check-label ms-1">No</label>
                {showSignificantChanges && (
                  <>
                    <textarea
                      class="form-control rounded-4"
                      placeholder="Answer: "
                      id="floatingTextarea2"
                      name="ChangesDef"
                      value={localFormData.ChangesDef || ""}
                      style={{ height: 70 + "px", width: 45 + "rem" }}
                      onChange={(e) => {
                        setChangesorStressors(e.target.value);
                        const { name, value } = e.target;
                    setLocalFormData((prevData) => ({
                      ...prevData,
                      [name]: value,
                    }));
                      }}
                    ></textarea>
                  </>
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
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

//! If yes is the answer, in question: Do you Smoke?
const SmokeYes = ({ setLocalFormData, localFormData }) => {
  const [getSmoke, setSmoke] = useState("");

  return (
    <>
      <div className="input-group">
        <span className="me-2 d-flex align-items-center">
          If yes, how many cigarettes per day?
        </span>
        <input
          type="number"
          placeholder="Answer: "
          name="CiggDaily"
          value={localFormData.CiggDaily || ""}
          className="form-control me-3 rounded-4"
          onChange={(e) => {
            setSmoke(e.target.value);
            const { name, value } = e.target;
            setLocalFormData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
          }}
        />
      </div>
    </>
  );
};

//! If yes is the answer, in question: Do you drink Caffeinated Drinks?
const CaffeinatedDrinksYes = ({setLocalFormData, localFormData}) => {
  //! Get value of sodas per day
  const [getSodas, setSodas] = useState("");
  //! Get value of coffee per day
  const [getCoffee, setCoffee] = useState();

  return (
    <>
      <div class="input-group">
        <span className="me-2 d-flex align-items-center">
          If yes, number of sodas per day
        </span>
        <input
          type="number"
          placeholder="Answer: "
          name="SodasPerDay"
          class="form-control me-3 rounded-4"
          value={localFormData.SodasPerDay || ""}
          onChange={(e) => {
            setSodas(e.target.value);
            const { name, value } = e.target;
                    setLocalFormData((prevData) => ({
                      ...prevData,
                      [name]: value,
                    }));
          }}
        />
        <span class="me-2 d-flex align-items-center">
          Cups of coffee per day
        </span>
        <input
          type="number"
          placeholder="Answer: "
          name="CoffeePerDay"
          class="form-control me-3 rounded-4"
          value={localFormData.CoffeePerDay || ""}
          onChange={(e) => {
            setCoffee(e.target.value);
            const { name, value } = e.target;
                    setLocalFormData((prevData) => ({
                      ...prevData,
                      [name]: value,
                    }));
          }}
        />
      </div>
    </>
  );
};

//! If yes is the answer, in question: Have you ever had any Head Injury?
const HeadInjuryYes = ({setLocalFormData, localFormData}) => {
  //!Get value of headache
  const [getHeadache, setHeadache] = useState();

  return (
    <div class="input-group mt-1">
      <span class="d-flex align-items-center me-2">
        If yes, when and what happened?{" "}
      </span>
      <div class="form-floating">
        <textarea
          class="form-control rounded-4"
          placeholder="Answer:"
          id="floatingTextarea1"
          name="HeadInjDef"
          style={{ height: 70 + "px", width: 20 + "rem" }}
          value={localFormData.HeadInjDef || ""}
          onChange={(e) => {
            setHeadache(e.target.value);
            const { name, value } = e.target;
                    setLocalFormData((prevData) => ({
                      ...prevData,
                      [name]: value,
                    }));
          }}
        ></textarea>
        <label for="floatingTextarea1">Answer:</label>
      </div>
    </div>
  );
};
