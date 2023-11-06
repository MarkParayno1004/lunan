import React, { useCallback, useRef } from 'react';
import Button from '@material-ui/core/Button';
import VideoOffIcon from '../../../icons/VideoOffIcon';
import VideoOnIcon from '../../../icons/VideoOnIcon';
import useDevices from '../../../hooks/useDevices/useDevices';
import useLocalVideoToggle from '../../../hooks/useLocalVideoToggle/useLocalVideoToggle';
export default function ToggleVideoButton(props) {
    const [isVideoEnabled, toggleVideoEnabled] = useLocalVideoToggle();
    const lastClickTimeRef = useRef(0);
    const { hasVideoInputDevices } = useDevices();
    const toggleVideo = useCallback(() => {
        if (Date.now() - lastClickTimeRef.current > 500) {
            lastClickTimeRef.current = Date.now();
            toggleVideoEnabled();
        }
    }, [toggleVideoEnabled]);
    return (React.createElement(Button, { className: props.className, onClick: toggleVideo, disabled: !hasVideoInputDevices || props.disabled, startIcon: isVideoEnabled ? React.createElement(VideoOnIcon, null) : React.createElement(VideoOffIcon, null) }, !hasVideoInputDevices ? 'No Video' : isVideoEnabled ? 'Stop Video' : 'Start Video'));
}
