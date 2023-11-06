import React, { useState } from "react";
import { useAppState } from "../../state";
import Button from "@material-ui/core/Button";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Grid from "@material-ui/core/Grid";
import { ReactComponent as GoogleLogo } from "./google-logo.svg";
import { InputLabel } from "@material-ui/core";
import IntroContainer from "../IntroContainer/IntroContainer";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation, useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  googleButton: {
    background: "white",
    color: "rgb(0, 94, 166)",
    borderRadius: "4px",
    border: "2px solid rgb(2, 122, 197)",
    margin: "1.8em 0 0.7em",
    textTransform: "none",
    boxShadow: "none",
    padding: "0.3em 1em",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    "&:hover": {
      background: "white",
      boxShadow: "none",
    },
  },
  errorMessage: {
    color: "red",
    display: "flex",
    alignItems: "center",
    margin: "1em 0 0.2em",
    "& svg": {
      marginRight: "0.4em",
    },
  },
  gutterBottom: {
    marginBottom: "1em",
  },
  passcodeContainer: {
    minHeight: "120px",
  },
  submitButton: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));
export default function LoginPage() {
  const classes = useStyles();
  const { signIn, user, isAuthReady } = useAppState();
  const history = useNavigate();
  const location = useLocation();
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState(null);
  const isAuthEnabled = Boolean(process.env.REACT_APP_SET_AUTH);
  const login = () => {
    setAuthError(null);
    signIn === null || signIn === void 0
      ? void 0
      : signIn(passcode)
          .then(() => {
            var _a;
            history.replace(
              ((_a =
                location === null || location === void 0
                  ? void 0
                  : location.state) === null || _a === void 0
                ? void 0
                : _a.from) || { pathname: "/" }
            );
          })
          .catch((err) => setAuthError(err));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };
  if (user || !isAuthEnabled) {
    history.replace("/");
  }
  if (!isAuthReady) {
    return null;
  }
  return React.createElement(
    IntroContainer,
    null,
    process.env.REACT_APP_SET_AUTH === "firebase" &&
      React.createElement(
        React.Fragment,
        null,
        React.createElement(
          Typography,
          { variant: "h5", className: classes.gutterBottom },
          "Sign in to join a room"
        ),
        React.createElement(
          Typography,
          { variant: "body1" },
          "Sign in using your Twilio Google Account"
        ),
        React.createElement(
          Button,
          {
            variant: "contained",
            className: classes.googleButton,
            onClick: login,
            startIcon: React.createElement(GoogleLogo, null),
          },
          "Sign in with Google"
        )
      ),
    process.env.REACT_APP_SET_AUTH === "passcode" &&
      React.createElement(
        React.Fragment,
        null,
        React.createElement(
          Typography,
          { variant: "h5", className: classes.gutterBottom },
          "Enter passcode to join a room"
        ),
        React.createElement(
          "form",
          { onSubmit: handleSubmit },
          React.createElement(
            Grid,
            { container: true, justifyContent: "space-between" },
            React.createElement(
              "div",
              { className: classes.passcodeContainer },
              React.createElement(
                InputLabel,
                { shrink: true, htmlFor: "input-passcode" },
                "Passcode"
              ),
              React.createElement(TextField, {
                id: "input-passcode",
                onChange: (e) => setPasscode(e.target.value),
                type: "password",
                variant: "outlined",
                size: "small",
              }),
              React.createElement(
                "div",
                null,
                authError &&
                  React.createElement(
                    Typography,
                    { variant: "caption", className: classes.errorMessage },
                    React.createElement(ErrorOutlineIcon, null),
                    authError.message
                  )
              )
            )
          ),
          React.createElement(
            Grid,
            { container: true, justifyContent: "flex-end" },
            React.createElement(
              Button,
              {
                variant: "contained",
                color: "primary",
                type: "submit",
                disabled: !passcode.length,
                className: classes.submitButton,
              },
              "Submit"
            )
          )
        )
      )
  );
}
