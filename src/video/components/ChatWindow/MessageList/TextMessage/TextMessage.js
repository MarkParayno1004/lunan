import React from 'react';
import clsx from 'clsx';
import { Link } from '@material-ui/core';
import linkify from 'linkify-it';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    messageContainer: {
        borderRadius: '16px',
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.5em 0.8em 0.6em',
        margin: '0.3em 0 0',
        wordBreak: 'break-word',
        backgroundColor: '#E1E3EA',
        hyphens: 'auto',
        whiteSpace: 'pre-wrap',
    },
    isLocalParticipant: {
        backgroundColor: '#CCE4FF',
    },
});
function addLinks(text) {
    const matches = linkify().match(text);
    if (!matches)
        return text;
    const results = [];
    let lastIndex = 0;
    matches.forEach((match, i) => {
        results.push(text.slice(lastIndex, match.index));
        results.push(React.createElement(Link, { target: "_blank", rel: "noreferrer", href: match.url, key: i }, match.text));
        lastIndex = match.lastIndex;
    });
    results.push(text.slice(lastIndex, text.length));
    return results;
}
export default function TextMessage({ body, isLocalParticipant }) {
    const classes = useStyles();
    return (React.createElement("div", null,
        React.createElement("div", { className: clsx(classes.messageContainer, {
                [classes.isLocalParticipant]: isLocalParticipant,
            }) },
            React.createElement("div", null, addLinks(body)))));
}
