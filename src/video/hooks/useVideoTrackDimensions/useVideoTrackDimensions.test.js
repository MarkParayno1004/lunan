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
import EventEmitter from 'events';
import useVideoTrackDimensions from './useVideoTrackDimensions';
describe('the useVideoTrackDimensions hook', () => {
    let mockTrack;
    beforeEach(() => {
        mockTrack = new EventEmitter();
    });
    it('should return undefined when track is undefined', () => {
        const { result } = renderHook(() => useVideoTrackDimensions(undefined));
        expect(result.current).toBe(undefined);
    });
    it('should return mockTrack.dimensions', () => {
        mockTrack.dimensions = { height: 123, width: 456 };
        const { result } = renderHook(() => useVideoTrackDimensions(mockTrack));
        expect(result.current).toEqual({ height: 123, width: 456 });
    });
    it('should respond to "dimensionsChanged" events', () => __awaiter(void 0, void 0, void 0, function* () {
        mockTrack.dimensions = { height: 123, width: 456 };
        const { result } = renderHook(() => useVideoTrackDimensions(mockTrack));
        act(() => {
            mockTrack.dimensions = { height: 300, width: 600 };
            mockTrack.emit('dimensionsChanged', mockTrack);
        });
        expect(result.current).toEqual({ height: 300, width: 600 });
    }));
    it('should return a new object reference on "dimensionsChanged" event', () => {
        mockTrack.dimensions = { height: 123, width: 456 };
        const { result } = renderHook(() => useVideoTrackDimensions(mockTrack));
        act(() => {
            mockTrack.dimensions.height = 300;
            mockTrack.dimensions.width = 600;
            mockTrack.emit('dimensionsChanged', mockTrack);
        });
        expect(result.current).toEqual({ height: 300, width: 600 });
        expect(result.current).not.toBe(mockTrack.dimensions);
    });
    it('should clean up listeners on unmount', () => {
        const { unmount } = renderHook(() => useVideoTrackDimensions(mockTrack));
        unmount();
        expect(mockTrack.listenerCount('dimensionsChanged')).toBe(0);
    });
});
