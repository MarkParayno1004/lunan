import React from 'react';
import Video from 'twilio-video';
import { Container, Link, Typography, Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    container: {
        marginTop: '2.5em',
    },
    paper: {
        padding: '1em',
    },
    heading: {
        marginBottom: '0.4em',
    },
});
export default function UnsupportedBrowserWarning({ children }) {
    const classes = useStyles();
    if (!Video.isSupported) {
        return (React.createElement(Container, null,
            React.createElement(Grid, { container: true, justifyContent: "center", className: classes.container },
                React.createElement(Grid, { item: true, xs: 12, sm: 6 },
                    React.createElement(Paper, { className: classes.paper },
                        React.createElement(Typography, { variant: "h4", className: classes.heading }, "Browser or context not supported"),
                        React.createElement(Typography, null,
                            "Please open this application in one of the",
                            ' ',
                            React.createElement(Link, { href: "https://www.twilio.com/docs/video/javascript#supported-browsers", target: "_blank", rel: "noopener" }, "supported browsers"),
                            ".",
                            React.createElement("br", null),
                            "If you are using a supported browser, please ensure that this app is served over a",
                            ' ',
                            React.createElement(Link, { href: "https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts", target: "_blank", rel: "noopener" }, "secure context"),
                            ' ',
                            "(e.g. https or localhost)."))))));
    }
    return children;
}
