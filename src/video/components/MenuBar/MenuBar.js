import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EndCallButton from '../Buttons/EndCallButton/EndCallButton';
import { isMobile } from '../../utils';
import Menu from './Menu/Menu';
import useParticipants from '../../hooks/useParticipants/useParticipants';
import useRoomState from '../../hooks/useRoomState/useRoomState';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import { Typography, Grid, Hidden } from '@material-ui/core';
import ToggleAudioButton from '../Buttons/ToggleAudioButton/ToggleAudioButton';
import ToggleChatButton from '../Buttons/ToggleChatButton/ToggleChatButton';
import ToggleVideoButton from '../Buttons/ToggleVideoButton/ToggleVideoButton';
import ToggleScreenShareButton from '../Buttons/ToogleScreenShareButton/ToggleScreenShareButton';
const useStyles = makeStyles((theme) => createStyles({
    container: {
        backgroundColor: theme.palette.background.default,
        bottom: 0,
        left: 0,
        right: 0,
        height: `${theme.footerHeight}px`,
        position: 'fixed',
        display: 'flex',
        padding: '0 1.43em',
        zIndex: 10,
        [theme.breakpoints.down('sm')]: {
            height: `${theme.mobileFooterHeight}px`,
            padding: 0,
        },
    },
    screenShareBanner: {
        position: 'fixed',
        zIndex: 8,
        bottom: `${theme.footerHeight}px`,
        left: 0,
        right: 0,
        height: '104px',
        background: 'rgba(0, 0, 0, 0.5)',
        '& h6': {
            color: 'white',
        },
        '& button': {
            background: 'white',
            color: theme.brand,
            border: `2px solid ${theme.brand}`,
            margin: '0 2em',
            '&:hover': {
                color: '#600101',
                border: `2px solid #600101`,
                background: '#FFE9E7',
            },
        },
    },
    hideMobile: {
        display: 'initial',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
}));
export default function MenuBar() {
    const classes = useStyles();
    const { isSharingScreen, toggleScreenShare } = useVideoContext();
    const roomState = useRoomState();
    const isReconnecting = roomState === 'reconnecting';
    const { room } = useVideoContext();
    const participants = useParticipants();
    return (React.createElement(React.Fragment, null,
        isSharingScreen && (React.createElement(Grid, { container: true, justifyContent: "center", alignItems: "center", className: classes.screenShareBanner },
            React.createElement(Typography, { variant: "h6" }, "You are sharing your screen"),
            React.createElement(Button, { onClick: () => toggleScreenShare() }, "Stop Sharing"))),
        React.createElement("footer", { className: classes.container },
            React.createElement(Grid, { container: true, justifyContent: "space-around", alignItems: "center" },
                React.createElement(Hidden, { smDown: true },
                    React.createElement(Grid, { style: { flex: 1 } },
                        React.createElement(Typography, { variant: "body1" },
                            room.name,
                            " | ",
                            participants.length + 1,
                            " participant",
                            participants.length ? 's' : ''))),
                React.createElement(Grid, { item: true },
                    React.createElement(Grid, { container: true, justifyContent: "center" },
                        React.createElement(ToggleAudioButton, { disabled: isReconnecting }),
                        React.createElement(ToggleVideoButton, { disabled: isReconnecting }),
                        !isSharingScreen && !isMobile && React.createElement(ToggleScreenShareButton, { disabled: isReconnecting }),
                        process.env.REACT_APP_DISABLE_TWILIO_CONVERSATIONS !== 'true' && React.createElement(ToggleChatButton, null),
                        React.createElement(Hidden, { smDown: true },
                            React.createElement(Menu, null)))),
                React.createElement(Hidden, { smDown: true },
                    React.createElement(Grid, { style: { flex: 1 } },
                        React.createElement(Grid, { container: true, justifyContent: "flex-end" },
                            React.createElement(EndCallButton, null))))))));
}
