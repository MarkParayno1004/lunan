import React from 'react';
import ParticipantInfo from '../ParticipantInfo/ParticipantInfo';
import ParticipantTracks from '../ParticipantTracks/ParticipantTracks';
export function Participant({ participant, videoOnly, enableScreenShare, onClick, isSelected, isLocalParticipant, hideParticipant, isDominantSpeaker, }) {
    return (React.createElement(ParticipantInfo, { participant: participant, onClick: onClick, isSelected: isSelected, isLocalParticipant: isLocalParticipant, hideParticipant: hideParticipant, isDominantSpeaker: isDominantSpeaker },
        React.createElement(ParticipantTracks, { participant: participant, videoOnly: videoOnly, enableScreenShare: enableScreenShare, isLocalParticipant: isLocalParticipant })));
}
export default React.memo(Participant);
