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
import useIsTrackEnabled from './useIsTrackEnabled';
describe('the useIsTrackEnabled hook', () => {
    let mockTrack;
    beforeEach(() => {
        mockTrack = new EventEmitter();
    });
    it('should return false when track is undefined', () => {
        const { result } = renderHook(() => useIsTrackEnabled(undefined));
        expect(result.current).toBe(false);
    });
    it('should return mockTrack.isEnabled by default', () => {
        mockTrack.isEnabled = false;
        const { result } = renderHook(() => useIsTrackEnabled(mockTrack));
        expect(result.current).toBe(false);
    });
    it('should respond to "enabled" events', () => __awaiter(void 0, void 0, void 0, function* () {
        mockTrack.isEnabled = false;
        const { result } = renderHook(() => useIsTrackEnabled(mockTrack));
        act(() => {
            mockTrack.emit('enabled');
        });
        expect(result.current).toBe(true);
    }));
    it('should respond to "disabled" events', () => __awaiter(void 0, void 0, void 0, function* () {
        mockTrack.isEnabled = true;
        const { result } = renderHook(() => useIsTrackEnabled(mockTrack));
        act(() => {
            mockTrack.emit('disabled');
        });
        expect(result.current).toBe(false);
    }));
    it('should clean up listeners on unmount', () => {
        mockTrack.isEnabled = 'mockTrack';
        const { unmount } = renderHook(() => useIsTrackEnabled(mockTrack));
        unmount();
        expect(mockTrack.listenerCount('enabled')).toBe(0);
        expect(mockTrack.listenerCount('disabled')).toBe(0);
    });
});
