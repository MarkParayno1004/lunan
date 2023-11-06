import { useState, useEffect } from 'react';
import { getDeviceInfo } from '../../utils';
export default function useDevices() {
    const [deviceInfo, setDeviceInfo] = useState({
        audioInputDevices: [],
        videoInputDevices: [],
        audioOutputDevices: [],
        hasAudioInputDevices: false,
        hasVideoInputDevices: false,
    });
    useEffect(() => {
        const getDevices = () => getDeviceInfo().then(devices => setDeviceInfo(devices));
        navigator.mediaDevices.addEventListener('devicechange', getDevices);
        getDevices();
        return () => {
            navigator.mediaDevices.removeEventListener('devicechange', getDevices);
        };
    }, []);
    return deviceInfo;
}
