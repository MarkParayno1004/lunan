import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useParticipantNetworkQualityLevel from '../../hooks/useParticipantNetworkQualityLevel/useParticipantNetworkQualityLevel';
const useStyles = makeStyles({
    outerContainer: {
        width: '2em',
        height: '2em',
        padding: '0.9em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.5)',
    },
    innerContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        '& div': {
            width: '2px',
            marginRight: '1px',
            '&:not(:last-child)': {
                borderRight: 'none',
            },
        },
    },
});
const STEP = 3;
const BARS_ARRAY = [0, 1, 2, 3, 4];
export default function NetworkQualityLevel({ participant }) {
    const classes = useStyles();
    const networkQualityLevel = useParticipantNetworkQualityLevel(participant);
    if (networkQualityLevel === null)
        return null;
    return (React.createElement("div", { className: classes.outerContainer },
        React.createElement("div", { className: classes.innerContainer }, BARS_ARRAY.map(level => (React.createElement("div", { key: level, style: {
                height: `${STEP * (level + 1)}px`,
                background: networkQualityLevel > level ? 'white' : 'rgba(255, 255, 255, 0.2)',
            } }))))));
}
