import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_VIDEO_CONSTRAINTS } from '../../constants';
import useDevices from '../useDevices/useDevices';
import useMediaStreamTrack from '../useMediaStreamTrack/useMediaStreamTrack';
import useVideoContext from '../useVideoContext/useVideoContext';
export default function useFlipCameraToggle() {
    const { localTracks } = useVideoContext();
    const [supportsFacingMode, setSupportsFacingMode] = useState(false);
    const videoTrack = localTracks.find(track => !track.name.includes('screen') && track.kind === 'video');
    const mediaStreamTrack = useMediaStreamTrack(videoTrack);
    const { videoInputDevices } = useDevices();
    useEffect(() => {
        // The 'supportsFacingMode' variable determines if this component is rendered
        // If 'facingMode' exists, we will set supportsFacingMode to true.
        // However, if facingMode is ever undefined again (when the user unpublishes video), we
        // won't set 'supportsFacingMode' to false. This prevents the icon from briefly
        // disappearing when the user switches their front/rear camera.
        const currentFacingMode = mediaStreamTrack === null || mediaStreamTrack === void 0 ? void 0 : mediaStreamTrack.getSettings().facingMode;
        if (currentFacingMode && supportsFacingMode === false) {
            setSupportsFacingMode(true);
        }
    }, [mediaStreamTrack, supportsFacingMode]);
    const toggleFacingMode = useCallback(() => {
        const newFacingMode = (mediaStreamTrack === null || mediaStreamTrack === void 0 ? void 0 : mediaStreamTrack.getSettings().facingMode) === 'user' ? 'environment' : 'user';
        videoTrack === null || videoTrack === void 0 ? void 0 : videoTrack.restart(Object.assign(Object.assign({}, DEFAULT_VIDEO_CONSTRAINTS), { facingMode: newFacingMode }));
    }, [mediaStreamTrack, videoTrack]);
    return {
        flipCameraDisabled: !videoTrack,
        toggleFacingMode,
        flipCameraSupported: supportsFacingMode && videoInputDevices.length > 1,
    };
}
