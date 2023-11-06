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
import { getDeviceInfo } from '../../utils';
import useDevices from './useDevices';
jest.mock('../../utils', () => ({ getDeviceInfo: jest.fn(() => Promise.resolve()) }));
let mockAddEventListener = jest.fn();
let mockRemoveEventListener = jest.fn();
// @ts-ignore
navigator.mediaDevices = {
    addEventListener: mockAddEventListener,
    removeEventListener: mockRemoveEventListener,
};
describe('the useDevices hook', () => {
    afterEach(jest.clearAllMocks);
    it('should return the correct default values', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, waitForNextUpdate } = renderHook(useDevices);
        expect(result.current).toMatchInlineSnapshot(`
      Object {
        "audioInputDevices": Array [],
        "audioOutputDevices": Array [],
        "hasAudioInputDevices": false,
        "hasVideoInputDevices": false,
        "videoInputDevices": Array [],
      }
    `);
        yield waitForNextUpdate();
    }));
    it('should respond to "devicechange" events', () => __awaiter(void 0, void 0, void 0, function* () {
        const { waitForNextUpdate } = renderHook(useDevices);
        expect(getDeviceInfo).toHaveBeenCalledTimes(1);
        expect(mockAddEventListener).toHaveBeenCalledWith('devicechange', expect.any(Function));
        act(() => {
            mockAddEventListener.mock.calls[0][1]();
        });
        yield waitForNextUpdate();
        expect(getDeviceInfo).toHaveBeenCalledTimes(2);
    }));
    it('should remove "devicechange" listener on component unmount', () => __awaiter(void 0, void 0, void 0, function* () {
        const { waitForNextUpdate, unmount } = renderHook(useDevices);
        yield waitForNextUpdate();
        unmount();
        expect(mockRemoveEventListener).toHaveBeenCalledWith('devicechange', expect.any(Function));
    }));
});
