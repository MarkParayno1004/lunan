import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AudioLevelIndicator from '../AudioLevelIndicator/AudioLevelIndicator';
import AvatarIcon from '../../icons/AvatarIcon';
import NetworkQualityLevel from '../NetworkQualityLevel/NetworkQualityLevel';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import useIsRecording from '../../hooks/useIsRecording/useIsRecording';
import useIsTrackSwitchedOff from '../../hooks/useIsTrackSwitchedOff/useIsTrackSwitchedOff';
import useParticipantIsReconnecting from '../../hooks/useParticipantIsReconnecting/useParticipantIsReconnecting';
import usePublications from '../../hooks/usePublications/usePublications';
import useScreenShareParticipant from '../../hooks/useScreenShareParticipant/useScreenShareParticipant';
import useTrack from '../../hooks/useTrack/useTrack';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    identity: {
        background: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        padding: '0.1em 0.3em 0.1em 0',
        display: 'inline-flex',
        '& svg': {
            marginLeft: '0.3em',
        },
        marginRight: '0.4em',
        alignItems: 'center',
    },
    infoContainer: {
        position: 'absolute',
        zIndex: 2,
        height: '100%',
        width: '100%',
    },
    reconnectingContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(40, 42, 43, 0.75)',
        zIndex: 1,
    },
    fullWidth: {
        gridArea: '1 / 1 / 2 / 3',
        [theme.breakpoints.down('sm')]: {
            gridArea: '1 / 1 / 3 / 3',
        },
    },
    avatarContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'black',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 1,
        '& svg': {
            transform: 'scale(2)',
        },
    },
    recordingIndicator: {
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        padding: '0.1em 0.3em 0.1em 0',
        fontSize: '1.2rem',
        height: '28px',
        [theme.breakpoints.down('sm')]: {
            bottom: 'auto',
            right: 0,
            top: 0,
        },
    },
    circle: {
        height: '12px',
        width: '12px',
        background: 'red',
        borderRadius: '100%',
        margin: '0 0.6em',
        animation: `1.25s $pulsate ease-out infinite`,
    },
    '@keyframes pulsate': {
        '0%': {
            background: `#A90000`,
        },
        '50%': {
            background: '#f00',
        },
        '100%': {
            background: '#A90000',
        },
    },
}));
export default function MainParticipantInfo({ participant, children }) {
    const classes = useStyles();
    const { room } = useVideoContext();
    const localParticipant = room.localParticipant;
    const isLocal = localParticipant === participant;
    const screenShareParticipant = useScreenShareParticipant();
    const isRemoteParticipantScreenSharing = screenShareParticipant && screenShareParticipant !== localParticipant;
    const publications = usePublications(participant);
    const videoPublication = publications.find(p => !p.trackName.includes('screen') && p.kind === 'video');
    const screenSharePublication = publications.find(p => p.trackName.includes('screen'));
    const videoTrack = useTrack(screenSharePublication || videoPublication);
    const isVideoEnabled = Boolean(videoTrack);
    const audioPublication = publications.find(p => p.kind === 'audio');
    const audioTrack = useTrack(audioPublication);
    const isVideoSwitchedOff = useIsTrackSwitchedOff(videoTrack);
    const isParticipantReconnecting = useParticipantIsReconnecting(participant);
    const isRecording = useIsRecording();
    return (React.createElement("div", { "data-cy-main-participant": true, "data-cy-participant": participant.identity, className: clsx(classes.container, {
            [classes.fullWidth]: !isRemoteParticipantScreenSharing,
        }) },
        React.createElement("div", { className: classes.infoContainer },
            React.createElement("div", { style: { display: 'flex' } },
                React.createElement("div", { className: classes.identity },
                    React.createElement(AudioLevelIndicator, { audioTrack: audioTrack }),
                    React.createElement(Typography, { variant: "body1", color: "inherit" },
                        participant.identity,
                        isLocal && ' (You)',
                        screenSharePublication && ' - Screen')),
                React.createElement(NetworkQualityLevel, { participant: participant })),
            isRecording && (React.createElement(Tooltip, { title: "All participants' audio and video is currently being recorded. Visit the app settings to stop recording.", placement: "top" },
                React.createElement("div", { className: classes.recordingIndicator },
                    React.createElement("div", { className: classes.circle }),
                    React.createElement(Typography, { variant: "body1", color: "inherit", "data-cy-recording-indicator": true }, "Recording"))))),
        (!isVideoEnabled || isVideoSwitchedOff) && (React.createElement("div", { className: classes.avatarContainer },
            React.createElement(AvatarIcon, null))),
        isParticipantReconnecting && (React.createElement("div", { className: classes.reconnectingContainer },
            React.createElement(Typography, { variant: "body1", style: { color: 'white' } }, "Reconnecting..."))),
        children));
}
