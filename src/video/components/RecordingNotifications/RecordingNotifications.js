import React, { useEffect, useRef, useState } from 'react';
import { Link } from '@material-ui/core';
import Snackbar from '../Snackbar/Snackbar';
import useIsRecording from '../../hooks/useIsRecording/useIsRecording';
var Snackbars;
(function (Snackbars) {
    Snackbars[Snackbars["none"] = 0] = "none";
    Snackbars[Snackbars["recordingStarted"] = 1] = "recordingStarted";
    Snackbars[Snackbars["recordingInProgress"] = 2] = "recordingInProgress";
    Snackbars[Snackbars["recordingFinished"] = 3] = "recordingFinished";
})(Snackbars || (Snackbars = {}));
export default function RecordingNotifications() {
    const [activeSnackbar, setActiveSnackbar] = useState(Snackbars.none);
    const prevIsRecording = useRef(null);
    const isRecording = useIsRecording();
    useEffect(() => {
        // Show "Recording in progress" snackbar when a user joins a room that is recording
        if (isRecording && prevIsRecording.current === null) {
            setActiveSnackbar(Snackbars.recordingInProgress);
        }
    }, [isRecording]);
    useEffect(() => {
        // Show "Recording started" snackbar when recording has started.
        if (isRecording && prevIsRecording.current === false) {
            setActiveSnackbar(Snackbars.recordingStarted);
        }
    }, [isRecording]);
    useEffect(() => {
        // Show "Recording finished" snackbar when recording has stopped.
        if (!isRecording && prevIsRecording.current === true) {
            setActiveSnackbar(Snackbars.recordingFinished);
        }
    }, [isRecording]);
    useEffect(() => {
        prevIsRecording.current = isRecording;
    }, [isRecording]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Snackbar, { open: activeSnackbar === Snackbars.recordingStarted, handleClose: () => setActiveSnackbar(Snackbars.none), variant: "info", headline: "Recording has started.", message: "" }),
        React.createElement(Snackbar, { open: activeSnackbar === Snackbars.recordingInProgress, handleClose: () => setActiveSnackbar(Snackbars.none), variant: "info", headline: "Recording is in progress.", message: "" }),
        React.createElement(Snackbar, { open: activeSnackbar === Snackbars.recordingFinished, headline: "Recording Complete", message: React.createElement(React.Fragment, null,
                "You can view the recording in the",
                ' ',
                React.createElement(Link, { target: "_blank", rel: "noopener", href: "https://www.twilio.com/console/video/logs/recordings" }, "Twilio Console"),
                ". Recordings will be available once this room has ended."), variant: "info", handleClose: () => setActiveSnackbar(Snackbars.none) })));
}
