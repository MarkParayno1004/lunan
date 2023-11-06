import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import packageJSON from "../../../../package.json";
import Video from "twilio-video";
import { useAppState } from "../../state";
function AboutDialog({ open, onClose }) {
  const { roomType } = useAppState();
  return React.createElement(
    Dialog,
    { open: open, onClose: onClose, fullWidth: true, maxWidth: "xs" },
    React.createElement(DialogTitle, null, "About"),
    React.createElement(Divider, null),
    React.createElement(
      DialogContent,
      null,
      React.createElement(
        DialogContentText,
        null,
        "Browser supported: ",
        String(Video.isSupported)
      ),
      React.createElement(
        DialogContentText,
        null,
        "SDK Version: ",
        Video.version
      ),
      React.createElement(
        DialogContentText,
        null,
        "App Version: ",
        packageJSON.version
      ),
      React.createElement(
        DialogContentText,
        null,
        "Deployed Tag: ",
        process.env.REACT_APP_GIT_TAG || "N/A"
      ),
      React.createElement(
        DialogContentText,
        null,
        "Deployed Commit Hash: ",
        process.env.REACT_APP_GIT_COMMIT || "N/A"
      ),
      roomType &&
        React.createElement(DialogContentText, null, "Room Type: ", roomType)
    ),
    React.createElement(Divider, null),
    React.createElement(
      DialogActions,
      null,
      React.createElement(
        Button,
        {
          onClick: onClose,
          color: "primary",
          variant: "contained",
          autoFocus: true,
        },
        "OK"
      )
    )
  );
}
export default AboutDialog;
