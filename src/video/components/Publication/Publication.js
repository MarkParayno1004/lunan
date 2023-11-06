import React from 'react';
import useTrack from '../../hooks/useTrack/useTrack';
import VideoTrack from '../VideoTrack/VideoTrack';
export default function Publication({ publication, isLocalParticipant, videoPriority }) {
    const track = useTrack(publication);
    if (!track)
        return null;
    // Even though we only have one case here, let's keep this switch() in case
    // we even need to add a 'data' case for rendering DataTracks.
    switch (track.kind) {
        case 'video':
            return (React.createElement(VideoTrack, { track: track, priority: videoPriority, isLocal: !track.name.includes('screen') && isLocalParticipant }));
        // All participant audio tracks are rendered in ParticipantAudioTracks.tsx
        default:
            return null;
    }
}
