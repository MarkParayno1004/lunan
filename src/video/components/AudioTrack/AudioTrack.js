import { useEffect, useRef } from 'react';
import { useAppState } from '../../state';
export default function AudioTrack({ track }) {
    const { activeSinkId } = useAppState();
    const audioEl = useRef();
    useEffect(() => {
        audioEl.current = track.attach();
        audioEl.current.setAttribute('data-cy-audio-track-name', track.name);
        document.body.appendChild(audioEl.current);
        return () => track.detach().forEach(el => {
            el.remove();
            // This addresses a Chrome issue where the number of WebMediaPlayers is limited.
            // See: https://github.com/twilio/twilio-video.js/issues/1528
            el.srcObject = null;
        });
    }, [track]);
    useEffect(() => {
        var _a, _b;
        (_b = (_a = audioEl.current) === null || _a === void 0 ? void 0 : _a.setSinkId) === null || _b === void 0 ? void 0 : _b.call(_a, activeSinkId);
    }, [activeSinkId]);
    return null;
}
