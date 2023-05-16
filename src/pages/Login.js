import "../css/Login.css";
import lunanDark from "../img/LoginImg.png";
import loginInputImg from "../img/LoginInputImg.png";
import { Link } from "react-router-dom";
export const Login = () => {
  return (
    <div class="container-fluid text-center" id="loginBG">
      <div class="row align-items-center">
        <div class="col">
          <img src={lunanDark} style={{ width: 70 + "%" }} />
        </div>
        <div class="col" id="LoginText">
          <div
            class="d-flex align-items-center d-flex justify-content-center"
            id="loginInput"
          >
            <div class="container-fluid mb-5">
              <img
                src={loginInputImg}
                style={{ width: 50 + "%" }}
                class="mb-2"
              />
              <h1 class="textsize">Login</h1>
              <div class="input-group flex-nowrap mt-5">
                {/* Input Email */}
                <input
                  type="email"
                  class="form-control"
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="addon-wrapping"
                />
              </div>
              {/* Input Password */}
              <div class="input-group flex-nowrap">
                <input
                  type="password"
                  class="form-control mt-3"
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="addon-wrapping"
                />
              </div>
              <Link
                to=""
                class="d-flex justify-content-end"
                style={{ color: "white" }}
              >
                Forgot Password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};