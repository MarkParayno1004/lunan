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
import useParticipantNetworkQualityLevel from './useParticipantNetworkQualityLevel';
describe('the useParticipantNetworkQualityLevel hook', () => {
    let mockParticipant;
    beforeEach(() => {
        mockParticipant = new EventEmitter();
    });
    it('should return mockParticipant.networkQualityLevel by default', () => {
        mockParticipant.networkQualityLevel = 4;
        const { result } = renderHook(() => useParticipantNetworkQualityLevel(mockParticipant));
        expect(result.current).toBe(4);
    });
    it('should return respond to "networkQualityLevelChanged" events', () => __awaiter(void 0, void 0, void 0, function* () {
        mockParticipant.networkQualityLevel = 4;
        const { result } = renderHook(() => useParticipantNetworkQualityLevel(mockParticipant));
        act(() => {
            mockParticipant.emit('networkQualityLevelChanged', 3);
        });
        expect(result.current).toBe(3);
    }));
    it('should clean up listeners on unmount', () => {
        mockParticipant.networkQualityLevel = 4;
        const { unmount } = renderHook(() => useParticipantNetworkQualityLevel(mockParticipant));
        unmount();
        expect(mockParticipant.listenerCount('networkQualityLevelChanged')).toBe(0);
    });
});
