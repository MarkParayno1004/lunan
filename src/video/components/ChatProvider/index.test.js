var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { ChatProvider } from './index';
import useChatContext from '../../hooks/useChatContext/useChatContext';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import { setImmediate } from 'timers';
import EventEmitter from 'events';
const mockConversation = new EventEmitter();
mockConversation.getMessages = jest.fn(() => Promise.resolve({ items: ['mockMessage'] }));
const mockConversationsClient = new EventEmitter();
mockConversationsClient.getConversationByUniqueName = jest.fn(() => Promise.resolve(mockConversation));
jest.mock('@twilio/conversations', () => {
    return { Client: jest.fn(() => mockConversationsClient) };
});
jest.mock('../../hooks/useVideoContext/useVideoContext');
const mockUseVideoContext = useVideoContext;
const mockOnError = jest.fn();
const mockRoom = { sid: 'mockRoomSid' };
const wrapper = ({ children }) => React.createElement(ChatProvider, null, children);
describe('the ChatProvider component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockUseVideoContext.mockImplementation(() => ({ room: mockRoom, onError: mockOnError }));
    });
    it('should return a Conversation after connect has been called and after a room exists', () => __awaiter(void 0, void 0, void 0, function* () {
        // Setup mock as if user is not connected to a room
        mockUseVideoContext.mockImplementation(() => ({ onError: mockOnError }));
        const { result, rerender, waitForNextUpdate } = renderHook(useChatContext, { wrapper });
        yield act(() => {
            result.current.connect('mockToken');
            mockConversationsClient.emit('stateChanged', 'initialized');
        });
        // conversation should be null as there is no room
        expect(result.current.conversation).toBe(null);
        mockUseVideoContext.mockImplementation(() => ({ room: mockRoom }));
        // Rerender hook now that there is a room
        rerender();
        yield waitForNextUpdate();
        expect(mockConversationsClient.getConversationByUniqueName).toHaveBeenCalledWith('mockRoomSid');
        expect(result.current.conversation).toBe(mockConversation);
    }));
    it('should load all messages after obtaining a conversation', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, waitForNextUpdate } = renderHook(useChatContext, { wrapper });
        act(() => {
            result.current.connect('mockToken');
            mockConversationsClient.emit('stateChanged', 'initialized');
        });
        yield waitForNextUpdate();
        expect(result.current.messages).toEqual(['mockMessage']);
    }));
    it('should add new messages to the "messages" array', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, waitForNextUpdate } = renderHook(useChatContext, { wrapper });
        act(() => {
            result.current.connect('mockToken');
            mockConversationsClient.emit('stateChanged', 'initialized');
        });
        yield waitForNextUpdate();
        act(() => {
            mockConversation.emit('messageAdded', 'newMockMessage');
        });
        expect(result.current.messages).toEqual(['mockMessage', 'newMockMessage']);
    }));
    it('should set hasUnreadMessages to true when initial messages are loaded while the chat window is closed', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, waitForNextUpdate } = renderHook(useChatContext, { wrapper });
        expect(result.current.hasUnreadMessages).toBe(false);
        act(() => {
            result.current.connect('mockToken');
            mockConversationsClient.emit('stateChanged', 'initialized');
        });
        yield waitForNextUpdate();
        expect(result.current.hasUnreadMessages).toBe(true);
    }));
    it('should not set hasUnreadMessages to true when initial messages are loaded while the chat window is open', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, waitForNextUpdate } = renderHook(useChatContext, { wrapper });
        // Open chat window before connecting
        act(() => {
            result.current.setIsChatWindowOpen(true);
        });
        act(() => {
            result.current.connect('mockToken');
            mockConversationsClient.emit('stateChanged', 'initialized');
        });
        yield waitForNextUpdate();
        expect(result.current.hasUnreadMessages).toBe(false);
    }));
    it('should set hasUnreadMessages to true when a message is received while then chat window is closed', () => __awaiter(void 0, void 0, void 0, function* () {
        // Setup mock so that no messages are loaded after a conversation is obtained.
        mockConversation.getMessages.mockImplementationOnce(() => Promise.resolve({ items: [] }));
        const { result, waitForNextUpdate } = renderHook(useChatContext, { wrapper });
        act(() => {
            result.current.connect('mockToken');
            mockConversationsClient.emit('stateChanged', 'initialized');
        });
        yield waitForNextUpdate();
        expect(result.current.hasUnreadMessages).toBe(false);
        act(() => {
            mockConversation.emit('messageAdded', 'mockmessage');
        });
        expect(result.current.hasUnreadMessages).toBe(true);
    }));
    it('should not set hasUnreadMessages to true when a message is received while then chat window is open', () => __awaiter(void 0, void 0, void 0, function* () {
        // Setup mock so that no messages are loaded after a conversation is obtained.
        mockConversation.getMessages.mockImplementationOnce(() => Promise.resolve({ items: [] }));
        const { result, waitForNextUpdate } = renderHook(useChatContext, { wrapper });
        act(() => {
            result.current.connect('mockToken');
            mockConversationsClient.emit('stateChanged', 'initialized');
        });
        yield waitForNextUpdate();
        expect(result.current.hasUnreadMessages).toBe(false);
        // Open chat window and receive message
        act(() => {
            result.current.setIsChatWindowOpen(true);
            mockConversation.emit('messageAdded', 'mockmessage');
        });
        expect(result.current.hasUnreadMessages).toBe(false);
    }));
    it('should set hasUnreadMessages to false when the chat window is opened', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, waitForNextUpdate } = renderHook(useChatContext, { wrapper });
        act(() => {
            result.current.connect('mockToken');
            mockConversationsClient.emit('stateChanged', 'initialized');
        });
        yield waitForNextUpdate();
        expect(result.current.hasUnreadMessages).toBe(true);
        act(() => {
            result.current.setIsChatWindowOpen(true);
        });
        expect(result.current.hasUnreadMessages).toBe(false);
    }));
    it('should call onError when there is an error connecting with the conversations client', () => {
        const { result } = renderHook(useChatContext, { wrapper });
        result.current.connect('mockToken');
        mockConversationsClient.emit('stateChanged', 'failed');
        expect(mockOnError).toHaveBeenCalledWith(new Error("There was a problem connecting to Twilio's conversation service."));
    });
    it('should call onError when there is an error getting the conversation', done => {
        mockConversationsClient.getConversationByUniqueName.mockImplementationOnce(() => Promise.reject('mockError'));
        const { result } = renderHook(useChatContext, { wrapper });
        act(() => {
            result.current.connect('mockToken');
            mockConversationsClient.emit('stateChanged', 'initialized');
        });
        setImmediate(() => {
            expect(mockOnError).toHaveBeenCalledWith(new Error('There was a problem getting the Conversation associated with this room.'));
            done();
        });
    });
});
