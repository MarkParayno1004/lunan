import React from 'react';
import { shallow } from 'enzyme';
import EndCallButton from './EndCallButton';
const mockVideoContext = {
    room: {
        disconnect: jest.fn(),
    },
};
jest.mock('../../../hooks/useVideoContext/useVideoContext', () => () => mockVideoContext);
describe('End Call button', () => {
    it('should disconnect from the room when clicked', () => {
        const wrapper = shallow(React.createElement(EndCallButton, null));
        wrapper.simulate('click');
        expect(mockVideoContext.room.disconnect).toHaveBeenCalled();
    });
});
