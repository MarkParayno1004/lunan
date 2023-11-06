import React, { useCallback } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { inputLabels } from '../../state/settings/settingsReducer';
import { useAppState } from '../../state';
import useRoomState from '../../hooks/useRoomState/useRoomState';
const useStyles = makeStyles((theme) => ({
    container: {
        width: '600px',
        minHeight: '400px',
        [theme.breakpoints.down('xs')]: {
            width: 'calc(100vw - 32px)',
        },
        '& .inputSelect': {
            width: 'calc(100% - 35px)',
        },
    },
    button: {
        float: 'right',
    },
    paper: {
        [theme.breakpoints.down('xs')]: {
            margin: '16px',
        },
    },
    formControl: {
        display: 'block',
        margin: '1.5em 0',
        '&:first-child': {
            margin: '0 0 1.5em 0',
        },
    },
    label: {
        width: '133%', // Labels have scale(0.75) applied to them, so this effectively makes the width 100%
    },
}));
const withDefault = (val) => (typeof val === 'undefined' ? 'default' : val);
export default function ConnectionOptionsDialog({ open, onClose }) {
    const classes = useStyles();
    const { settings, dispatchSetting } = useAppState();
    const roomState = useRoomState();
    const isDisabled = roomState !== 'disconnected';
    const handleChange = useCallback((e) => {
        dispatchSetting({ name: e.target.name, value: e.target.value });
    }, [dispatchSetting]);
    const handleNumberChange = useCallback((e) => {
        if (!/[^\d]/.test(e.target.value))
            handleChange(e);
    }, [handleChange]);
    return (React.createElement(Dialog, { open: open, onClose: onClose, classes: { paper: classes.paper } },
        React.createElement(DialogTitle, null, "Connection Settings"),
        React.createElement(Divider, null),
        React.createElement(DialogContent, { className: classes.container },
            React.createElement(Grid, { container: true, spacing: 2 },
                React.createElement(Grid, { item: true, xs: 12 },
                    React.createElement(Typography, { hidden: !isDisabled, variant: "body2" }, "These settings cannot be changed when connected to a room.")),
                React.createElement(Grid, { item: true, sm: 6, xs: 12 },
                    React.createElement(FormControl, { className: classes.formControl },
                        React.createElement(InputLabel, { id: inputLabels.dominantSpeakerPriority }, "Dominant Speaker Priority:"),
                        React.createElement(Select, { fullWidth: true, disabled: isDisabled, name: inputLabels.dominantSpeakerPriority, label: inputLabels.dominantSpeakerPriority, value: withDefault(settings.dominantSpeakerPriority), onChange: handleChange },
                            React.createElement(MenuItem, { value: "low" }, "Low"),
                            React.createElement(MenuItem, { value: "standard" }, "Standard"),
                            React.createElement(MenuItem, { value: "high" }, "High"),
                            React.createElement(MenuItem, { value: "default" }, "Server Default"))),
                    React.createElement(FormControl, { className: classes.formControl },
                        React.createElement(InputLabel, { id: inputLabels.trackSwitchOffMode }, "Track Switch Off Mode:"),
                        React.createElement(Select, { fullWidth: true, disabled: isDisabled, name: inputLabels.trackSwitchOffMode, label: inputLabels.trackSwitchOffMode, value: withDefault(settings.trackSwitchOffMode), onChange: handleChange },
                            React.createElement(MenuItem, { value: "predicted" }, "Predicted"),
                            React.createElement(MenuItem, { value: "detected" }, "Detected"),
                            React.createElement(MenuItem, { value: "disabled" }, "Disabled"),
                            React.createElement(MenuItem, { value: "default" }, "Server Default"))),
                    React.createElement(FormControl, { className: classes.formControl },
                        React.createElement(InputLabel, { id: inputLabels.bandwidthProfileMode }, "Mode:"),
                        React.createElement(Select, { fullWidth: true, disabled: isDisabled, name: inputLabels.bandwidthProfileMode, label: inputLabels.bandwidthProfileMode, value: withDefault(settings.bandwidthProfileMode), onChange: handleChange },
                            React.createElement(MenuItem, { value: "grid" }, "Grid"),
                            React.createElement(MenuItem, { value: "collaboration" }, "Collaboration"),
                            React.createElement(MenuItem, { value: "presentation" }, "Presentation"),
                            React.createElement(MenuItem, { value: "default" }, "Server Default")))),
                React.createElement(Grid, { item: true, sm: 6, xs: 12 },
                    React.createElement(FormControl, { className: classes.formControl },
                        React.createElement(InputLabel, { id: inputLabels.clientTrackSwitchOffControl }, "Client Track Switch Off Control:"),
                        React.createElement(Select, { fullWidth: true, disabled: isDisabled, name: inputLabels.clientTrackSwitchOffControl, label: inputLabels.clientTrackSwitchOffControl, value: withDefault(settings.clientTrackSwitchOffControl), onChange: handleChange },
                            React.createElement(MenuItem, { value: "auto" }, "Auto"),
                            React.createElement(MenuItem, { value: "manual" }, "Manual"),
                            React.createElement(MenuItem, { value: "default" }, "Default"))),
                    React.createElement(FormControl, { className: classes.formControl },
                        React.createElement(InputLabel, { id: inputLabels.contentPreferencesMode }, "Content Preferences Mode:"),
                        React.createElement(Select, { fullWidth: true, disabled: isDisabled, name: inputLabels.contentPreferencesMode, label: inputLabels.contentPreferencesMode, value: withDefault(settings.contentPreferencesMode), onChange: handleChange },
                            React.createElement(MenuItem, { value: "auto" }, "Auto"),
                            React.createElement(MenuItem, { value: "manual" }, "Manual"),
                            React.createElement(MenuItem, { value: "default" }, "Default"))),
                    React.createElement(FormControl, { className: classes.formControl },
                        React.createElement(TextField, { disabled: isDisabled, fullWidth: true, id: inputLabels.maxAudioBitrate, label: "Max Audio Bitrate", placeholder: "Leave blank for no limit", name: inputLabels.maxAudioBitrate, value: withDefault(settings.maxAudioBitrate), onChange: handleNumberChange }))))),
        React.createElement(Divider, null),
        React.createElement(DialogActions, null,
            React.createElement(Button, { className: classes.button, color: "primary", variant: "contained", onClick: onClose }, "Done"))));
}
