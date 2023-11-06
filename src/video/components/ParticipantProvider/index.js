import React, { createContext } from 'react';
import useGalleryViewParticipants from '../../hooks/useGalleryViewParticipants/useGalleryViewParticipants';
import useSpeakerViewParticipants from '../../hooks/useSpeakerViewParticipants/useSpeakerViewParticipants';
export const ParticipantContext = createContext(null);
export const ParticipantProvider = ({ children }) => {
    const mobileGalleryViewParticipants = useGalleryViewParticipants(true);
    const galleryViewParticipants = useGalleryViewParticipants();
    const speakerViewParticipants = useSpeakerViewParticipants();
    return (React.createElement(ParticipantContext.Provider, { value: {
            mobileGalleryViewParticipants,
            galleryViewParticipants,
            speakerViewParticipants,
        } }, children));
};
