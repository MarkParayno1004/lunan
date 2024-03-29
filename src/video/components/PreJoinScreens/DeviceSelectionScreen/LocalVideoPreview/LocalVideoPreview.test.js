import React from 'react';
import LocalVideoPreview from './LocalVideoPreview';
import { shallow } from 'enzyme';
import useVideoContext from '../../../../hooks/useVideoContext/useVideoContext';
import AvatarIcon from '../../../../icons/AvatarIcon';
jest.mock('../../../../hooks/useVideoContext/useVideoContext');
jest.mock('../../../../hooks/useMediaStreamTrack/useMediaStreamTrack');
const mockedVideoContext = useVideoContext;
describe('the LocalVideoPreview component', () => {
    it('it should render a VideoTrack component when there is a "camera" track', () => {
        mockedVideoContext.mockImplementation(() => {
            return {
                localTracks: [
                    {
                        name: '',
                        kind: 'video',
                        attach: jest.fn(),
                        detach: jest.fn(),
                        mediaStreamTrack: { getSettings: () => ({}) },
                    },
                ],
            };
        });
        const wrapper = shallow(React.createElement(LocalVideoPreview, { identity: "Test User" }));
        expect(wrapper.find('VideoTrack').exists()).toEqual(true);
    });
    it('should render the AvatarIcon when there are no "camera" tracks', () => {
        mockedVideoContext.mockImplementation(() => {
            return {
                localTracks: [{ name: 'microphone', attach: jest.fn(), detach: jest.fn() }],
            };
        });
        const wrapper = shallow(React.createElement(LocalVideoPreview, { identity: "Test User" }));
        expect(wrapper.find(AvatarIcon).exists()).toEqual(true);
    });
});
