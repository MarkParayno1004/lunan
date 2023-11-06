import React from 'react';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '../../icons/ErrorIcon';
import { IconButton, makeStyles, Typography } from '@material-ui/core';
import MUISnackbar from '@material-ui/core/Snackbar';
import WarningIcon from '../../icons/WarningIcon';
import InfoIcon from '../../icons/InfoIcon';
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '400px',
        minHeight: '50px',
        background: 'white',
        padding: '1em',
        borderRadius: '3px',
        boxShadow: '0 12px 24px 4px rgba(40,42,43,0.2)',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    contentContainer: {
        display: 'flex',
        lineHeight: 1.8,
    },
    iconContainer: {
        display: 'flex',
        padding: '0 1.3em 0 0.3em',
        transform: 'translateY(3px)',
    },
    headline: {
        fontWeight: 'bold',
    },
    error: {
        borderLeft: '4px solid #D61F1F',
    },
    warning: {
        borderLeft: '4px solid #E46216',
    },
    info: {
        borderLeft: '4px solid #0263e0',
    },
}));
export default function Snackbar({ headline, message, variant, open, handleClose }) {
    const classes = useStyles();
    const handleOnClose = (_, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        handleClose === null || handleClose === void 0 ? void 0 : handleClose();
    };
    return (React.createElement(MUISnackbar, { anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        }, open: open, onClose: handleOnClose, autoHideDuration: 10000 },
        React.createElement("div", { className: clsx(classes.container, {
                [classes.error]: variant === 'error',
                [classes.warning]: variant === 'warning',
                [classes.info]: variant === 'info',
            }) },
            React.createElement("div", { className: classes.contentContainer },
                React.createElement("div", { className: classes.iconContainer },
                    variant === 'warning' && React.createElement(WarningIcon, null),
                    variant === 'error' && React.createElement(ErrorIcon, null),
                    variant === 'info' && React.createElement(InfoIcon, null)),
                React.createElement("div", null,
                    React.createElement(Typography, { variant: "body1", className: classes.headline, component: "span" }, headline),
                    React.createElement(Typography, { variant: "body1", component: "span" },
                        ' ',
                        message))),
            React.createElement("div", null, handleClose && (React.createElement(IconButton, { size: "small", "aria-label": "close", color: "inherit", onClick: handleClose },
                React.createElement(CloseIcon, { fontSize: "small" })))))));
}
