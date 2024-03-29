import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import useParticipantIsReconnecting from '../../../hooks/useParticipantIsReconnecting/useParticipantIsReconnecting';
import { Tooltip } from '@material-ui/core';
const useStyles = makeStyles({
    indicator: {
        width: '10px',
        height: '10px',
        borderRadius: '100%',
        background: '#0c0',
        display: 'inline-block',
        marginRight: '3px',
    },
    isReconnecting: {
        background: '#ffb100',
    },
});
export default function ParticipantConnectionIndicator({ participant }) {
    const isReconnecting = useParticipantIsReconnecting(participant);
    const classes = useStyles();
    return (React.createElement(Tooltip, { title: isReconnecting ? 'Participant is reconnecting' : 'Participant is connected' },
        React.createElement("span", { className: clsx(classes.indicator, { [classes.isReconnecting]: isReconnecting }) })));
}
