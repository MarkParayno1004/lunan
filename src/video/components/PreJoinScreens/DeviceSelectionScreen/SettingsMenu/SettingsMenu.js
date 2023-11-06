import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import MenuContainer from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import { useMediaQuery } from '@material-ui/core';
import AboutDialog from '../../../AboutDialog/AboutDialog';
import ConnectionOptionsDialog from '../../../ConnectionOptionsDialog/ConnectionOptionsDialog';
import DeviceSelectionDialog from '../../../DeviceSelectionDialog/DeviceSelectionDialog';
import SettingsIcon from '../../../../icons/SettingsIcon';
import { useAppState } from '../../../../state';
export default function SettingsMenu({ mobileButtonClass }) {
    const { roomType } = useAppState();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [menuOpen, setMenuOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);
    const [deviceSettingsOpen, setDeviceSettingsOpen] = useState(false);
    const [connectionSettingsOpen, setConnectionSettingsOpen] = useState(false);
    const anchorRef = useRef(null);
    return (React.createElement(React.Fragment, null,
        isMobile ? (React.createElement(Button, { ref: anchorRef, onClick: () => setMenuOpen(true), startIcon: React.createElement(MoreIcon, null), className: mobileButtonClass }, "More")) : (React.createElement(Button, { ref: anchorRef, onClick: () => setMenuOpen(true), startIcon: React.createElement(SettingsIcon, null) }, "Settings")),
        React.createElement(MenuContainer, { open: menuOpen, onClose: () => setMenuOpen(isOpen => !isOpen), anchorEl: anchorRef.current, getContentAnchorEl: null, anchorOrigin: {
                vertical: 'top',
                horizontal: isMobile ? 'left' : 'right',
            }, transformOrigin: {
                vertical: 0,
                horizontal: 'center',
            } },
            React.createElement(MenuItem, { onClick: () => setAboutOpen(true) },
                React.createElement(Typography, { variant: "body1" }, "About")),
            React.createElement(MenuItem, { onClick: () => setDeviceSettingsOpen(true) },
                React.createElement(Typography, { variant: "body1" }, "Audio and Video Settings")),
            roomType !== 'peer-to-peer' && roomType !== 'go' && (React.createElement(MenuItem, { onClick: () => setConnectionSettingsOpen(true) },
                React.createElement(Typography, { variant: "body1" }, "Connection Settings")))),
        React.createElement(AboutDialog, { open: aboutOpen, onClose: () => {
                setAboutOpen(false);
                setMenuOpen(false);
            } }),
        React.createElement(DeviceSelectionDialog, { open: deviceSettingsOpen, onClose: () => {
                setDeviceSettingsOpen(false);
                setMenuOpen(false);
            } }),
        React.createElement(ConnectionOptionsDialog, { open: connectionSettingsOpen, onClose: () => {
                setConnectionSettingsOpen(false);
                setMenuOpen(false);
            } })));
}
