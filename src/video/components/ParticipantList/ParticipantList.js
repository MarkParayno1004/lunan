import React from 'react';
import clsx from 'clsx';
import Participant from '../Participant/Participant';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import useMainParticipant from '../../hooks/useMainParticipant/useMainParticipant';
import useParticipantsContext from '../../hooks/useParticipantsContext/useParticipantsContext';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import useSelectedParticipant from '../VideoProvider/useSelectedParticipant/useSelectedParticipant';
import useScreenShareParticipant from '../../hooks/useScreenShareParticipant/useScreenShareParticipant';
const useStyles = makeStyles((theme) => createStyles({
    container: {
        overflowY: 'auto',
        background: 'rgb(79, 83, 85)',
        gridArea: '1 / 2 / 1 / 3',
        zIndex: 5,
        [theme.breakpoints.down('sm')]: {
            gridArea: '2 / 1 / 3 / 3',
            overflowY: 'initial',
            overflowX: 'auto',
            display: 'flex',
        },
    },
    transparentBackground: {
        background: 'transparent',
    },
    scrollContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    innerScrollContainer: {
        width: `calc(${theme.sidebarWidth}px - 3em)`,
        padding: '1.5em 0',
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
            padding: `${theme.sidebarMobilePadding}px`,
            display: 'flex',
        },
    },
}));
export default function ParticipantList() {
    const classes = useStyles();
    const { room } = useVideoContext();
    const localParticipant = room.localParticipant;
    const { speakerViewParticipants } = useParticipantsContext();
    const [selectedParticipant, setSelectedParticipant] = useSelectedParticipant();
    const screenShareParticipant = useScreenShareParticipant();
    const mainParticipant = useMainParticipant();
    const isRemoteParticipantScreenSharing = screenShareParticipant && screenShareParticipant !== localParticipant;
    if (speakerViewParticipants.length === 0)
        return null; // Don't render this component if there are no remote participants.
    return (React.createElement("aside", { className: clsx(classes.container, {
            [classes.transparentBackground]: !isRemoteParticipantScreenSharing,
        }) },
        React.createElement("div", { className: classes.scrollContainer },
            React.createElement("div", { className: classes.innerScrollContainer },
                React.createElement(Participant, { participant: localParticipant, isLocalParticipant: true }),
                speakerViewParticipants.map(participant => {
                    const isSelected = participant === selectedParticipant;
                    const hideParticipant = participant === mainParticipant && participant !== screenShareParticipant && !isSelected;
                    return (React.createElement(Participant, { key: participant.sid, participant: participant, isSelected: participant === selectedParticipant, onClick: () => setSelectedParticipant(participant), hideParticipant: hideParticipant }));
                })))));
}
