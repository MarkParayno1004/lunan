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
import usePublications from './usePublications';
import EventEmitter from 'events';
describe('the usePublications hook', () => {
    let mockParticipant;
    beforeEach(() => {
        mockParticipant = new EventEmitter();
        mockParticipant.tracks = new Map([[0, 'track1'], [1, 'track2']]);
    });
    it('should return an array of mockParticipant.tracks by default', () => {
        const { result } = renderHook(() => usePublications(mockParticipant));
        expect(result.current).toEqual(['track1', 'track2']);
    });
    it('should return respond to "trackPublished" events', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result } = renderHook(() => usePublications(mockParticipant));
        act(() => {
            mockParticipant.emit('trackPublished', 'newMockTrack');
        });
        expect(result.current).toEqual(['track1', 'track2', 'newMockTrack']);
    }));
    it('should return respond to "trackUnpublished" events', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result } = renderHook(() => usePublications(mockParticipant));
        act(() => {
            mockParticipant.emit('trackUnpublished', 'track1');
        });
        expect(result.current).toEqual(['track2']);
    }));
    it('should return a new set of tracks if the participant changes', () => {
        const { result, rerender } = renderHook(({ participant }) => usePublications(participant), {
            initialProps: { participant: mockParticipant },
        });
        expect(result.current).toEqual(['track1', 'track2']);
        mockParticipant = new EventEmitter();
        mockParticipant.tracks = new Map([[0, 'track3'], [1, 'track4']]);
        rerender({ participant: mockParticipant });
        expect(result.current).toEqual(['track3', 'track4']);
    });
    it('should clean up listeners on unmount', () => {
        const { unmount } = renderHook(() => usePublications(mockParticipant));
        unmount();
        expect(mockParticipant.listenerCount('trackPublished')).toBe(0);
        expect(mockParticipant.listenerCount('trackUnpublished')).toBe(0);
    });
});
