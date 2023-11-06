import React from 'react';
import { Typography, makeStyles, TextField, Grid, Button, InputLabel } from '@material-ui/core';
import { useAppState } from '../../../state';
const useStyles = makeStyles((theme) => ({
    gutterBottom: {
        marginBottom: '1em',
    },
    inputContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '1.5em 0 3.5em',
        '& div:not(:last-child)': {
            marginRight: '1em',
        },
        [theme.breakpoints.down('sm')]: {
            margin: '1.5em 0 2em',
        },
    },
    textFieldContainer: {
        width: '100%',
    },
    continueButton: {
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
}));
export default function RoomNameScreen({ name, roomName, setName, setRoomName, handleSubmit }) {
    const classes = useStyles();
    const { user } = useAppState();
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleRoomNameChange = (event) => {
        setRoomName(event.target.value);
    };
    const hasUsername = !window.location.search.includes('customIdentity=true') && (user === null || user === void 0 ? void 0 : user.displayName);
    return (React.createElement(React.Fragment, null,
        React.createElement(Typography, { variant: "h5", className: classes.gutterBottom }, "Join a Room"),
        React.createElement(Typography, { variant: "body1" }, hasUsername
            ? "Enter the name of a room you'd like to join."
            : "Enter your name and the name of a room you'd like to join"),
        React.createElement("form", { onSubmit: handleSubmit },
            React.createElement("div", { className: classes.inputContainer },
                !hasUsername && (React.createElement("div", { className: classes.textFieldContainer },
                    React.createElement(InputLabel, { shrink: true, htmlFor: "input-user-name" }, "Your Name"),
                    React.createElement(TextField, { id: "input-user-name", variant: "outlined", fullWidth: true, size: "small", value: name, onChange: handleNameChange }))),
                React.createElement("div", { className: classes.textFieldContainer },
                    React.createElement(InputLabel, { shrink: true, htmlFor: "input-room-name" }, "Room Name"),
                    React.createElement(TextField, { autoCapitalize: "false", id: "input-room-name", variant: "outlined", fullWidth: true, size: "small", value: roomName, onChange: handleRoomNameChange }))),
            React.createElement(Grid, { container: true, justifyContent: "flex-end" },
                React.createElement(Button, { variant: "contained", type: "submit", color: "primary", disabled: !name || !roomName, className: classes.continueButton }, "Continue")))));
}
