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
import useMediaStreamTrack from './useMediaStreamTrack';
describe('the useMediaStreamTrack hook', () => {
    let mockTrack;
    beforeEach(() => {
        mockTrack = new EventEmitter();
        mockTrack.mediaStreamTrack = 'mockMediaStreamTrack';
    });
    it('should return undefined when track is undefined', () => {
        const { result } = renderHook(() => useMediaStreamTrack(undefined));
        expect(result.current).toBe(undefined);
    });
    it('should return mockTrack.mediaStreamTrack by default', () => {
        const { result } = renderHook(() => useMediaStreamTrack(mockTrack));
        expect(result.current).toBe('mockMediaStreamTrack');
    });
    it('should respond to "started" events', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result } = renderHook(() => useMediaStreamTrack(mockTrack));
        act(() => {
            mockTrack.mediaStreamTrack = 'anotherMockMediaStreamTrack';
            mockTrack.emit('started');
        });
        expect(result.current).toBe('anotherMockMediaStreamTrack');
    }));
    it('should clean up listeners on unmount', () => {
        const { unmount } = renderHook(() => useMediaStreamTrack(mockTrack));
        unmount();
        expect(mockTrack.listenerCount('started')).toBe(0);
    });
});
