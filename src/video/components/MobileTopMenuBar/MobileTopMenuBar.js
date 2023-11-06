import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import EndCallButton from '../Buttons/EndCallButton/EndCallButton';
import Menu from '../MenuBar/Menu/Menu';
const useStyles = makeStyles((theme) => ({
    container: {
        background: 'white',
        paddingLeft: '1em',
        display: 'none',
        height: `${theme.mobileTopBarHeight}px`,
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
        },
    },
    endCallButton: {
        height: '28px',
        fontSize: '0.85rem',
        padding: '0 0.6em',
    },
    settingsButton: {
        [theme.breakpoints.down('sm')]: {
            height: '28px',
            minWidth: '28px',
            border: '1px solid rgb(136, 140, 142)',
            padding: 0,
            margin: '0 1em',
        },
    },
}));
export default function MobileTopMenuBar() {
    const classes = useStyles();
    const { room } = useVideoContext();
    return (React.createElement(Grid, { container: true, alignItems: "center", justifyContent: "space-between", className: classes.container },
        React.createElement(Typography, { variant: "subtitle1" }, room.name),
        React.createElement("div", null,
            React.createElement(EndCallButton, { className: classes.endCallButton }),
            React.createElement(Menu, { buttonClassName: classes.settingsButton }))));
}
