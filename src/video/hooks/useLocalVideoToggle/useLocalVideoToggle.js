import { useCallback, useState } from 'react';
import useVideoContext from '../useVideoContext/useVideoContext';
export default function useLocalVideoToggle() {
    const { room, localTracks, getLocalVideoTrack, removeLocalVideoTrack, onError } = useVideoContext();
    const localParticipant = room === null || room === void 0 ? void 0 : room.localParticipant;
    const videoTrack = localTracks.find(track => !track.name.includes('screen') && track.kind === 'video');
    const [isPublishing, setIspublishing] = useState(false);
    const toggleVideoEnabled = useCallback(() => {
        if (!isPublishing) {
            if (videoTrack) {
                const localTrackPublication = localParticipant === null || localParticipant === void 0 ? void 0 : localParticipant.unpublishTrack(videoTrack);
                // TODO: remove when SDK implements this event. See: https://issues.corp.twilio.com/browse/JSDK-2592
                localParticipant === null || localParticipant === void 0 ? void 0 : localParticipant.emit('trackUnpublished', localTrackPublication);
                removeLocalVideoTrack();
            }
            else {
                setIspublishing(true);
                getLocalVideoTrack()
                    .then((track) => localParticipant === null || localParticipant === void 0 ? void 0 : localParticipant.publishTrack(track, { priority: 'low' }))
                    .catch(onError)
                    .finally(() => {
                    setIspublishing(false);
                });
            }
        }
    }, [videoTrack, localParticipant, getLocalVideoTrack, isPublishing, onError, removeLocalVideoTrack]);
    return [!!videoTrack, toggleVideoEnabled];
}
