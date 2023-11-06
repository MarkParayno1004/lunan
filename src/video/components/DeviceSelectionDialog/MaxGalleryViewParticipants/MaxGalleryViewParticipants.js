import React from 'react';
import { FormControl, MenuItem, Typography, Select, Grid } from '@material-ui/core';
import { useAppState } from '../../../state';
const MAX_PARTICIPANT_OPTIONS = [6, 12, 24];
export default function MaxGalleryViewParticipants() {
    const { maxGalleryViewParticipants, setMaxGalleryViewParticipants } = useAppState();
    return (React.createElement("div", null,
        React.createElement(Typography, { variant: "subtitle2", gutterBottom: true }, "Max Gallery View Participants"),
        React.createElement(Grid, { container: true, alignItems: "center", justifyContent: "space-between" },
            React.createElement("div", { className: "inputSelect" },
                React.createElement(FormControl, { fullWidth: true },
                    React.createElement(Select, { onChange: e => setMaxGalleryViewParticipants(parseInt(e.target.value)), value: maxGalleryViewParticipants, variant: "outlined" }, MAX_PARTICIPANT_OPTIONS.map(option => (React.createElement(MenuItem, { value: option, key: option }, option)))))))));
}
