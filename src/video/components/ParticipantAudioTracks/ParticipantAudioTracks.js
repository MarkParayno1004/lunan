import React from 'react';
import useParticipants from '../../hooks/useParticipants/useParticipants';
import useTracks from '../../hooks/useTracks/useTracks';
import AudioTrack from '../AudioTrack/AudioTrack';
function Participant({ participant }) {
    const tracks = useTracks(participant);
    const audioTrack = tracks.find(track => track.kind === 'audio');
    if ((audioTrack === null || audioTrack === void 0 ? void 0 : audioTrack.kind) === 'audio')
        return React.createElement(AudioTrack, { track: audioTrack });
    return null;
}
/*
  This ParticipantAudioTracks component will render the audio track for all participants in the room.
  It is in a separate component so that the audio tracks will always be rendered, and that they will never be
  unnecessarily unmounted/mounted as the user switches between Gallery View and Speaker View.
*/
export function ParticipantAudioTracks() {
    const participants = useParticipants();
    return (React.createElement(React.Fragment, null, participants.map(participant => (React.createElement(Participant, { key: participant.sid, participant: participant })))));
}
