import React from 'react';
import { FormControl, MenuItem, Typography, Select } from '@material-ui/core';
import { useAppState } from '../../../state';
import useDevices from '../../../hooks/useDevices/useDevices';
export default function AudioOutputList() {
    var _a;
    const { audioOutputDevices } = useDevices();
    const { activeSinkId, setActiveSinkId } = useAppState();
    const activeOutputLabel = (_a = audioOutputDevices.find(device => device.deviceId === activeSinkId)) === null || _a === void 0 ? void 0 : _a.label;
    return (React.createElement("div", { className: "inputSelect" }, audioOutputDevices.length > 1 ? (React.createElement(FormControl, { fullWidth: true },
        React.createElement(Typography, { variant: "subtitle2", gutterBottom: true }, "Audio Output"),
        React.createElement(Select, { onChange: e => setActiveSinkId(e.target.value), value: activeSinkId, variant: "outlined" }, audioOutputDevices.map(device => (React.createElement(MenuItem, { value: device.deviceId, key: device.deviceId }, device.label)))))) : (React.createElement(React.Fragment, null,
        React.createElement(Typography, { variant: "subtitle2" }, "Audio Output"),
        React.createElement(Typography, null, activeOutputLabel || 'System Default Audio Output')))));
}
