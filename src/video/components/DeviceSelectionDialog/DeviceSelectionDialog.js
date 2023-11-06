import React from 'react';
import AudioInputList from './AudioInputList/AudioInputList';
import AudioOutputList from './AudioOutputList/AudioOutputList';
import { DialogContent, Typography, Divider, Dialog, DialogActions, Button, DialogTitle, Hidden, FormControlLabel, Switch, Tooltip, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VideoInputList from './VideoInputList/VideoInputList';
import MaxGalleryViewParticipants from './MaxGalleryViewParticipants/MaxGalleryViewParticipants';
import { useKrispToggle } from '../../hooks/useKrispToggle/useKrispToggle';
import SmallCheckIcon from '../../icons/SmallCheckIcon';
import InfoIconOutlined from '../../icons/InfoIconOutlined';
import KrispLogo from '../../icons/KrispLogo';
import { useAppState } from '../../state';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
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
    headline: {
        marginBottom: '1.3em',
        fontSize: '1.1rem',
    },
    listSection: {
        margin: '2em 0 0.8em',
        '&:first-child': {
            margin: '1em 0 2em 0',
        },
    },
    noiseCancellationContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    krispContainer: {
        display: 'flex',
        alignItems: 'center',
        '& svg': {
            '&:not(:last-child)': {
                margin: '0 0.3em',
            },
        },
    },
    krispInfoText: {
        margin: '0 0 1.5em 0.5em',
    },
}));
export default function DeviceSelectionDialog({ open, onClose }) {
    const { isAcquiringLocalTracks } = useVideoContext();
    const { isKrispEnabled, isKrispInstalled } = useAppState();
    const { toggleKrisp } = useKrispToggle();
    const classes = useStyles();
    return (React.createElement(Dialog, { open: open, onClose: onClose, classes: { paper: classes.paper } },
        React.createElement(DialogTitle, null, "Audio and Video Settings"),
        React.createElement(Divider, null),
        React.createElement(DialogContent, { className: classes.container },
            React.createElement("div", { className: classes.listSection },
                React.createElement(Typography, { variant: "h6", className: classes.headline }, "Video"),
                React.createElement(VideoInputList, null)),
            React.createElement(Divider, null),
            React.createElement("div", { className: classes.listSection },
                React.createElement(Typography, { variant: "h6", className: classes.headline }, "Audio"),
                isKrispInstalled && (React.createElement("div", { className: classes.noiseCancellationContainer },
                    React.createElement("div", { className: classes.krispContainer },
                        React.createElement(Typography, { variant: "subtitle2" }, "Noise Cancellation powered by "),
                        React.createElement(KrispLogo, null),
                        React.createElement(Tooltip, { title: "Suppress background noise from your microphone", interactive: true, leaveDelay: 250, leaveTouchDelay: 15000, enterTouchDelay: 0 },
                            React.createElement("div", null,
                                React.createElement(InfoIconOutlined, null)))),
                    React.createElement(FormControlLabel, { control: React.createElement(Switch, { checked: !!isKrispEnabled, checkedIcon: React.createElement(SmallCheckIcon, null), disableRipple: true, onClick: toggleKrisp }), label: isKrispEnabled ? 'Enabled' : 'Disabled', style: { marginRight: 0 }, disabled: isAcquiringLocalTracks }))),
                isKrispInstalled && (React.createElement(Typography, { variant: "body1", color: "textSecondary", className: classes.krispInfoText }, "Suppress background noise from your microphone.")),
                React.createElement(AudioInputList, null)),
            React.createElement("div", { className: classes.listSection },
                React.createElement(AudioOutputList, null)),
            React.createElement(Hidden, { smDown: true },
                React.createElement(Divider, null),
                React.createElement("div", { className: classes.listSection },
                    React.createElement(Typography, { variant: "h6", className: classes.headline }, "Gallery View"),
                    React.createElement(MaxGalleryViewParticipants, null)))),
        React.createElement(Divider, null),
        React.createElement(DialogActions, null,
            React.createElement(Button, { color: "primary", variant: "contained", className: classes.button, onClick: onClose }, "Done"))));
}
