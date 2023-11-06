import React, { useState, useRef } from 'react';
import AboutDialog from '../../AboutDialog/AboutDialog';
import BackgroundIcon from '../../../icons/BackgroundIcon';
import CollaborationViewIcon from '@material-ui/icons/AccountBox';
import DeviceSelectionDialog from '../../DeviceSelectionDialog/DeviceSelectionDialog';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GridViewIcon from '@material-ui/icons/Apps';
import InfoIconOutlined from '../../../icons/InfoIconOutlined';
import MoreIcon from '@material-ui/icons/MoreVert';
import StartRecordingIcon from '../../../icons/StartRecordingIcon';
import StopRecordingIcon from '../../../icons/StopRecordingIcon';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '../../../icons/SettingsIcon';
import { Button, styled, useMediaQuery, Menu as MenuContainer, MenuItem, Typography } from '@material-ui/core';
import { isSupported } from '@twilio/video-processors';
import { useAppState } from '../../../state';
import useChatContext from '../../../hooks/useChatContext/useChatContext';
import useIsRecording from '../../../hooks/useIsRecording/useIsRecording';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import FlipCameraIcon from '../../../icons/FlipCameraIcon';
import useFlipCameraToggle from '../../../hooks/useFlipCameraToggle/useFlipCameraToggle';
import { VideoRoomMonitor } from '@twilio/video-room-monitor';
export const IconContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    width: '1.5em',
    marginRight: '0.3em',
});
export default function Menu(props) {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [aboutOpen, setAboutOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const { isFetching, updateRecordingRules, roomType, setIsGalleryViewActive, isGalleryViewActive } = useAppState();
    const { setIsChatWindowOpen } = useChatContext();
    const isRecording = useIsRecording();
    const { room, setIsBackgroundSelectionOpen } = useVideoContext();
    const anchorRef = useRef(null);
    const { flipCameraDisabled, toggleFacingMode, flipCameraSupported } = useFlipCameraToggle();
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, { onClick: () => setMenuOpen(isOpen => !isOpen), ref: anchorRef, className: props.buttonClassName, "data-cy-more-button": true }, isMobile ? (React.createElement(MoreIcon, null)) : (React.createElement(React.Fragment, null,
            "More",
            React.createElement(ExpandMoreIcon, null)))),
        React.createElement(MenuContainer, { open: menuOpen, onClose: () => setMenuOpen(isOpen => !isOpen), anchorEl: anchorRef.current, anchorOrigin: {
                vertical: 'top',
                horizontal: 'left',
            }, transformOrigin: {
                vertical: isMobile ? -55 : 'bottom',
                horizontal: 'center',
            } },
            React.createElement(MenuItem, { onClick: () => setSettingsOpen(true) },
                React.createElement(IconContainer, null,
                    React.createElement(SettingsIcon, null)),
                React.createElement(Typography, { variant: "body1" }, "Audio and Video Settings")),
            isSupported && (React.createElement(MenuItem, { onClick: () => {
                    setIsBackgroundSelectionOpen(true);
                    setIsChatWindowOpen(false);
                    setMenuOpen(false);
                } },
                React.createElement(IconContainer, null,
                    React.createElement(BackgroundIcon, null)),
                React.createElement(Typography, { variant: "body1" }, "Backgrounds"))),
            flipCameraSupported && (React.createElement(MenuItem, { disabled: flipCameraDisabled, onClick: toggleFacingMode },
                React.createElement(IconContainer, null,
                    React.createElement(FlipCameraIcon, null)),
                React.createElement(Typography, { variant: "body1" }, "Flip Camera"))),
            roomType !== 'peer-to-peer' && roomType !== 'go' && (React.createElement(MenuItem, { disabled: isFetching, onClick: () => {
                    setMenuOpen(false);
                    if (isRecording) {
                        updateRecordingRules(room.sid, [{ type: 'exclude', all: true }]);
                    }
                    else {
                        updateRecordingRules(room.sid, [{ type: 'include', all: true }]);
                    }
                }, "data-cy-recording-button": true },
                React.createElement(IconContainer, null, isRecording ? React.createElement(StopRecordingIcon, null) : React.createElement(StartRecordingIcon, null)),
                React.createElement(Typography, { variant: "body1" },
                    isRecording ? 'Stop' : 'Start',
                    " Recording"))),
            React.createElement(MenuItem, { onClick: () => {
                    VideoRoomMonitor.toggleMonitor();
                    setMenuOpen(false);
                } },
                React.createElement(IconContainer, null,
                    React.createElement(SearchIcon, { style: { fill: '#707578', width: '0.9em' } })),
                React.createElement(Typography, { variant: "body1" }, "Room Monitor")),
            React.createElement(MenuItem, { onClick: () => {
                    setIsGalleryViewActive(isGallery => !isGallery);
                    setMenuOpen(false);
                } },
                React.createElement(IconContainer, null, isGalleryViewActive ? (React.createElement(CollaborationViewIcon, { style: { fill: '#707578', width: '0.9em' } })) : (React.createElement(GridViewIcon, { style: { fill: '#707578', width: '0.9em' } }))),
                React.createElement(Typography, { variant: "body1" }, isGalleryViewActive ? 'Speaker View' : 'Gallery View')),
            React.createElement(MenuItem, { onClick: () => setAboutOpen(true) },
                React.createElement(IconContainer, null,
                    React.createElement(InfoIconOutlined, null)),
                React.createElement(Typography, { variant: "body1" }, "About"))),
        React.createElement(AboutDialog, { open: aboutOpen, onClose: () => {
                setAboutOpen(false);
                setMenuOpen(false);
            } }),
        React.createElement(DeviceSelectionDialog, { open: settingsOpen, onClose: () => {
                setSettingsOpen(false);
                setMenuOpen(false);
            } })));
}
