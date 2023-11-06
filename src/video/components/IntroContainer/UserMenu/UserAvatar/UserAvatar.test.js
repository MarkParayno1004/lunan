import React from 'react';
import { Avatar } from '@material-ui/core';
import { shallow } from 'enzyme';
import Person from '@material-ui/icons/Person';
import UserAvatar, { getInitials } from './UserAvatar';
describe('the UserAvatar component', () => {
    it('should display the users initials when there is a displayName property', () => {
        const wrapper = shallow(React.createElement(UserAvatar, { user: { displayName: 'Test User' } }));
        expect(wrapper.find(Avatar).text()).toBe('TU');
    });
    it('should display the Person icon when there is no displayName or photoURL properties', () => {
        const wrapper = shallow(React.createElement(UserAvatar, { user: {} }));
        expect(wrapper.find(Person).exists()).toBe(true);
    });
    it('should display the users photo when the photoURL property exists', () => {
        const wrapper = shallow(React.createElement(UserAvatar, { user: { photoURL: 'testURL' } }));
        expect(wrapper
            .find(Avatar)
            .find({ src: 'testURL' })
            .exists()).toBe(true);
    });
    describe('getInitials function', () => {
        it('should generate initials from a name', () => {
            expect(getInitials('test')).toBe('T');
            expect(getInitials('Test User')).toBe('TU');
            expect(getInitials('test User TWO')).toBe('TUT');
        });
    });
});
