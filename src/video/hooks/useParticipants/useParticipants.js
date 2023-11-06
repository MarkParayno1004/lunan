import { useEffect, useState } from 'react';
import useVideoContext from '../useVideoContext/useVideoContext';
/**
 * This hook returns an array of the video room's participants. Unlike the hooks
 * "useSpeakerViewParticipants" and "useGalleryViewParticipants", this hook does not reorder
 * the list of participants whenever the dominantSpeaker changes. This will prevent unnecessary
 * re-renders because components that use this hook will only update when a participant connects
 * to or disconnects from the room.
 */
export default function useParticipants() {
    var _a;
    const { room } = useVideoContext();
    const [participants, setParticipants] = useState(Array.from((_a = room === null || room === void 0 ? void 0 : room.participants.values()) !== null && _a !== void 0 ? _a : []));
    useEffect(() => {
        if (room) {
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
