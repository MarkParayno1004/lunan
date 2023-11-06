import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { Client } from '@twilio/conversations';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
export const ChatContext = createContext(null);
export const ChatProvider = ({ children }) => {
    const { room, onError } = useVideoContext();
    const isChatWindowOpenRef = useRef(false);
    const [isChatWindowOpen, setIsChatWindowOpen] = useState(false);
    const [conversation, setConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
    const [chatClient, setChatClient] = useState();
    const connect = useCallback((token) => {
        const client = new Client(token);
        const handleClientInitialized = (state) => {
            if (state === 'initialized') {
                // @ts-ignore
                window.chatClient = client;
                setChatClient(client);
            }
            else if (state === 'failed') {
                onError(new Error("There was a problem connecting to Twilio's conversation service."));
            }
        };
        client.on('stateChanged', handleClientInitialized);
        return () => {
            client.off('stateChanged', handleClientInitialized);
        };
    }, [onError]);
    useEffect(() => {
        if (conversation) {
            const handleMessageAdded = (message) => setMessages(oldMessages => [...oldMessages, message]);
            conversation.getMessages().then(newMessages => setMessages(newMessages.items));
            conversation.on('messageAdded', handleMessageAdded);
            return () => {
                conversation.off('messageAdded', handleMessageAdded);
            };
        }
    }, [conversation]);
    useEffect(() => {
        // If the chat window is closed and there are new messages, set hasUnreadMessages to true
        if (!isChatWindowOpenRef.current && messages.length) {
            setHasUnreadMessages(true);
        }
    }, [messages]);
    useEffect(() => {
        isChatWindowOpenRef.current = isChatWindowOpen;
        if (isChatWindowOpen)
            setHasUnreadMessages(false);
    }, [isChatWindowOpen]);
    useEffect(() => {
        if (room && chatClient) {
            chatClient
                .getConversationByUniqueName(room.sid)
                .then(newConversation => {
                //@ts-ignore
                window.chatConversation = newConversation;
                setConversation(newConversation);
            })
                .catch(e => {
                console.error(e);
                onError(new Error('There was a problem getting the Conversation associated with this room.'));
            });
        }
    }, [room, chatClient, onError]);
    return (React.createElement(ChatContext.Provider, { value: { isChatWindowOpen, setIsChatWindowOpen, connect, hasUnreadMessages, messages, conversation } }, children));
};
