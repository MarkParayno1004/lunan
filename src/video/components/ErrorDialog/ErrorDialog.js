import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import enhanceMessage from './enhanceMessage';
function ErrorDialog({ dismissError, error }) {
    const { message, code } = error || {};
    const enhancedMessage = enhanceMessage(message, code);
    return (React.createElement(Dialog, { open: error !== null, onClose: () => dismissError(), fullWidth: true, maxWidth: "xs" },
        React.createElement(DialogTitle, null, "ERROR"),
        React.createElement(DialogContent, null,
            React.createElement(DialogContentText, null, enhancedMessage),
            Boolean(code) && (React.createElement("pre", null,
                React.createElement("code", null,
                    "Error Code: ",
                    code)))),
        React.createElement(DialogActions, null,
            React.createElement(Button, { onClick: () => dismissError(), color: "primary", autoFocus: true }, "OK"))));
}
export default ErrorDialog;
