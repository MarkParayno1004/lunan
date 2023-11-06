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
import useTrack from './useTrack';
describe('the useTrack hook', () => {
    let mockPublication;
    beforeEach(() => {
        mockPublication = new EventEmitter();
    });
    it('should return mockPublication.track by default', () => {
        mockPublication.track = 'mockTrack';
        const { result } = renderHook(() => useTrack(mockPublication));
        expect(result.current).toBe('mockTrack');
    });
    it('should return respond to "subscribed" events', () => __awaiter(void 0, void 0, void 0, function* () {
        mockPublication.track = 'mockTrack';
        const { result } = renderHook(() => useTrack(mockPublication));
        act(() => {
            mockPublication.emit('subscribed', 'newMockTrack');
        });
        expect(result.current).toBe('newMockTrack');
    }));
    it('should return respond to "unsubscribed" events', () => __awaiter(void 0, void 0, void 0, function* () {
        mockPublication.track = 'mockTrack';
        const { result } = renderHook(() => useTrack(mockPublication));
        act(() => {
            mockPublication.emit('unsubscribed');
        });
        expect(result.current).toBe(null);
    }));
    it('should clean up listeners on unmount', () => {
        mockPublication.track = 'mockTrack';
        const { unmount } = renderHook(() => useTrack(mockPublication));
        unmount();
        expect(mockPublication.listenerCount('subscribed')).toBe(0);
        expect(mockPublication.listenerCount('unsubscribed')).toBe(0);
    });
});
