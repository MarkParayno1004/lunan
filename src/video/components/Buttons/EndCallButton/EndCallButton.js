import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
const useStyles = makeStyles((theme) => createStyles({
    button: {
        background: theme.brand,
        color: 'white',
        '&:hover': {
            background: '#600101',
        },
    },
}));
export default function EndCallButton(props) {
    const classes = useStyles();
    const { room } = useVideoContext();
    return (React.createElement(Button, { onClick: () => room.disconnect(), className: clsx(classes.button, props.className), "data-cy-disconnect": true }, "Disconnect"));
}
