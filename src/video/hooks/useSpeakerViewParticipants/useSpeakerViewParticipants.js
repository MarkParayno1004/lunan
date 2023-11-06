import { useEffect, useState } from 'react';
import useDominantSpeaker from '../useDominantSpeaker/useDominantSpeaker';
import useVideoContext from '../useVideoContext/useVideoContext';
export default function useSpeakerViewParticipants() {
    var _a;
    const { room } = useVideoContext();
    const dominantSpeaker = useDominantSpeaker();
    const [participants, setParticipants] = useState(Array.from((_a = room === null || room === void 0 ? void 0 : room.participants.values()) !== null && _a !== void 0 ? _a : []));
    // When the dominant speaker changes, they are moved to the front of the participants array.
    // This means that the most recent dominant speakers will always be near the top of the
    // ParticipantStrip component.
    useEffect(() => {
        if (dominantSpeaker) {
            setParticipants(prevParticipants => [
                dominantSpeaker,
                ...prevParticipants.filter(participant => participant !== dominantSpeaker),
            ]);
        }
    }, [dominantSpeaker]);
    useEffect(() => {
        if (room) {
            setParticipants(Array.from(room.participants.values()));
            const participantConnected = (participant) => setParticipants(prevParticipants => [...prevParticipants, participant]);
            const participantDisconnected = (participant) => setParticipants(prevParticipants => prevParticipants.filter(p => p !== participant));
            room.on('participantConnected', participantConnected);
            room.on('participantDisconnected', participantDisconnected);
            return () => {
                room.off('participantConnected', participantConnected);
                room.off('participantDisconnected', participantDisconnected);
            };
        }
    }, [room]);
    return participants;
}
