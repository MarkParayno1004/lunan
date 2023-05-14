import "../css/Login.css";
import lunanDark from "../img/lunanDark.png";
export const Login = () => {
  return (
    <div class="container-fluid text-center" id="loginBG">
      <div class="row align-items-center">
        <div class="col">
          <img src={lunanDark} />
        </div>
        <div class="col">
          <div class="" id="loginInput">
            <h1>Login</h1>
            <br />
            <p>
              Email: <input></input>
            </p>
            <p>
              Password: <input></input>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
