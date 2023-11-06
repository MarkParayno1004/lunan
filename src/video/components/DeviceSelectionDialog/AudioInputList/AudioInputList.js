import React from 'react';
import AudioLevelIndicator from '../../AudioLevelIndicator/AudioLevelIndicator';
import { FormControl, MenuItem, Typography, Select, Grid } from '@material-ui/core';
import { SELECTED_AUDIO_INPUT_KEY } from '../../../constants';
import useDevices from '../../../hooks/useDevices/useDevices';
import useMediaStreamTrack from '../../../hooks/useMediaStreamTrack/useMediaStreamTrack';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
export default function AudioInputList() {
    var _a;
    const { audioInputDevices } = useDevices();
    const { localTracks } = useVideoContext();
    const localAudioTrack = localTracks.find(track => track.kind === 'audio');
    const srcMediaStreamTrack = (_a = localAudioTrack === null || localAudioTrack === void 0 ? void 0 : localAudioTrack.noiseCancellation) === null || _a === void 0 ? void 0 : _a.sourceTrack;
    const mediaStreamTrack = useMediaStreamTrack(localAudioTrack);
    const localAudioInputDeviceId = (srcMediaStreamTrack === null || srcMediaStreamTrack === void 0 ? void 0 : srcMediaStreamTrack.getSettings().deviceId) || (mediaStreamTrack === null || mediaStreamTrack === void 0 ? void 0 : mediaStreamTrack.getSettings().deviceId);
    function replaceTrack(newDeviceId) {
        window.localStorage.setItem(SELECTED_AUDIO_INPUT_KEY, newDeviceId);
        localAudioTrack === null || localAudioTrack === void 0 ? void 0 : localAudioTrack.restart({ deviceId: { exact: newDeviceId } });
    }
    return (React.createElement("div", null,
        React.createElement(Typography, { variant: "subtitle2", gutterBottom: true }, "Audio Input"),
        React.createElement(Grid, { container: true, alignItems: "center", justifyContent: "space-between" },
            React.createElement("div", { className: "inputSelect" }, audioInputDevices.length > 1 ? (React.createElement(FormControl, { fullWidth: true },
                React.createElement(Select, { onChange: e => replaceTrack(e.target.value), value: localAudioInputDeviceId || '', variant: "outlined" }, audioInputDevices.map(device => (React.createElement(MenuItem, { value: device.deviceId, key: device.deviceId }, device.label)))))) : (React.createElement(Typography, null, (localAudioTrack === null || localAudioTrack === void 0 ? void 0 : localAudioTrack.mediaStreamTrack.label) || 'No Local Audio'))),
            React.createElement(AudioLevelIndicator, { audioTrack: localAudioTrack, color: "black" }))));
}
