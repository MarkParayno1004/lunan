import { SIGNUPCARD } from "./SignUp_card";
import "../css/SignUp.css";
export const SignUp = () => {
  return (
    <div
      class="container-fluid d-flex justify-content-center d-flex align-items-center"
      id="signupBG"
    >
      <div
        class="container-fluid mt-3 mb-3 rounded-4 fw-semibold"
        id="signupForm"
      >
        <SIGNUPCARD />
      </div>
    </div>
  );
};
