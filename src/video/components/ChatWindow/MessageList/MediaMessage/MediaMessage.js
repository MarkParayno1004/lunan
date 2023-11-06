import React from "react";
import FileDownloadIcon from "../../../../icons/FileDownloadIcon";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  messageContainer: {
    display: "flex",
    padding: "0.9em 1.5em",
    margin: "0.6em 0",
    border: "2px solid #e4e7e9",
    borderRadius: "4px",
    cursor: "pointer",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
  },
  mediaInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: "1.5em",
    minWidth: 0,
    "& p": {
      margin: 0,
      fontSize: "12px",
    },
  },
  filename: {
    fontWeight: 700,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  size: {
    fontWeight: 400,
  },
});
export function formatFileSize(bytes, suffixIndex = 0) {
  const suffixes = ["bytes", "KB", "MB", "GB"];
  if (bytes < 1000) return +bytes.toFixed(2) + " " + suffixes[suffixIndex];
  return formatFileSize(bytes / 1024, suffixIndex + 1);
}
export default function FileMessage({ media }) {
  const classes = useStyles();
  const handleClick = () => {
    media.getContentTemporaryUrl().then((url) => {
      const anchorEl = document.createElement("a");
      anchorEl.href = url;
      anchorEl.target = "_blank";
      anchorEl.rel = "noopener";
      // setTimeout is needed in order to open files in iOS Safari.
      setTimeout(() => {
        anchorEl.click();
      });
    });
  };
  return React.createElement(
    "div",
    { className: classes.messageContainer, onClick: handleClick },
    React.createElement(
      "div",
      { className: classes.iconContainer },
      React.createElement(FileDownloadIcon, null)
    ),
    React.createElement(
      "div",
      { className: classes.mediaInfo },
      React.createElement("p", { className: classes.filename }, media.filename),
      React.createElement(
        "p",
        { className: classes.size },
        formatFileSize(media.size),
        " - Click to open"
      )
    )
  );
}
