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
import useParticipants from './useParticipants';
import useVideoContext from '../useVideoContext/useVideoContext';
jest.mock('../useVideoContext/useVideoContext');
jest.mock('../useDominantSpeaker/useDominantSpeaker');
const mockedVideoContext = useVideoContext;
describe('the useParticipants hook', () => {
    let mockRoom;
    beforeEach(() => {
        mockRoom = new EventEmitter();
        mockRoom.participants = new Map([
            [0, 'participant1'],
            [1, 'participant2'],
        ]);
        mockedVideoContext.mockImplementation(() => ({
            room: mockRoom,
        }));
    });
    it('should return an array of mockParticipant.tracks by default', () => {
        const { result } = renderHook(useParticipants);
        expect(result.current).toEqual(['participant1', 'participant2']);
    });
    it('should return respond to "participantConnected" events', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result } = renderHook(useParticipants);
        act(() => {
            mockRoom.emit('participantConnected', 'newParticipant');
        });
        expect(result.current).toEqual(['participant1', 'participant2', 'newParticipant']);
    }));
    it('should return respond to "participantDisconnected" events', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result } = renderHook(useParticipants);
        act(() => {
            mockRoom.emit('participantDisconnected', 'participant1');
        });
        expect(result.current).toEqual(['participant2']);
    }));
    it('should clean up listeners on unmount', () => {
        const { unmount } = renderHook(useParticipants);
        unmount();
        expect(mockRoom.listenerCount('participantConnected')).toBe(0);
        expect(mockRoom.listenerCount('participantDisconnected')).toBe(0);
    });
});
