var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { renderHook } from '@testing-library/react-hooks';
import { DEFAULT_VIDEO_CONSTRAINTS } from '../../constants';
import useDevices from '../useDevices/useDevices';
import useFlipCameraToggle from './useFlipCameraToggle';
import useVideoContext from '../useVideoContext/useVideoContext';
jest.mock('../useMediaStreamTrack/useMediaStreamTrack');
jest.mock('../useVideoContext/useVideoContext');
jest.mock('../useDevices/useDevices');
const mockUseVideoContext = useVideoContext;
const mockUseDevices = useDevices;
const mockStreamSettings = { facingMode: 'user' };
const mockVideoTrack = {
    name: '',
    kind: 'video',
    mediaStreamTrack: {
        getSettings: () => mockStreamSettings,
    },
    restart: jest.fn(),
};
const mockVideoContext = {
    localTracks: [mockVideoTrack],
    getLocalVideoTrack: jest.fn(() => Promise.resolve('newMockTrack')),
};
describe('the useFlipCameraToggle hook', () => {
    beforeEach(jest.clearAllMocks);
    beforeEach(() => {
        mockUseDevices.mockImplementation(() => ({ videoInputDevices: ['mockCamera1', 'mockCamera2'] }));
    });
    it('should return flipCameraSupported: true, when a videoTrack exists and facingMode is supported', () => {
        mockUseVideoContext.mockImplementation(() => mockVideoContext);
        const { result } = renderHook(useFlipCameraToggle);
        expect(result.current).toEqual({
            flipCameraDisabled: false,
            toggleFacingMode: expect.any(Function),
            flipCameraSupported: true,
        });
    });
    it('should return flipCameraSupported: false, when a videoTrack exists and facingMode is not supported', () => {
        mockUseVideoContext.mockImplementation(() => (Object.assign(Object.assign({}, mockVideoContext), { localTracks: [
                Object.assign(Object.assign({}, mockVideoTrack), { mediaStreamTrack: {
                        getSettings: () => ({}),
                    } }),
            ] })));
        const { result } = renderHook(useFlipCameraToggle);
        expect(result.current).toEqual({
            flipCameraDisabled: false,
            toggleFacingMode: expect.any(Function),
            flipCameraSupported: false,
        });
    });
    it('should return flipCameraSupported: false, and flipCameraDisabled: true, when no video track is present', () => {
        mockUseVideoContext.mockImplementation(() => (Object.assign(Object.assign({}, mockVideoContext), { localTracks: [] })));
        const { result } = renderHook(useFlipCameraToggle);
        expect(result.current).toEqual({
            flipCameraDisabled: true,
            toggleFacingMode: expect.any(Function),
            flipCameraSupported: false,
        });
    });
    it('should return flipCameraSupported: false, when there are less than two video input devices', () => {
        mockUseVideoContext.mockImplementation(() => mockVideoContext);
        mockUseDevices.mockImplementation(() => ({ videoInputDevices: ['mockCamera1'] }));
        const { result } = renderHook(useFlipCameraToggle);
        expect(result.current).toEqual({
            flipCameraDisabled: false,
            toggleFacingMode: expect.any(Function),
            flipCameraSupported: false,
        });
    });
    it('should call track.replace() with the correct facing mode when useFlipCameraToggle has been called', () => __awaiter(void 0, void 0, void 0, function* () {
        mockUseVideoContext.mockImplementation(() => (Object.assign(Object.assign({}, mockVideoContext), { localTracks: [
                Object.assign(Object.assign({}, mockVideoTrack), { mediaStreamTrack: {
                        getSettings: () => ({ facingMode: 'environment' }),
                    } }),
            ] })));
        const { result } = renderHook(useFlipCameraToggle);
        result.current.toggleFacingMode();
        expect(mockVideoTrack.restart).toHaveBeenCalledWith(Object.assign(Object.assign({}, DEFAULT_VIDEO_CONSTRAINTS), { facingMode: 'user' }));
    }));
});
