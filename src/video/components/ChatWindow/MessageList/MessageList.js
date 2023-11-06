import React from 'react';
import MessageInfo from './MessageInfo/MessageInfo';
import MessageListScrollContainer from './MessageListScrollContainer/MessageListScrollContainer';
import TextMessage from './TextMessage/TextMessage';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import MediaMessage from './MediaMessage/MediaMessage';
const getFormattedTime = (message) => { var _a; return (_a = message === null || message === void 0 ? void 0 : message.dateCreated) === null || _a === void 0 ? void 0 : _a.toLocaleTimeString('en-us', { hour: 'numeric', minute: 'numeric' }).toLowerCase(); };
export default function MessageList({ messages }) {
    const { room } = useVideoContext();
    const localParticipant = room.localParticipant;
    return (React.createElement(MessageListScrollContainer, { messages: messages }, messages.map((message, idx) => {
        var _a;
        const time = getFormattedTime(message);
        const previousTime = getFormattedTime(messages[idx - 1]);
        // Display the MessageInfo component when the author or formatted timestamp differs from the previous message
        const shouldDisplayMessageInfo = time !== previousTime || message.author !== ((_a = messages[idx - 1]) === null || _a === void 0 ? void 0 : _a.author);
        const isLocalParticipant = localParticipant.identity === message.author;
        return (React.createElement(React.Fragment, { key: message.sid },
            shouldDisplayMessageInfo && (React.createElement(MessageInfo, { author: message.author, isLocalParticipant: isLocalParticipant, dateCreated: time })),
            message.type === 'text' && React.createElement(TextMessage, { body: message.body, isLocalParticipant: isLocalParticipant }),
            message.type === 'media' && React.createElement(MediaMessage, { media: message.attachedMedia[0] })));
    })));
}
