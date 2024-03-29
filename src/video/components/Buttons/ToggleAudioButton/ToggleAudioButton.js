import React from 'react';
import Button from '@material-ui/core/Button';
import MicIcon from '../../../icons/MicIcon';
import MicOffIcon from '../../../icons/MicOffIcon';
import useLocalAudioToggle from '../../../hooks/useLocalAudioToggle/useLocalAudioToggle';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
export default function ToggleAudioButton(props) {
    const [isAudioEnabled, toggleAudioEnabled] = useLocalAudioToggle();
    const { localTracks } = useVideoContext();
    const hasAudioTrack = localTracks.some(track => track.kind === 'audio');
    return (React.createElement(Button, { className: props.className, onClick: toggleAudioEnabled, disabled: !hasAudioTrack || props.disabled, startIcon: isAudioEnabled ? React.createElement(MicIcon, null) : React.createElement(MicOffIcon, null), "data-cy-audio-toggle": true }, !hasAudioTrack ? 'No Audio' : isAudioEnabled ? 'Mute' : 'Unmute'));
}
