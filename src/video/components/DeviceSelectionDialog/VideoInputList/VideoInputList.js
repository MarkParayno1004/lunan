import React, { useState } from 'react';
import { DEFAULT_VIDEO_CONSTRAINTS, SELECTED_VIDEO_INPUT_KEY } from '../../../constants';
import { FormControl, MenuItem, Typography, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VideoTrack from '../../VideoTrack/VideoTrack';
import useDevices from '../../../hooks/useDevices/useDevices';
import useMediaStreamTrack from '../../../hooks/useMediaStreamTrack/useMediaStreamTrack';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
const useStyles = makeStyles({
    preview: {
        width: '300px',
        maxHeight: '200px',
        margin: '0.5em auto',
        '& video': {
            maxHeight: '200px',
        },
    },
});
export default function VideoInputList() {
    const classes = useStyles();
    const { videoInputDevices } = useDevices();
    const { localTracks } = useVideoContext();
    const localVideoTrack = localTracks.find(track => track.kind === 'video');
    const mediaStreamTrack = useMediaStreamTrack(localVideoTrack);
    const [storedLocalVideoDeviceId, setStoredLocalVideoDeviceId] = useState(window.localStorage.getItem(SELECTED_VIDEO_INPUT_KEY));
    const localVideoInputDeviceId = (mediaStreamTrack === null || mediaStreamTrack === void 0 ? void 0 : mediaStreamTrack.getSettings().deviceId) || storedLocalVideoDeviceId;
    function replaceTrack(newDeviceId) {
        // Here we store the device ID in the component state. This is so we can re-render this component display
        // to display the name of the selected device when it is changed while the users camera is off.
        setStoredLocalVideoDeviceId(newDeviceId);
        window.localStorage.setItem(SELECTED_VIDEO_INPUT_KEY, newDeviceId);
        localVideoTrack === null || localVideoTrack === void 0 ? void 0 : localVideoTrack.restart(Object.assign(Object.assign({}, DEFAULT_VIDEO_CONSTRAINTS), { deviceId: { exact: newDeviceId } }));
    }
    return (React.createElement("div", null,
        localVideoTrack && (React.createElement("div", { className: classes.preview },
            React.createElement(VideoTrack, { isLocal: true, track: localVideoTrack }))),
        videoInputDevices.length > 1 ? (React.createElement(FormControl, { fullWidth: true },
            React.createElement(Typography, { variant: "subtitle2", gutterBottom: true }, "Video Input"),
            React.createElement(Select, { onChange: e => replaceTrack(e.target.value), value: localVideoInputDeviceId || '', variant: "outlined" }, videoInputDevices.map(device => (React.createElement(MenuItem, { value: device.deviceId, key: device.deviceId }, device.label)))))) : (React.createElement(React.Fragment, null,
            React.createElement(Typography, { variant: "subtitle2", gutterBottom: true }, "Video Input"),
            React.createElement(Typography, null, (localVideoTrack === null || localVideoTrack === void 0 ? void 0 : localVideoTrack.mediaStreamTrack.label) || 'No Local Video')))));
}
