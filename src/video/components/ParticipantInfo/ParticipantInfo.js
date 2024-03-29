import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AudioLevelIndicator from '../AudioLevelIndicator/AudioLevelIndicator';
import AvatarIcon from '../../icons/AvatarIcon';
import NetworkQualityLevel from '../NetworkQualityLevel/NetworkQualityLevel';
import PinIcon from './PinIcon/PinIcon';
import ScreenShareIcon from '../../icons/ScreenShareIcon';
import Typography from '@material-ui/core/Typography';
import useIsTrackSwitchedOff from '../../hooks/useIsTrackSwitchedOff/useIsTrackSwitchedOff';
import usePublications from '../../hooks/usePublications/usePublications';
import useTrack from '../../hooks/useTrack/useTrack';
import useParticipantIsReconnecting from '../../hooks/useParticipantIsReconnecting/useParticipantIsReconnecting';
import { useAppState } from '../../state';
const borderWidth = 2;
const useStyles = makeStyles((theme) => createStyles({
    container: {
        isolation: 'isolate',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        height: 0,
        overflow: 'hidden',
        marginBottom: '0.5em',
        '& video': {
            objectFit: 'contain !important',
        },
        borderRadius: '4px',
        border: `${theme.participantBorderWidth}px solid rgb(245, 248, 255)`,
        paddingTop: `calc(${(9 / 16) * 100}% - ${theme.participantBorderWidth}px)`,
        background: 'black',
        [theme.breakpoints.down('sm')]: {
            height: theme.sidebarMobileHeight,
            width: `${(theme.sidebarMobileHeight * 16) / 9}px`,
            marginRight: '8px',
            marginBottom: '0',
            fontSize: '12px',
            paddingTop: `${theme.sidebarMobileHeight - 2}px`,
        },
    },
    innerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    infoContainer: {
        position: 'absolute',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        width: '100%',
        background: 'transparent',
        top: 0,
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
        [theme.breakpoints.down('sm')]: {
            '& svg': {
                transform: 'scale(0.7)',
            },
        },
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
    screenShareIconContainer: {
        background: 'rgba(0, 0, 0, 0.5)',
        padding: '0.18em 0.3em',
        marginRight: '0.3em',
        display: 'flex',
        '& path': {
            fill: 'white',
        },
    },
    identity: {
        background: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        padding: '0.18em 0.3em 0.18em 0',
        margin: 0,
        display: 'flex',
        alignItems: 'center',
    },
    infoRowBottom: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    typography: {
        color: 'white',
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.75rem',
        },
    },
    hideParticipant: {
        display: 'none',
    },
    cursorPointer: {
        cursor: 'pointer',
    },
    galleryView: {
        border: `${theme.participantBorderWidth}px solid ${theme.galleryViewBackgroundColor}`,
        borderRadius: '8px',
        [theme.breakpoints.down('sm')]: {
            position: 'relative',
            width: '100%',
            height: '100%',
            padding: '0',
            fontSize: '12px',
            margin: '0',
            '& video': {
                objectFit: 'cover !important',
            },
        },
    },
    dominantSpeaker: {
        border: `solid ${borderWidth}px #7BEAA5`,
    },
}));
export default function ParticipantInfo({ participant, onClick, isSelected, children, isLocalParticipant, hideParticipant, isDominantSpeaker, }) {
    const publications = usePublications(participant);
    const audioPublication = publications.find(p => p.kind === 'audio');
    const videoPublication = publications.find(p => !p.trackName.includes('screen') && p.kind === 'video');
    const isVideoEnabled = Boolean(videoPublication);
    const isScreenShareEnabled = publications.find(p => p.trackName.includes('screen'));
    const videoTrack = useTrack(videoPublication);
    const isVideoSwitchedOff = useIsTrackSwitchedOff(videoTrack);
    const audioTrack = useTrack(audioPublication);
    const isParticipantReconnecting = useParticipantIsReconnecting(participant);
    const { isGalleryViewActive } = useAppState();
    const classes = useStyles();
    return (React.createElement("div", { className: clsx(classes.container, {
            [classes.hideParticipant]: hideParticipant,
            [classes.cursorPointer]: Boolean(onClick),
            [classes.dominantSpeaker]: isDominantSpeaker,
            [classes.galleryView]: isGalleryViewActive,
        }), onClick: onClick, "data-cy-participant": participant.identity },
        React.createElement("div", { className: classes.infoContainer },
            React.createElement(NetworkQualityLevel, { participant: participant }),
            React.createElement("div", { className: classes.infoRowBottom },
                isScreenShareEnabled && (React.createElement("span", { className: classes.screenShareIconContainer },
                    React.createElement(ScreenShareIcon, null))),
                React.createElement("span", { className: classes.identity },
                    React.createElement(AudioLevelIndicator, { audioTrack: audioTrack }),
                    React.createElement(Typography, { variant: "body1", className: classes.typography, component: "span" },
                        participant.identity,
                        isLocalParticipant && ' (You)'))),
            React.createElement("div", null, isSelected && React.createElement(PinIcon, null))),
        React.createElement("div", { className: classes.innerContainer },
            (!isVideoEnabled || isVideoSwitchedOff) && (React.createElement("div", { className: classes.avatarContainer },
                React.createElement(AvatarIcon, null))),
            isParticipantReconnecting && (React.createElement("div", { className: classes.reconnectingContainer },
                React.createElement(Typography, { variant: "body1", className: classes.typography }, "Reconnecting..."))),
            children)));
}
