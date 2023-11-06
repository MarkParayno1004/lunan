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
import { mockRoom } from '../../../__mocks__/twilio-video';
import useRoom from './useRoom';
import Video from 'twilio-video';
import * as utils from '../../../utils';
const mockVideoConnect = Video.connect;
describe('the useRoom hook', () => {
    beforeEach(jest.clearAllMocks);
    afterEach(() => mockRoom.removeAllListeners());
    it('should set isConnecting to true while connecting to the room ', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, waitForNextUpdate } = renderHook(() => useRoom([], () => { }, {}));
        expect(result.current.isConnecting).toBe(false);
        act(() => {
            result.current.connect('token');
        });
        expect(result.current.isConnecting).toBe(true);
        yield waitForNextUpdate();
        expect(Video.connect).toHaveBeenCalledTimes(1);
        expect(result.current.room.disconnect).not.toHaveBeenCalled();
        expect(result.current.isConnecting).toBe(false);
    }));
    it('should set the priority of video tracks to low', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, waitForNextUpdate } = renderHook(() => useRoom([{ kind: 'video' }], () => { }, {}));
        act(() => {
            result.current.connect('token');
        });
        yield waitForNextUpdate();
        expect(mockRoom.localParticipant.videoTracks[0].setPriority).toHaveBeenCalledWith('low');
    }));
    it('should return a room after connecting to a room', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, waitForNextUpdate } = renderHook(() => useRoom([], () => { }, {}));
        act(() => {
            result.current.connect('token');
        });
        yield waitForNextUpdate();
        expect(result.current.room.state).toEqual('connected');
    }));
    it('should add a listener for the "beforeUnload" event when connected to a room', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(window, 'addEventListener');
        const { result, waitForNextUpdate } = renderHook(() => useRoom([], () => { }, {}));
        act(() => {
            result.current.connect('token');
        });
        yield waitForNextUpdate();
        expect(window.addEventListener).toHaveBeenCalledWith('beforeunload', expect.any(Function));
    }));
    it('should remove the listener for the "beforeUnload" event when the room is disconnected', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(window, 'removeEventListener');
        const { result, waitForNextUpdate } = renderHook(() => useRoom([], () => { }, {}));
        act(() => {
            result.current.connect('token');
        });
        yield waitForNextUpdate();
        result.current.room.emit('disconnected');
        yield waitForNextUpdate();
        expect(window.removeEventListener).toHaveBeenCalledWith('beforeunload', expect.any(Function));
    }));
    it('should call onError and set isConnecting to false when there is an error', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockOnError = jest.fn();
        mockVideoConnect.mockImplementationOnce(() => Promise.reject('mockError'));
        const { result } = renderHook(() => useRoom([], mockOnError, {}));
        yield act(() => result.current.connect('token'));
        expect(mockOnError).toHaveBeenCalledWith('mockError');
        expect(result.current.isConnecting).toBe(false);
    }));
    it('should reset the room object on disconnect', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, waitForNextUpdate } = renderHook(() => useRoom([], () => { }, {}));
        act(() => {
            result.current.connect('token');
        });
        yield waitForNextUpdate();
        expect(result.current.room.state).toBe('connected');
        result.current.room.emit('disconnected');
        yield waitForNextUpdate();
        expect(result.current.room).toBe(null);
    }));
    describe('when isMobile is true', () => {
        // @ts-ignore
        utils.isMobile = true;
        it('should add a listener for the "pagehide" event when connected to a room', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(window, 'addEventListener');
            const { result, waitForNextUpdate } = renderHook(() => useRoom([], () => { }, {}));
            act(() => {
                result.current.connect('token');
            });
            yield waitForNextUpdate();
            expect(window.addEventListener).toHaveBeenCalledWith('pagehide', expect.any(Function));
        }));
        it('should remove the listener for the "pagehide" event when the room is disconnected', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(window, 'removeEventListener');
            const { result, waitForNextUpdate } = renderHook(() => useRoom([], () => { }, {}));
            act(() => {
                result.current.connect('token');
            });
            yield waitForNextUpdate();
            result.current.room.emit('disconnected');
            yield waitForNextUpdate();
            expect(window.removeEventListener).toHaveBeenCalledWith('pagehide', expect.any(Function));
        }));
    });
});
