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
import useIsTrackSwitchedOff from './useIsTrackSwitchedOff';
describe('the useIsTrackSwitchedOff hook', () => {
    let mockTrack;
    beforeEach(() => {
        mockTrack = new EventEmitter();
    });
    it('should return false when track is undefined', () => {
        const { result } = renderHook(() => useIsTrackSwitchedOff(undefined));
        expect(result.current).toBe(false);
    });
    it('should return mockTrack.isSwitchedOff by default', () => {
        mockTrack.isSwitchedOff = true;
        const { result } = renderHook(() => useIsTrackSwitchedOff(mockTrack));
        expect(result.current).toBe(true);
    });
    it('should return respond to "switchedOff" events', () => __awaiter(void 0, void 0, void 0, function* () {
        mockTrack.isSwitchedOff = false;
        const { result } = renderHook(() => useIsTrackSwitchedOff(mockTrack));
        act(() => {
            mockTrack.isSwitchedOff = true;
            mockTrack.emit('switchedOff');
        });
        expect(result.current).toBe(true);
    }));
    it('should return respond to "switchedOn" events', () => __awaiter(void 0, void 0, void 0, function* () {
        mockTrack.isEnabled = true;
        const { result } = renderHook(() => useIsTrackSwitchedOff(mockTrack));
        act(() => {
            mockTrack.isSwitchedOff = false;
            mockTrack.emit('switchedOn');
        });
        expect(result.current).toBe(false);
    }));
    it('should clean up listeners on unmount', () => {
        mockTrack.isEnabled = 'mockTrack';
        const { unmount } = renderHook(() => useIsTrackSwitchedOff(mockTrack));
        unmount();
        expect(mockTrack.listenerCount('switchedOff')).toBe(0);
        expect(mockTrack.listenerCount('switchedOn')).toBe(0);
    });
});
