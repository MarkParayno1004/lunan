import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { useAppState } from "../../state";
import UserMenu from "./UserMenu/UserMenu";
import { useLocation } from "react-router-dom";
import BFLOGO from "../../../assets/img/bloomfields_logo.png";

const useStyles = makeStyles((theme) => ({
  background: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f2e3d2",
    height: "100%",
  },
  container: {
    position: "relative",
    flex: "1",
  },
  innerContainer: {
    display: "flex",
    width: "888px",
    height: "379px",
    borderRadius: "8px",
    boxShadow: "0px 2px 4px 0px rgba(40, 42, 43, 0.3)",
    overflow: "hidden",
    position: "relative",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      height: "auto",
      width: "calc(100% - 40px)",
      margin: "auto",
      maxWidth: "400px",
    },
  },
  swooshContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4d455d",
    backgroundSize: "cover",
    width: "296px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "100px",
      backgroundPositionY: "140px",
    },
  },
  logoContainer: {
    position: "absolute",
    width: "210px",
    textAlign: "center",
    marginRight: "200px",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      alignItems: "center",
      width: "50%",
      textAlign: "initial",
    },
  },
  twilioLogo: {
    height: "400px",
    [theme.breakpoints.down("sm")]: {
      height: "150px",
      margin: "65%",
    },
  },
  content: {
    background: "white",
    width: "100%",
    padding: "3em 4em",
    flex: 1,
    [theme.breakpoints.down("sm")]: {
      padding: "2em",
    },
  },
  title: {
    color: "white",
    margin: "1em 0 0",
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      fontSize: "1.1rem",
    },
  },
}));

const IntroContainer = (props) => {
  const classes = useStyles();
  const { user } = useAppState();
  const location = useLocation();

  return (
    <div className={classes.background}>
      {user && location.pathname !== "/login" && <UserMenu />}
      <div className={classes.container}>
        <div className={classes.innerContainer}>
          <div className={classes.swooshContainer}>
            <div className={classes.logoContainer}>
              <img src={BFLOGO} className={classes.twilioLogo} />
            </div>
          </div>
          <div className={classes.content}>{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default IntroContainer;
