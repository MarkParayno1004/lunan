import React, { useRef, useEffect } from 'react';
import { styled } from '@material-ui/core/styles';
import useMediaStreamTrack from '../../hooks/useMediaStreamTrack/useMediaStreamTrack';
import useVideoTrackDimensions from '../../hooks/useVideoTrackDimensions/useVideoTrackDimensions';
const Video = styled('video')({
    width: '100%',
    height: '100%',
});
export default function VideoTrack({ track, isLocal, priority }) {
    var _a, _b;
    const ref = useRef(null);
    const mediaStreamTrack = useMediaStreamTrack(track);
    const dimensions = useVideoTrackDimensions(track);
    const isPortrait = ((_a = dimensions === null || dimensions === void 0 ? void 0 : dimensions.height) !== null && _a !== void 0 ? _a : 0) > ((_b = dimensions === null || dimensions === void 0 ? void 0 : dimensions.width) !== null && _b !== void 0 ? _b : 0);
    useEffect(() => {
        const el = ref.current;
        el.muted = true;
        if (track.setPriority && priority) {
            track.setPriority(priority);
        }
        track.attach(el);
        return () => {
            track.detach(el);
            // This addresses a Chrome issue where the number of WebMediaPlayers is limited.
            // See: https://github.com/twilio/twilio-video.js/issues/1528
            el.srcObject = null;
            if (track.setPriority && priority) {
                // Passing `null` to setPriority will set the track's priority to that which it was published with.
                track.setPriority(null);
            }
        };
    }, [track, priority]);
    // The local video track is mirrored if it is not facing the environment.
    const isFrontFacing = (mediaStreamTrack === null || mediaStreamTrack === void 0 ? void 0 : mediaStreamTrack.getSettings().facingMode) !== 'environment';
    const style = {
        transform: isLocal && isFrontFacing ? 'scaleX(-1)' : '',
        objectFit: isPortrait || track.name.includes('screen') ? 'contain' : 'cover',
    };
    return React.createElement(Video, { ref: ref, style: style });
}
