import { useEffect, useState } from 'react';
import useVideoContext from '../useVideoContext/useVideoContext';
export default function useDominantSpeaker(includeNull = false) {
    var _a;
    const { room } = useVideoContext();
    const [dominantSpeaker, setDominantSpeaker] = useState((_a = room === null || room === void 0 ? void 0 : room.dominantSpeaker) !== null && _a !== void 0 ? _a : null);
    useEffect(() => {
        if (room) {
            // Sometimes, the 'dominantSpeakerChanged' event can emit 'null', which means that
            // there is no dominant speaker. If we change the main participant when 'null' is
            // emitted, the effect can be jarring to the user. Here we ignore any 'null' values
            // and continue to display the previous dominant speaker as the main participant.
            const handleDominantSpeakerChanged = (newDominantSpeaker) => {
                if (includeNull || newDominantSpeaker !== null) {
                    setDominantSpeaker(newDominantSpeaker);
                }
            };
            // Since 'null' values are ignored, we will need to listen for the 'participantDisconnected'
            // event, so we can set the dominantSpeaker to 'null' when they disconnect.
            const handleParticipantDisconnected = (participant) => {
                setDominantSpeaker(prevDominantSpeaker => {
                    return prevDominantSpeaker === participant ? null : prevDominantSpeaker;
                });
            };
            room.on('dominantSpeakerChanged', handleDominantSpeakerChanged);
            room.on('participantDisconnected', handleParticipantDisconnected);
            return () => {
                room.off('dominantSpeakerChanged', handleDominantSpeakerChanged);
                room.off('participantDisconnected', handleParticipantDisconnected);
            };
        }
    }, [room, includeNull]);
    return dominantSpeaker;
}
