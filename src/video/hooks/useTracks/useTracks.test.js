var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { renderHook, act } from '@testing-library/react-hooks';
import EventEmitter from 'events';
import useTracks from './useTracks';
describe('the useTracks hook', () => {
    let mockParticipant;
    beforeEach(() => {
        mockParticipant = new EventEmitter();
        mockParticipant.tracks = new Map([
            [0, { track: 'track1' }],
            [1, { track: null }],
            [2, { track: 'track2' }],
        ]);
    });
    it('should return an array of mockParticipant.tracks by default, filtering out null tracks', () => {
        const { result } = renderHook(() => useTracks(mockParticipant));
        expect(result.current).toEqual(['track1', 'track2']);
    });
    it('should respond to "trackSubscribed" events', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result } = renderHook(() => useTracks(mockParticipant));
        act(() => {
            mockParticipant.emit('trackSubscribed', 'newMockTrack');
        });
        expect(result.current).toEqual(['track1', 'track2', 'newMockTrack']);
    }));
    it('should respond to "trackUnsubscribed" events', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result } = renderHook(() => useTracks(mockParticipant));
        act(() => {
            mockParticipant.emit('trackUnsubscribed', 'track1');
        });
        expect(result.current).toEqual(['track2']);
    }));
    it('should return a new set of tracks if the participant changes', () => {
        const { result, rerender } = renderHook(({ participant }) => useTracks(participant), {
            initialProps: { participant: mockParticipant },
        });
        expect(result.current).toEqual(['track1', 'track2']);
        mockParticipant = new EventEmitter();
        mockParticipant.tracks = new Map([
            [0, { track: 'track3' }],
            [1, { track: 'track4' }],
        ]);
        rerender({ participant: mockParticipant });
        expect(result.current).toEqual(['track3', 'track4']);
    });
    it('should clean up listeners on unmount', () => {
        const { unmount } = renderHook(() => useTracks(mockParticipant));
        unmount();
        expect(mockParticipant.listenerCount('trackSubscribed')).toBe(0);
        expect(mockParticipant.listenerCount('trackUnsubscribed')).toBe(0);
    });
});
