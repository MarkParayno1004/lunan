import { useState } from "react";
import { CardOne } from "./SignUpCards/CardOne";
import { CardTwo } from "./SignUpCards/CardTwo";
import { CardThree } from "./SignUpCards/CardThree";
import { CardFour } from "./SignUpCards/CardFour";
import { CardFive } from "./SignUpCards/CardFive";
import { CardSix } from "./SignUpCards/CardSix";

export const SIGNUPCARD = () => {
  //!Logic of next and Previous Button
  const [card, setStep] = useState(1);

  const handleNext = () => {
    setStep(card + 1);
  };

  const handlePrevious = () => {
    setStep(card - 1);
  };

  const handleSubmit = () => {
    alert("Form submitted!");
  };

  //!First Card
  const Card1 = ({ onNext }) => {
    return <CardOne ButtonNext={onNext} />;
  };

  //!Second Card
  const Card2 = ({ onPrevious, onNext }) => {
    return <CardTwo ButtonBack={onPrevious} ButtonNext={onNext} />;
  };

  //!Third Card
  const Card3 = ({ onPrevious, onNext }) => {
    return <CardThree ButtonBack={onPrevious} ButtonNext={onNext} />;
  };

  //!Fourth Card
  const Card4 = ({ onPrevious, onNext }) => {
    return <CardFour ButtonBack={onPrevious} ButtonNext={onNext} />;
  };

  //!Fifth Card
  const Card5 = ({ onPrevious, onNext }) => {
    return <CardFive ButtonBack={onPrevious} ButtonNext={onNext} />;
  };

  //! Sixth Card
  const Card6 = ({ onPrevious, onNext }) => {
    return <CardSix ButtonBack={onPrevious} ButtonNext={onNext} />;
  };

  //! Seventh Card
  const Card7 = ({ onPrevious, onNext }) => {
    return (
      <div>
        <div className="container-fluid d-flex justify-content-center mt-3">
          <div class="card" style={{ width: 50 + "rem" }}>
            <div class="card-header">
              Please fill up this intake form: (This form will be your Sign Up
              form or Register Form)
            </div>
            <ul class="list-group list-group-flush">
              {/* Sexual Preference */}
              <li class="list-group-item">
                <div className="form-check-inline ">
                  <span className="">Card 7</span>
                  <input
                    className="form-check-input ms-2"
                    type="radio"
                    name="PsychiatricMeds"
                    value="true"
                  />
                  <label className="form-check-label ms-1">Yes</label>
                  <input
                    className="form-check-input ms-2"
                    type="radio"
                    name="PsychiatricMeds"
                    value="false"
                  />
                  <label className="form-check-label ms-1">No</label>
                </div>
                <div className="form-check-inline "></div>
              </li>
            </ul>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="btn nav-link fs-5 mt-2 me-3 mb-2 rounded-4"
            id="buttonCard"
            onClick={onPrevious}
          >
            Back
          </button>
          <button
            className="btn nav-link fs-5 mt-2 me-3 mb-2 rounded-4"
            id="buttonCard"
            onClick={onNext}
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  //! Eight Card
  const Card8 = ({ onPrevious, onNext }) => {
    return (
      <div>
        <div className="container-fluid d-flex justify-content-center mt-3">
          <div class="card" style={{ width: 50 + "rem" }}>
            <div class="card-header">
              Please fill up this intake form: (This form will be your Sign Up
              form or Register Form)
            </div>
            <ul class="list-group list-group-flush">
              {/* Sexual Preference */}
              <li class="list-group-item">
                <div className="form-check-inline ">
                  <span className="">Card 8</span>
                  <input
                    className="form-check-input ms-2"
                    type="radio"
                    name="PsychiatricMeds"
                    value="true"
                  />
                  <label className="form-check-label ms-1">Yes</label>
                  <input
                    className="form-check-input ms-2"
                    type="radio"
                    name="PsychiatricMeds"
                    value="false"
                  />
                  <label className="form-check-label ms-1">No</label>
                </div>
                <div className="form-check-inline "></div>
              </li>
            </ul>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="btn nav-link fs-5 mt-2 me-3 mb-2 rounded-4"
            id="buttonCard"
            onClick={onPrevious}
          >
            Back
          </button>
          <button
            className="btn nav-link fs-5 mt-2 me-3 mb-2 rounded-4"
            id="buttonCard"
            onClick={onNext}
          >
            Next
          </button>
        </div>
      </div>
    );
  };
  return (
    <div>
      {card === 1 && <Card1 onNext={handleNext} />}
      {card === 2 && <Card2 onPrevious={handlePrevious} onNext={handleNext} />}
      {card === 3 && <Card3 onPrevious={handlePrevious} onNext={handleNext} />}
      {card === 4 && <Card4 onPrevious={handlePrevious} onNext={handleNext} />}
      {card === 5 && <Card5 onPrevious={handlePrevious} onNext={handleNext} />}
      {card === 6 && <Card6 onPrevious={handlePrevious} onNext={handleNext} />}

      {card === 7 && <Card7 onPrevious={handlePrevious} onNext={handleNext} />}
      {card === 8 && (
        <Card8 onPrevious={handlePrevious} onSubmit={handleSubmit} />
      )}
    </div>
  );
};
