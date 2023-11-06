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
import usePublicationIsTrackEnabled from './usePublicationIsTrackEnabled';
describe('the usePublicationIsTrackEnabled hook', () => {
    let mockTrack;
    beforeEach(() => {
        mockTrack = new EventEmitter();
    });
    it('should return false when track is undefined', () => {
        const { result } = renderHook(() => usePublicationIsTrackEnabled(undefined));
        expect(result.current).toBe(false);
    });
    it('should return mockTrack.isTrackEnabled by default', () => {
        mockTrack.isTrackEnabled = false;
        const { result } = renderHook(() => usePublicationIsTrackEnabled(mockTrack));
        expect(result.current).toBe(false);
    });
    it('should return respond to "subscribed" events', () => __awaiter(void 0, void 0, void 0, function* () {
        mockTrack.isTrackEnabled = false;
        const { result } = renderHook(() => usePublicationIsTrackEnabled(mockTrack));
        act(() => {
            mockTrack.emit('trackEnabled');
        });
        expect(result.current).toBe(true);
    }));
    it('should return respond to "unsubscribed" events', () => __awaiter(void 0, void 0, void 0, function* () {
        mockTrack.isTrackEnabled = true;
        const { result } = renderHook(() => usePublicationIsTrackEnabled(mockTrack));
        act(() => {
            mockTrack.emit('trackDisabled');
        });
        expect(result.current).toBe(false);
    }));
    it('should clean up listeners on unmount', () => {
        mockTrack.isTrackEnabled = 'mockTrack';
        const { unmount } = renderHook(() => usePublicationIsTrackEnabled(mockTrack));
        unmount();
        expect(mockTrack.listenerCount('trackEnabled')).toBe(0);
        expect(mockTrack.listenerCount('trackDisabled')).toBe(0);
    });
});
