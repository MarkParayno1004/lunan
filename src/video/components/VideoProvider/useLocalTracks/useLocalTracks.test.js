var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { act, renderHook } from '@testing-library/react-hooks';
import { getDeviceInfo, isPermissionDenied } from '../../../utils';
import { SELECTED_AUDIO_INPUT_KEY, SELECTED_VIDEO_INPUT_KEY, DEFAULT_VIDEO_CONSTRAINTS } from '../../../constants';
import { useAppState } from '../../../state';
import useLocalTracks from './useLocalTracks';
import Video from 'twilio-video';
jest.mock('../../../state');
jest.mock('../../../utils');
const mockGetDeviceInfo = getDeviceInfo;
const mockIsPermissionDenied = isPermissionDenied;
const mockUseAppState = useAppState;
mockUseAppState.mockImplementation(() => ({ setIsKrispEnabled: false }));
describe('the useLocalTracks hook', () => {
    beforeEach(() => {
        Date.now = () => 123456;
        mockGetDeviceInfo.mockImplementation(() => Promise.resolve({
            audioInputDevices: [{ deviceId: 'mockAudioDeviceId', kind: 'audioinput' }],
            videoInputDevices: [{ deviceId: 'mockVideoDeviceId', kind: 'videoinput' }],
            hasAudioInputDevices: true,
            hasVideoInputDevices: true,
        }));
        mockIsPermissionDenied.mockImplementation(() => Promise.resolve(false));
    });
    afterEach(jest.clearAllMocks);
    afterEach(() => window.localStorage.clear());
    describe('the getAudioAndVideoTracks function', () => {
        it('should create local audio and video tracks', () => __awaiter(void 0, void 0, void 0, function* () {
            const { result } = renderHook(useLocalTracks);
            yield act(() => __awaiter(void 0, void 0, void 0, function* () {
                yield result.current.getAudioAndVideoTracks();
            }));
            expect(Video.createLocalTracks).toHaveBeenCalledWith({
                audio: {
                    noiseCancellationOptions: {
                        sdkAssetsPath: '/noisecancellation',
                        vendor: 'krisp',
                    },
                },
                video: {
                    frameRate: 24,
                    width: 1280,
                    height: 720,
                    name: 'camera-123456',
                },
            });
        }));
        it('should not create a local video track when camera permission has been denied', () => __awaiter(void 0, void 0, void 0, function* () {
            mockIsPermissionDenied.mockImplementation(name => Promise.resolve(name === 'camera'));
            const { result } = renderHook(useLocalTracks);
            yield act(() => __awaiter(void 0, void 0, void 0, function* () {
                yield expect(result.current.getAudioAndVideoTracks()).rejects.toThrow('CameraPermissionsDenied');
            }));
            expect(Video.createLocalTracks).toHaveBeenCalledWith({
                audio: {
                    noiseCancellationOptions: {
                        sdkAssetsPath: '/noisecancellation',
                        vendor: 'krisp',
                    },
                },
                video: false,
            });
        }));
        it('should not create a local audio track when microphone permission has been denied', () => __awaiter(void 0, void 0, void 0, function* () {
            mockIsPermissionDenied.mockImplementation(name => Promise.resolve(name === 'microphone'));
            const { result } = renderHook(useLocalTracks);
            yield act(() => __awaiter(void 0, void 0, void 0, function* () {
                yield expect(result.current.getAudioAndVideoTracks()).rejects.toThrow('MicrophonePermissionsDenied');
            }));
            expect(Video.createLocalTracks).toHaveBeenCalledWith({
                audio: false,
                video: {
                    frameRate: 24,
                    width: 1280,
                    height: 720,
                    name: 'camera-123456',
                },
            });
        }));
        it('should not create any tracks when microphone and camera permissions have been denied', () => __awaiter(void 0, void 0, void 0, function* () {
            mockIsPermissionDenied.mockImplementation(() => Promise.resolve(true));
            const { result } = renderHook(useLocalTracks);
            const expectedError = new Error();
            expectedError.name = 'NotAllowedError';
            yield act(() => __awaiter(void 0, void 0, void 0, function* () {
                yield expect(result.current.getAudioAndVideoTracks()).rejects.toThrow(expectedError);
            }));
            expect(Video.createLocalTracks).toHaveBeenCalledWith({
                audio: false,
                video: false,
            });
        }));
        it('should correctly create local audio and video tracks when selected device IDs are available in localStorage', () => __awaiter(void 0, void 0, void 0, function* () {
            window.localStorage.setItem(SELECTED_VIDEO_INPUT_KEY, 'mockVideoDeviceId');
            window.localStorage.setItem(SELECTED_AUDIO_INPUT_KEY, 'mockAudioDeviceId');
            const { result } = renderHook(useLocalTracks);
            yield act(() => __awaiter(void 0, void 0, void 0, function* () {
                yield result.current.getAudioAndVideoTracks();
            }));
            expect(Video.createLocalTracks).toHaveBeenCalledWith({
                audio: {
                    deviceId: {
                        exact: 'mockAudioDeviceId',
                    },
                    noiseCancellationOptions: {
                        sdkAssetsPath: '/noisecancellation',
                        vendor: 'krisp',
                    },
                },
                video: {
                    frameRate: 24,
                    width: 1280,
                    height: 720,
                    name: 'camera-123456',
                    deviceId: {
                        exact: 'mockVideoDeviceId',
                    },
                },
            });
        }));
        it('should correctly create local audio and video tracks when selected devices IDs are available in localStorage, but do not correspond to actual devices', () => __awaiter(void 0, void 0, void 0, function* () {
            window.localStorage.setItem(SELECTED_VIDEO_INPUT_KEY, 'otherMockVideoDeviceId');
            window.localStorage.setItem(SELECTED_AUDIO_INPUT_KEY, 'otherMockAudioDeviceId');
            const { result } = renderHook(useLocalTracks);
            yield act(() => __awaiter(void 0, void 0, void 0, function* () {
                yield result.current.getAudioAndVideoTracks();
            }));
            expect(Video.createLocalTracks).toHaveBeenCalledWith({
                audio: {
                    noiseCancellationOptions: {
                        sdkAssetsPath: '/noisecancellation',
                        vendor: 'krisp',
                    },
                },
                video: {
                    frameRate: 24,
                    width: 1280,
                    height: 720,
                    name: 'camera-123456',
                },
            });
        }));
        it('should create a local audio track when no video devices are present', () => __awaiter(void 0, void 0, void 0, function* () {
            mockGetDeviceInfo.mockImplementation(() => Promise.resolve({
                audioInputDevices: [{ deviceId: 'mockAudioDeviceId', kind: 'audioinput' }],
                videoInputDevices: [],
                hasAudioInputDevices: true,
                hasVideoInputDevices: false,
            }));
            const { result } = renderHook(useLocalTracks);
            yield act(() => __awaiter(void 0, void 0, void 0, function* () {
                yield result.current.getAudioAndVideoTracks();
            }));
            expect(Video.createLocalTracks).toHaveBeenCalledWith({
                audio: {
                    noiseCancellationOptions: {
                        sdkAssetsPath: '/noisecancellation',
                        vendor: 'krisp',
                    },
                },
                video: false,
            });
        }));
        it('should create a local video track when no audio devices are present', () => __awaiter(void 0, void 0, void 0, function* () {
            mockGetDeviceInfo.mockImplementation(() => Promise.resolve({
                audioInputDevices: [],
                videoInputDevices: [{ deviceId: 'mockVideoDeviceId', kind: 'videoinput' }],
                hasAudioInputDevices: false,
                hasVideoInputDevices: true,
            }));
            const { result } = renderHook(useLocalTracks);
            yield act(() => __awaiter(void 0, void 0, void 0, function* () {
                yield result.current.getAudioAndVideoTracks();
            }));
            expect(Video.createLocalTracks).toHaveBeenCalledWith({
                audio: false,
                video: {
                    frameRate: 24,
                    width: 1280,
                    height: 720,
                    name: 'camera-123456',
                },
            });
        }));
        it('should set isAcquiringLocalTracks to true while acquiring tracks', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers();
            const { result, waitForNextUpdate } = renderHook(useLocalTracks);
            expect(result.current.isAcquiringLocalTracks).toBe(false);
            yield act(() => __awaiter(void 0, void 0, void 0, function* () {
                result.current.getAudioAndVideoTracks();
                yield waitForNextUpdate();
            }));
            expect(result.current.isAcquiringLocalTracks).toBe(true);
            yield act(() => __awaiter(void 0, void 0, void 0, function* () {
                jest.runAllTimers();
                yield waitForNextUpdate();
            }));
            expect(result.current.isAcquiringLocalTracks).toBe(false);
            jest.useRealTimers();
        }));
        it('should save the deviceId of the video track to localStorage after it is acquired', () => __awaiter(void 0, void 0, void 0, function* () {
            const { result } = renderHook(useLocalTracks);
            yield act(() => __awaiter(void 0, void 0, void 0, function* () {
                yield result.current.getAudioAndVideoTracks();
            }));
            expect(window.localStorage.getItem(SELECTED_VIDEO_INPUT_KEY)).toBe('mockDeviceId');
        }));
        it('should ignore calls to getAudioAndVideoTracks while isAcquiringLocalTracks is true', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers();
            const { result, waitForNextUpdate } = renderHook(useLocalTracks);
            yield act(() => __awaiter(void 0, void 0, void 0, function* () {
                result.current.getAudioAndVideoTracks(); // This call is not ignored
                yield waitForNextUpdate();
            }));
            expect(result.current.isAcquiringLocalTracks).toBe(true);
            result.current.getAudioAndVideoTracks(); // This call is ignored
            yield act(() => __awaiter(void 0, void 0, void 0, function* () {
                jest.runAllTimers();
                yield waitForNextUpdate();
            }));
            expect(Video.createLocalTracks).toHaveBeenCalledTimes(1);
            jest.useRealTimers();
        }));
        it('should not create any tracks when no input devices are present', () => __awaiter(void 0, void 0, void 0, function* () {
            mockGetDeviceInfo.mockImplementation(() => Promise.resolve([]));
            const { result } = renderHook(useLocalTracks);
            yield result.current.getAudioAndVideoTracks();
            expect(Video.createLocalTracks).not.toHaveBeenCalled();
        }));
        it('should return an error when there is an error creating a track', () => __awaiter(void 0, void 0, void 0, function* () {
            Video.createLocalTracks.mockImplementationOnce(() => Promise.reject('testError'));
            const { result, waitForNextUpdate } = renderHook(useLocalTracks);
            act(() => {
                expect(result.current.getAudioAndVideoTracks()).rejects.toBe('testError');
            });
            yield waitForNextUpdate();
        }));
    });
    describe('the removeLocalVideoTrack function', () => {
        it('should call videoTrack.stop() and remove the videoTrack from state', () => __awaiter(void 0, void 0, void 0, function* () {
            const { result, waitForValueToChange } = renderHook(useLocalTracks);
            // First, get tracks
            yield act(() => __awaiter(void 0, void 0, void 0, function* () {
                result.current.getAudioAndVideoTracks();
                yield waitForValueToChange(() => result.current.localTracks.length);
            }));
            const initialVideoTrack = result.current.localTracks.find(track => track.kind === 'video');
            expect(initialVideoTrack.stop).not.toHaveBeenCalled();
            expect(initialVideoTrack).toBeTruthy();
            act(() => {
                result.current.removeLocalVideoTrack();
            });
            expect(result.current.localTracks.some(track => track.kind === 'video')).toBe(false);
            expect(initialVideoTrack.stop).toHaveBeenCalled();
        }));
    });
    describe('the removeLocalAudioTrack function', () => {
        it('should call audioTrack.stop() and remove the audioTrack from state', () => __awaiter(void 0, void 0, void 0, function* () {
            const { result, waitForValueToChange } = renderHook(useLocalTracks);
            // First, get tracks
            yield act(() => __awaiter(void 0, void 0, void 0, function* () {
                result.current.getAudioAndVideoTracks();
                yield waitForValueToChange(() => result.current.localTracks.length);
            }));
            const initialAudioTrack = result.current.localTracks.find(track => track.kind === 'audio');
            expect(initialAudioTrack.stop).not.toHaveBeenCalled();
            expect(initialAudioTrack).toBeTruthy();
            act(() => {
                result.current.removeLocalAudioTrack();
            });
            expect(result.current.localTracks.some(track => track.kind === 'audio')).toBe(false);
            expect(initialAudioTrack.stop).toHaveBeenCalled();
        }));
    });
    describe('the getLocalVideoTrack function', () => {
        it('should create a local video track', () => __awaiter(void 0, void 0, void 0, function* () {
            const { result, waitForNextUpdate } = renderHook(useLocalTracks);
            yield act(() => __awaiter(void 0, void 0, void 0, function* () {
                result.current.getLocalVideoTrack();
                yield waitForNextUpdate();
            }));
            expect(Video.createLocalVideoTrack).toHaveBeenCalledWith(Object.assign(Object.assign({}, DEFAULT_VIDEO_CONSTRAINTS), { name: 'camera-123456' }));
        }));
        it('should not specify a device ID when the device ID stored in local storage does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const { result, waitForNextUpdate } = renderHook(useLocalTracks);
            window.localStorage.setItem(SELECTED_VIDEO_INPUT_KEY, 'device-id-does-not-exist');
            yield act(() => __awaiter(void 0, void 0, void 0, function* () {
                result.current.getLocalVideoTrack();
                yield waitForNextUpdate();
            }));
            expect(Video.createLocalVideoTrack).toHaveBeenCalledWith(Object.assign(Object.assign({}, DEFAULT_VIDEO_CONSTRAINTS), { name: 'camera-123456' }));
        }));
        it('should specify a device ID when one is stored in local storage and the device exists', () => __awaiter(void 0, void 0, void 0, function* () {
            const { result, waitForNextUpdate } = renderHook(useLocalTracks);
            window.localStorage.setItem(SELECTED_VIDEO_INPUT_KEY, 'mockVideoDeviceId');
            yield act(() => __awaiter(void 0, void 0, void 0, function* () {
                result.current.getLocalVideoTrack();
                yield waitForNextUpdate();
            }));
            expect(Video.createLocalVideoTrack).toHaveBeenCalledWith(Object.assign(Object.assign({}, DEFAULT_VIDEO_CONSTRAINTS), { name: 'camera-123456', deviceId: { exact: 'mockVideoDeviceId' } }));
        }));
    });
});
