import React from 'react';
import { makeStyles, Typography, Grid, Button, Hidden, Switch, Tooltip } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import LocalVideoPreview from './LocalVideoPreview/LocalVideoPreview';
import SettingsMenu from './SettingsMenu/SettingsMenu';
import { Steps } from '../PreJoinScreens';
import ToggleAudioButton from '../../Buttons/ToggleAudioButton/ToggleAudioButton';
import ToggleVideoButton from '../../Buttons/ToggleVideoButton/ToggleVideoButton';
import { useAppState } from '../../../state';
import useChatContext from '../../../hooks/useChatContext/useChatContext';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useKrispToggle } from '../../../hooks/useKrispToggle/useKrispToggle';
import SmallCheckIcon from '../../../icons/SmallCheckIcon';
import InfoIconOutlined from '../../../icons/InfoIconOutlined';
const useStyles = makeStyles((theme) => ({
    gutterBottom: {
        marginBottom: '1em',
    },
    marginTop: {
        marginTop: '1em',
    },
    deviceButton: {
        width: '100%',
        border: '2px solid #aaa',
        margin: '1em 0',
    },
    localPreviewContainer: {
        paddingRight: '2em',
        marginBottom: '2em',
        [theme.breakpoints.down('sm')]: {
            padding: '0 2.5em',
        },
    },
    joinButtons: {
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column-reverse',
            width: '100%',
            '& button': {
                margin: '0.5em 0',
            },
        },
    },
    mobileButtonBar: {
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            justifyContent: 'space-between',
            margin: '1.5em 0 1em',
        },
    },
    mobileButton: {
        padding: '0.8em 0',
        margin: 0,
    },
    toolTipContainer: {
        display: 'flex',
        alignItems: 'center',
        '& div': {
            display: 'flex',
            alignItems: 'center',
        },
        '& svg': {
            marginLeft: '0.3em',
        },
    },
}));
export default function DeviceSelectionScreen({ name, roomName, setStep }) {
    const classes = useStyles();
    const { getToken, isFetching, isKrispEnabled, isKrispInstalled } = useAppState();
    const { connect: chatConnect } = useChatContext();
    const { connect: videoConnect, isAcquiringLocalTracks, isConnecting } = useVideoContext();
    const { toggleKrisp } = useKrispToggle();
    const disableButtons = isFetching || isAcquiringLocalTracks || isConnecting;
    const handleJoin = () => {
        getToken(name, roomName).then(({ token }) => {
            videoConnect(token);
            process.env.REACT_APP_DISABLE_TWILIO_CONVERSATIONS !== 'true' && chatConnect(token);
        });
    };
    if (isFetching || isConnecting) {
        return (React.createElement(Grid, { container: true, justifyContent: "center", alignItems: "center", direction: "column", style: { height: '100%' } },
            React.createElement("div", null,
                React.createElement(CircularProgress, { variant: "indeterminate" })),
            React.createElement("div", null,
                React.createElement(Typography, { variant: "body2", style: { fontWeight: 'bold', fontSize: '16px' } }, "Joining Meeting"))));
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(Typography, { variant: "h5", className: classes.gutterBottom },
            "Join ",
            roomName),
        React.createElement(Grid, { container: true, justifyContent: "center" },
            React.createElement(Grid, { item: true, md: 7, sm: 12, xs: 12 },
                React.createElement("div", { className: classes.localPreviewContainer },
                    React.createElement(LocalVideoPreview, { identity: name })),
                React.createElement("div", { className: classes.mobileButtonBar },
                    React.createElement(Hidden, { mdUp: true },
                        React.createElement(ToggleAudioButton, { className: classes.mobileButton, disabled: disableButtons }),
                        React.createElement(ToggleVideoButton, { className: classes.mobileButton, disabled: disableButtons }),
                        React.createElement(SettingsMenu, { mobileButtonClass: classes.mobileButton })))),
            React.createElement(Grid, { item: true, md: 5, sm: 12, xs: 12 },
                React.createElement(Grid, { container: true, direction: "column", justifyContent: "space-between", style: { alignItems: 'normal' } },
                    React.createElement("div", null,
                        React.createElement(Hidden, { smDown: true },
                            React.createElement(ToggleAudioButton, { className: classes.deviceButton, disabled: disableButtons }),
                            React.createElement(ToggleVideoButton, { className: classes.deviceButton, disabled: disableButtons }))))),
            React.createElement(Grid, { item: true, md: 12, sm: 12, xs: 12 },
                isKrispInstalled && (React.createElement(Grid, { container: true, direction: "row", justifyContent: "space-between", alignItems: "center", style: { marginBottom: '1em' } },
                    React.createElement("div", { className: classes.toolTipContainer },
                        React.createElement(Typography, { variant: "subtitle2" }, "Noise Cancellation"),
                        React.createElement(Tooltip, { title: "Suppress background noise from your microphone", interactive: true, leaveDelay: 250, leaveTouchDelay: 15000, enterTouchDelay: 0 },
                            React.createElement("div", null,
                                React.createElement(InfoIconOutlined, null)))),
                    React.createElement(FormControlLabel, { control: React.createElement(Switch, { checked: !!isKrispEnabled, checkedIcon: React.createElement(SmallCheckIcon, null), disableRipple: true, onClick: toggleKrisp }), label: isKrispEnabled ? 'Enabled' : 'Disabled', style: { marginRight: 0 }, 
                        // Prevents <Switch /> from being temporarily enabled (and then quickly disabled) in unsupported browsers after
                        // isAcquiringLocalTracks becomes false:
                        disabled: isKrispEnabled && isAcquiringLocalTracks }))),
                React.createElement(Divider, null)),
            React.createElement(Grid, { item: true, md: 12, sm: 12, xs: 12 },
                React.createElement(Grid, { container: true, direction: "row", alignItems: "center", style: { marginTop: '1em' } },
                    React.createElement(Hidden, { smDown: true },
                        React.createElement(Grid, { item: true, md: 7, sm: 12, xs: 12 },
                            React.createElement(SettingsMenu, { mobileButtonClass: classes.mobileButton }))),
                    React.createElement(Grid, { item: true, md: 5, sm: 12, xs: 12 },
                        React.createElement("div", { className: classes.joinButtons },
                            React.createElement(Button, { variant: "outlined", color: "primary", onClick: () => setStep(Steps.roomNameStep) }, "Cancel"),
                            React.createElement(Button, { variant: "contained", color: "primary", "data-cy-join-now": true, onClick: handleJoin, disabled: disableButtons }, "Join Now"))))))));
}
