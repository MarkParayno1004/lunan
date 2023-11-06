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
import useScreenShareToggle from './useScreenShareToggle';
import { EventEmitter } from 'events';
const mockLocalParticipant = new EventEmitter();
mockLocalParticipant.publishTrack = jest.fn(() => Promise.resolve('mockPublication'));
mockLocalParticipant.unpublishTrack = jest.fn();
const mockRoom = {
    localParticipant: mockLocalParticipant,
};
const mockOnError = () => { };
const mockTrack = { stop: jest.fn() };
const mockMediaDevices = {
    value: {
        getDisplayMedia: jest.fn(() => Promise.resolve({
            getTracks: jest.fn(() => [mockTrack]),
        })),
    },
};
Object.defineProperty(navigator, 'mediaDevices', mockMediaDevices);
describe('the useScreenShareToggle hook', () => {
    beforeEach(() => {
        delete mockTrack.onended;
        jest.clearAllMocks();
    });
    it('should return a default value of false', () => {
        const { result } = renderHook(() => useScreenShareToggle(mockRoom, mockOnError));
        expect(result.current).toEqual([false, expect.any(Function)]);
    });
    describe('toggle function', () => {
        it('should call localParticipant.publishTrack with the correct arguments when isSharing is false', () => __awaiter(void 0, void 0, void 0, function* () {
            const { result, waitForNextUpdate } = renderHook(() => useScreenShareToggle(mockRoom, mockOnError));
            result.current[1]();
            yield waitForNextUpdate();
            expect(navigator.mediaDevices.getDisplayMedia).toHaveBeenCalled();
            expect(mockLocalParticipant.publishTrack).toHaveBeenCalledWith(mockTrack, { name: 'screen', priority: 'low' });
            expect(result.current[0]).toEqual(true);
        }));
        it('should not toggle screen sharing when there is no room', () => __awaiter(void 0, void 0, void 0, function* () {
            const { result } = renderHook(() => useScreenShareToggle(null, mockOnError));
            result.current[1]();
            expect(navigator.mediaDevices.getDisplayMedia).not.toHaveBeenCalled();
            expect(mockLocalParticipant.publishTrack).not.toHaveBeenCalled();
        }));
        it('should correctly stop screen sharing when isSharing is true', () => __awaiter(void 0, void 0, void 0, function* () {
            const localParticipantSpy = jest.spyOn(mockLocalParticipant, 'emit');
            const { result, waitForNextUpdate } = renderHook(() => useScreenShareToggle(mockRoom, mockOnError));
            expect(mockTrack.onended).toBeUndefined();
            result.current[1]();
            yield waitForNextUpdate();
            expect(result.current[0]).toEqual(true);
            act(() => {
                result.current[1]();
            });
            expect(mockLocalParticipant.unpublishTrack).toHaveBeenCalledWith(mockTrack);
            expect(localParticipantSpy).toHaveBeenCalledWith('trackUnpublished', 'mockPublication');
            expect(mockTrack.stop).toHaveBeenCalled();
            expect(result.current[0]).toEqual(false);
        }));
        describe('onended function', () => {
            it('should correctly stop screen sharing when called', () => __awaiter(void 0, void 0, void 0, function* () {
                const localParticipantSpy = jest.spyOn(mockLocalParticipant, 'emit');
                const { result, waitForNextUpdate } = renderHook(() => useScreenShareToggle(mockRoom, mockOnError));
                expect(mockTrack.onended).toBeUndefined();
                result.current[1]();
                yield waitForNextUpdate();
                expect(mockTrack.onended).toEqual(expect.any(Function));
                act(() => {
                    mockTrack.onended();
                });
                expect(mockLocalParticipant.unpublishTrack).toHaveBeenCalledWith(mockTrack);
                expect(localParticipantSpy).toHaveBeenCalledWith('trackUnpublished', 'mockPublication');
                expect(mockTrack.stop).toHaveBeenCalled();
                expect(result.current[0]).toEqual(false);
            }));
        });
    });
});
