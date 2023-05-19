import "../css/Login.css";
import lunanDark from "../img/LoginImg.png";
import loginInputImg from "../img/LoginInputImg.png";
import { Link } from "react-router-dom";
export const Login = () => {
  return (
    <div className="container-fluid text-center" id="loginBG">
      <div className="row align-items-center">
        <div className="col">
          <img src={lunanDark} style={{ width: 70 + "%" }} />
        </div>
        <div
          className="col d-flex align-items-center d-flex justify-content-center"
          id="loginInput"
        >
          <div className=" mb-5">
            <img src={loginInputImg} style={{ width: 80 + "%" }} />
            <p style={{ color: "white" }} className=" fs-1">
              Login
            </p>
            <div className="input-group flex-nowrap">
              {/* Input Email */}
              <input
                type="email"
                className="form-control mt-3"
                placeholder="Email"
                aria-label="Email"
                aria-describedby="addon-wrapping"
              />
            </div>
            {/* Input Password */}
            <div className="input-group flex-nowrap">
              <input
                type="password"
                className="form-control mt-3"
                placeholder="Password"
                aria-label="Password"
                aria-describedby="addon-wrapping"
              />
            </div>
            <Link
              to=""
              className="d-flex justify-content-end"
              style={{ color: "white" }}
            >
              Forgot Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
