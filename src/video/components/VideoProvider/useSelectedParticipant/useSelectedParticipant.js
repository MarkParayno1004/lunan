import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAppState } from '../../../state';
export const selectedParticipantContext = createContext(null);
export default function useSelectedParticipant() {
    const [selectedParticipant, setSelectedParticipant] = useContext(selectedParticipantContext);
    return [selectedParticipant, setSelectedParticipant];
}
export function SelectedParticipantProvider({ room, children }) {
    const { isGalleryViewActive } = useAppState();
    const [selectedParticipant, _setSelectedParticipant] = useState(null);
    const setSelectedParticipant = (participant) => _setSelectedParticipant(prevParticipant => (prevParticipant === participant ? null : participant));
    useEffect(() => {
        if (isGalleryViewActive) {
            _setSelectedParticipant(null);
        }
    }, [isGalleryViewActive]);
    useEffect(() => {
        if (room) {
            const onDisconnect = () => _setSelectedParticipant(null);
            const handleParticipantDisconnected = (participant) => _setSelectedParticipant(prevParticipant => (prevParticipant === participant ? null : prevParticipant));
            room.on('disconnected', onDisconnect);
            room.on('participantDisconnected', handleParticipantDisconnected);
            return () => {
                room.off('disconnected', onDisconnect);
                room.off('participantDisconnected', handleParticipantDisconnected);
            };
        }
    }, [room]);
    return (React.createElement(selectedParticipantContext.Provider, { value: [selectedParticipant, setSelectedParticipant] }, children));
}
