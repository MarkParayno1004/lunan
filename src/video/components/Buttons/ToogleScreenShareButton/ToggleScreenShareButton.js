import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ScreenShareIcon from '../../../icons/ScreenShareIcon';
import Tooltip from '@material-ui/core/Tooltip';
import useScreenShareParticipant from '../../../hooks/useScreenShareParticipant/useScreenShareParticipant';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
export const SCREEN_SHARE_TEXT = 'Share Screen';
export const STOP_SCREEN_SHARE_TEXT = 'Stop Sharing Screen';
export const SHARE_IN_PROGRESS_TEXT = 'Cannot share screen when another user is sharing';
export const SHARE_NOT_SUPPORTED_TEXT = 'Screen sharing is not supported with this browser';
const useStyles = makeStyles((theme) => createStyles({
    button: {
        '&[disabled]': {
            color: '#bbb',
            '& svg *': {
                fill: '#bbb',
            },
        },
    },
}));
export default function ToggleScreenShareButton(props) {
    const classes = useStyles();
    const screenShareParticipant = useScreenShareParticipant();
    const { toggleScreenShare } = useVideoContext();
    const disableScreenShareButton = Boolean(screenShareParticipant);
    const isScreenShareSupported = navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia;
    const isDisabled = props.disabled || disableScreenShareButton || !isScreenShareSupported;
    let tooltipMessage = '';
    if (disableScreenShareButton) {
        tooltipMessage = SHARE_IN_PROGRESS_TEXT;
    }
    if (!isScreenShareSupported) {
        tooltipMessage = SHARE_NOT_SUPPORTED_TEXT;
    }
    return (React.createElement(Tooltip, { title: tooltipMessage, placement: "top", PopperProps: { disablePortal: true }, style: { cursor: isDisabled ? 'not-allowed' : 'pointer' } },
        React.createElement("span", null,
            React.createElement(Button, { className: classes.button, onClick: toggleScreenShare, disabled: isDisabled, startIcon: React.createElement(ScreenShareIcon, null), "data-cy-share-screen": true }, SCREEN_SHARE_TEXT))));
}
