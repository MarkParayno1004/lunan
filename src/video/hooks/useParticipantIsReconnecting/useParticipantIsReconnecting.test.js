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
import useParticipantIsReconnecting from './useParticipantIsReconnecting';
describe('the useParticipantIsReconnecting hook', () => {
    let mockParticipant;
    beforeEach(() => {
        mockParticipant = new EventEmitter();
    });
    it('should return false by default', () => {
        const { result } = renderHook(() => useParticipantIsReconnecting(mockParticipant));
        expect(result.current).toBe(false);
    });
    it('should return respond to "reconnecting" events', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result } = renderHook(() => useParticipantIsReconnecting(mockParticipant));
        act(() => {
            mockParticipant.emit('reconnecting');
        });
        expect(result.current).toBe(true);
    }));
    it('should return respond to "reconnected" events', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result } = renderHook(() => useParticipantIsReconnecting(mockParticipant));
        act(() => {
            mockParticipant.emit('reconnecting');
        });
        expect(result.current).toBe(true);
        act(() => {
            mockParticipant.emit('reconnected');
        });
        expect(result.current).toBe(false);
    }));
    it('should clean up listeners on unmount', () => {
        const { unmount } = renderHook(() => useParticipantIsReconnecting(mockParticipant));
        unmount();
        expect(mockParticipant.listenerCount('reconnecting')).toBe(0);
        expect(mockParticipant.listenerCount('reconnected')).toBe(0);
    });
});
