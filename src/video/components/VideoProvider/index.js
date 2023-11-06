import React, { createContext, useCallback, useState } from "react";
import { SelectedParticipantProvider } from "./useSelectedParticipant/useSelectedParticipant";
import AttachVisibilityHandler from "./AttachVisibilityHandler/AttachVisibilityHandler";
import useHandleRoomDisconnection from "./useHandleRoomDisconnection/useHandleRoomDisconnection";
import useHandleTrackPublicationFailed from "./useHandleTrackPublicationFailed/useHandleTrackPublicationFailed";
import useLocalTracks from "./useLocalTracks/useLocalTracks";
import useRestartAudioTrackOnDeviceChange from "./useRestartAudioTrackOnDeviceChange/useRestartAudioTrackOnDeviceChange";
import useRoom from "./useRoom/useRoom";
import useScreenShareToggle from "./useScreenShareToggle/useScreenShareToggle";
export const VideoContext = createContext(null);
export function VideoProvider({ options, children, onError = () => {} }) {
  const onErrorCallback = useCallback(
    (error) => {
      console.log(`ERROR: ${error.message}`, error);
      onError(error);
    },
    [onError]
  );
  const {
    localTracks,
    getLocalVideoTrack,
    isAcquiringLocalTracks,
    removeLocalAudioTrack,
    removeLocalVideoTrack,
    getAudioAndVideoTracks,
  } = useLocalTracks();
  const { room, isConnecting, connect } = useRoom(
    localTracks,
    onErrorCallback,
    options
  );
  const [isSharingScreen, toggleScreenShare] = useScreenShareToggle(
    room,
    onError
  );
  // Register callback functions to be called on room disconnect.
  useHandleRoomDisconnection(
    room,
    onError,
    removeLocalAudioTrack,
    removeLocalVideoTrack,
    isSharingScreen,
    toggleScreenShare
  );
  useHandleTrackPublicationFailed(room, onError);
  useRestartAudioTrackOnDeviceChange(localTracks);
  const [isBackgroundSelectionOpen, setIsBackgroundSelectionOpen] =
    useState(false);
  const videoTrack = localTracks.find(
    (track) => !track.name.includes("screen") && track.kind === "video"
  );
  return React.createElement(
    VideoContext.Provider,
    {
      value: {
        room,
        localTracks,
        isConnecting,
        onError: onErrorCallback,
        getLocalVideoTrack,
        connect,
        isAcquiringLocalTracks,
        removeLocalVideoTrack,
        isSharingScreen,
        toggleScreenShare,
        getAudioAndVideoTracks,
        isBackgroundSelectionOpen,
        setIsBackgroundSelectionOpen,
      },
    },
    React.createElement(SelectedParticipantProvider, { room: room }, children),
    React.createElement(AttachVisibilityHandler, null)
  );
}
