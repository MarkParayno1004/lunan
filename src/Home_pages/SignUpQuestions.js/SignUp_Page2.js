import { RBUTTONSP } from "./SignUp_Radio_SP";
import { RBUTTONMS } from "./SignUp_Radio_MS";
import { useState } from "react";
export const SignUpPageTwo = () => {
  //! Sexual Preference Buttons
  const [getRadioSP, setRadioSP] = useState();
  const handleRadioSP = (event) => {
    setRadioSP(event.target.value);
  };

  //! Marital Preference Buttons
  const [getRadioMS, setRadioMS] = useState();
  const handleMaritalButton = (event) => {
    setRadioMS(event.target.value);
  };
  return (
    <div class="container-fluid d-flex justify-content-center" id="signupBG">
      <div class="container-lg mt-3 mb-3 rounded-4 fw-semibold" id="signupForm">
        <h1 id="textHead" class="d-flex justify-content-center ">
          Sign Up Form
        </h1>
        <div>
          <form>
            <div>
              <RBUTTONSP handleInputSexPreference={handleRadioSP} />
            </div>
            <div class="mt-2">
              <RBUTTONMS handleMaritalStatus={handleMaritalButton} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
