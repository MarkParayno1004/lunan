import { SignUpPageOne } from "./SignUpQuestions.js/SignUp_Page1";
import { Link } from "react-router-dom";
import { SignUpPageTwo } from "./SignUpQuestions.js/SignUp_Page2";
export const SignUp = () => {
  return (
    <div class="container-fluid d-flex justify-content-center" id="signupBG">
      <div class="container-lg mt-3 mb-3 rounded-4 fw-semibold" id="signupForm">
        <SignUpPageOne />
      </div>
    </div>
  );
};
