import React from 'react';
import { act } from 'react-dom/test-utils';
import { Button } from '@material-ui/core';
import { EventEmitter } from 'events';
import { shallow, mount } from 'enzyme';
import ToggleChatButton, { ANIMATION_DURATION } from './ToggleChatButton';
import useChatContext from '../../../hooks/useChatContext/useChatContext';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
jest.mock('../../../hooks/useChatContext/useChatContext');
jest.mock('../../../hooks/useVideoContext/useVideoContext');
const mockUseChatContext = useChatContext;
const mockUseVideoContext = useVideoContext;
const mockConversation = new EventEmitter();
const mockToggleChatWindow = jest.fn();
mockUseChatContext.mockImplementation(() => ({
    setIsChatWindowOpen: mockToggleChatWindow,
    isChatWindowOpen: false,
    conversation: mockConversation,
}));
const mockSetIsBackgroundSelectionOpen = jest.fn();
mockUseVideoContext.mockImplementation(() => ({ setIsBackgroundSelectionOpen: mockSetIsBackgroundSelectionOpen }));
describe('the ToggleChatButton component', () => {
    it('should be enabled when a conversation is present', () => {
        const wrapper = shallow(React.createElement(ToggleChatButton, null));
        expect(wrapper.prop('disabled')).toBe(false);
    });
    it('should be disabled when a conversation is not present', () => {
        mockUseChatContext.mockImplementationOnce(() => ({
            setIsChatWindowOpen: mockToggleChatWindow,
            isChatWindowOpen: false,
            conversation: null,
        }));
        const wrapper = shallow(React.createElement(ToggleChatButton, null));
        expect(wrapper.prop('disabled')).toBe(true);
    });
    it('should call the correct toggle function when clicked', () => {
        const wrapper = shallow(React.createElement(ToggleChatButton, null));
        wrapper.find(Button).simulate('click');
        expect(mockToggleChatWindow).toHaveBeenCalledWith(true);
    });
    it('should show an indicator when there are unread messages', () => {
        mockUseChatContext.mockImplementationOnce(() => ({
            setIsChatWindowOpen: mockToggleChatWindow,
            isChatWindowOpen: false,
            conversation: mockConversation,
            hasUnreadMessages: true,
        }));
        const wrapper = mount(React.createElement(ToggleChatButton, null));
        const notificationCircle = wrapper.findWhere(node => { var _a; return (_a = node.prop('className')) === null || _a === void 0 ? void 0 : _a.includes('circle'); });
        expect(notificationCircle.prop('className')).toContain('hasUnreadMessages');
    });
    it('should not show an indicator when there are no unread messages', () => {
        mockUseChatContext.mockImplementationOnce(() => ({
            setIsChatWindowOpen: mockToggleChatWindow,
            isChatWindowOpen: false,
            conversation: mockConversation,
            hasUnreadMessages: false,
        }));
        const wrapper = mount(React.createElement(ToggleChatButton, null));
        const notificationCircle = wrapper.findWhere(node => { var _a; return (_a = node.prop('className')) === null || _a === void 0 ? void 0 : _a.includes('circle'); });
        expect(notificationCircle.prop('className')).not.toContain('hasUnreadMessages');
    });
    it(`should add the 'animate' class for ${ANIMATION_DURATION}ms when a new message is received when the chat window is closed`, () => {
        jest.useFakeTimers();
        mockUseChatContext.mockImplementationOnce(() => ({
            setIsChatWindowOpen: mockToggleChatWindow,
            isChatWindowOpen: false,
            conversation: mockConversation,
        }));
        const wrapper = mount(React.createElement(ToggleChatButton, null));
        let notificationRing = wrapper.findWhere(node => { var _a; return (_a = node.prop('className')) === null || _a === void 0 ? void 0 : _a.includes('ring'); });
        expect(notificationRing.prop('className')).not.toContain('animate');
        act(() => {
            mockConversation.emit('messageAdded');
        });
        wrapper.update();
        notificationRing = wrapper.findWhere(node => { var _a; return (_a = node.prop('className')) === null || _a === void 0 ? void 0 : _a.includes('ring'); });
        expect(notificationRing.prop('className')).toContain('animate');
        act(() => {
            jest.advanceTimersByTime(ANIMATION_DURATION);
        });
        wrapper.update();
        notificationRing = wrapper.findWhere(node => { var _a; return (_a = node.prop('className')) === null || _a === void 0 ? void 0 : _a.includes('ring'); });
        expect(notificationRing.prop('className')).not.toContain('animate');
    });
    it(`should not add the 'animate' class when a new message is received when the chat window is open`, () => {
        mockUseChatContext.mockImplementationOnce(() => ({
            setIsChatWindowOpen: mockToggleChatWindow,
            isChatWindowOpen: true,
            conversation: mockConversation,
        }));
        const wrapper = mount(React.createElement(ToggleChatButton, null));
        let notificationRing = wrapper.findWhere(node => { var _a; return (_a = node.prop('className')) === null || _a === void 0 ? void 0 : _a.includes('ring'); });
        expect(notificationRing.prop('className')).not.toContain('animate');
        act(() => {
            mockConversation.emit('messageAdded');
        });
        wrapper.update();
        notificationRing = wrapper.findWhere(node => { var _a; return (_a = node.prop('className')) === null || _a === void 0 ? void 0 : _a.includes('ring'); });
        expect(notificationRing.prop('className')).not.toContain('animate');
    });
});
