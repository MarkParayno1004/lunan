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
import useLocalVideoToggle from './useLocalVideoToggle';
import useVideoContext from '../useVideoContext/useVideoContext';
import { EventEmitter } from 'events';
import { setImmediate } from 'timers';
jest.mock('../useVideoContext/useVideoContext');
const mockUseVideoContext = useVideoContext;
function getMockTrack(kind, deviceId) {
    return {
        name: '',
        kind,
        mediaStreamTrack: {
            getSettings: () => ({
                deviceId,
            }),
        },
    };
}
describe('the useLocalVideoToggle hook', () => {
    it('should return true when a localVideoTrack exists', () => {
        mockUseVideoContext.mockImplementation(() => ({
            localTracks: [getMockTrack('video')],
            room: { localParticipant: {} },
        }));
        const { result } = renderHook(useLocalVideoToggle);
        expect(result.current).toEqual([true, expect.any(Function)]);
    });
    it('should return false when a localVideoTrack does not exist', () => {
        mockUseVideoContext.mockImplementation(() => ({
            localTracks: [getMockTrack('audio')],
            room: { localParticipant: {} },
        }));
        const { result } = renderHook(useLocalVideoToggle);
        expect(result.current).toEqual([false, expect.any(Function)]);
    });
    describe('toggleVideoEnabled function', () => {
        it('should call removeLocalVideoTrack when a localVideoTrack exists', () => {
            const mockRemoveLocalVideoTrack = jest.fn();
            mockUseVideoContext.mockImplementation(() => ({
                localTracks: [getMockTrack('video')],
                room: { localParticipant: null },
                removeLocalVideoTrack: mockRemoveLocalVideoTrack,
            }));
            const { result } = renderHook(useLocalVideoToggle);
            result.current[1]();
            expect(mockRemoveLocalVideoTrack).toHaveBeenCalled();
        });
        it('should call localParticipant.unpublishTrack when a localVideoTrack and localParticipant exists', () => {
            const mockLocalTrack = Object.assign(Object.assign({}, getMockTrack('video')), { stop: jest.fn() });
            const mockLocalParticipant = new EventEmitter();
            mockLocalParticipant.unpublishTrack = jest.fn();
            mockUseVideoContext.mockImplementation(() => ({
                localTracks: [mockLocalTrack],
                room: { localParticipant: mockLocalParticipant },
                removeLocalVideoTrack: () => { },
            }));
            const { result } = renderHook(useLocalVideoToggle);
            result.current[1]();
            expect(mockLocalParticipant.unpublishTrack).toHaveBeenCalledWith(mockLocalTrack);
        });
        it('should call getLocalVideoTrack when a localVideoTrack does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockGetLocalVideoTrack = jest.fn(() => Promise.resolve());
            mockUseVideoContext.mockImplementation(() => ({
                localTracks: [],
                getLocalVideoTrack: mockGetLocalVideoTrack,
                room: {},
            }));
            const { result, waitForNextUpdate } = renderHook(useLocalVideoToggle);
            act(() => {
                result.current[1]();
            });
            yield waitForNextUpdate();
            expect(mockGetLocalVideoTrack).toHaveBeenCalled();
        }));
        it('should call mockLocalParticipant.publishTrack when a localVideoTrack does not exist and localParticipant does exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockGetLocalVideoTrack = jest.fn(() => Promise.resolve('mockTrack'));
            const mockLocalParticipant = new EventEmitter();
            mockLocalParticipant.publishTrack = jest.fn();
            mockUseVideoContext.mockImplementation(() => ({
                localTracks: [],
                getLocalVideoTrack: mockGetLocalVideoTrack,
                room: { localParticipant: mockLocalParticipant },
            }));
            const { result, waitForNextUpdate } = renderHook(useLocalVideoToggle);
            act(() => {
                result.current[1]();
            });
            yield waitForNextUpdate();
            setImmediate(() => {
                expect(mockLocalParticipant.publishTrack).toHaveBeenCalledWith('mockTrack', { priority: 'low' });
                return Promise.resolve();
            });
        }));
        it('should not call mockLocalParticipant.publishTrack when isPublishing is true', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockGetLocalVideoTrack = jest.fn(() => Promise.resolve('mockTrack'));
            const mockLocalParticipant = new EventEmitter();
            mockLocalParticipant.publishTrack = jest.fn();
            mockUseVideoContext.mockImplementation(() => ({
                localTracks: [],
                getLocalVideoTrack: mockGetLocalVideoTrack,
                room: { localParticipant: mockLocalParticipant },
            }));
            const { result, waitForNextUpdate } = renderHook(useLocalVideoToggle);
            act(() => {
                result.current[1]();
            });
            result.current[1](); // Should be ignored because isPublishing is true
            expect(mockGetLocalVideoTrack).toHaveBeenCalledTimes(1);
            yield waitForNextUpdate();
        }));
        it('should call onError when publishTrack throws an error', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockGetLocalVideoTrack = jest.fn(() => Promise.resolve('mockTrack'));
            const mockOnError = jest.fn();
            const mockLocalParticipant = new EventEmitter();
            mockLocalParticipant.publishTrack = jest.fn(() => Promise.reject('mockError'));
            mockUseVideoContext.mockImplementation(() => ({
                localTracks: [],
                getLocalVideoTrack: mockGetLocalVideoTrack,
                room: { localParticipant: mockLocalParticipant },
                onError: mockOnError,
            }));
            const { result, waitForNextUpdate } = renderHook(useLocalVideoToggle);
            act(() => {
                result.current[1]();
            });
            yield waitForNextUpdate();
            expect(mockOnError).toHaveBeenCalledWith('mockError');
        }));
    });
});
