var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import useFirebaseAuth from './useFirebaseAuth';
import { renderHook } from '@testing-library/react-hooks';
import { setImmediate } from 'timers';
const mockUser = { getIdToken: () => Promise.resolve('idToken') };
jest.mock('firebase/app', () => ({
    initializeApp: jest.fn(),
}));
jest.mock('firebase/auth', () => {
    const mockAuth = () => ({
        onAuthStateChanged: (fn) => setImmediate(() => fn('mockUser')),
        signOut: jest.fn(() => Promise.resolve()),
    });
    const mockSignInWithPopup = jest.fn(() => Promise.resolve({ user: mockUser }));
    const mockGoogleAuthProvider = jest.fn(() => ({ addScope: jest.fn() }));
    return {
        getAuth: mockAuth,
        signInWithPopup: mockSignInWithPopup,
        GoogleAuthProvider: mockGoogleAuthProvider,
    };
});
// @ts-ignore
window.fetch = jest.fn(() => Promise.resolve({ json: () => ({ token: 'mockVideoToken' }) }));
describe('the useFirebaseAuth hook', () => {
    afterEach(jest.clearAllMocks);
    it('should set isAuthReady to true and set a user on load', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, waitForNextUpdate } = renderHook(() => useFirebaseAuth());
        expect(result.current.isAuthReady).toBe(false);
        expect(result.current.user).toBe(null);
        yield waitForNextUpdate();
        expect(result.current.isAuthReady).toBe(true);
        expect(result.current.user).toBe('mockUser');
    }));
    it('should set user to null on signOut', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, waitForNextUpdate } = renderHook(() => useFirebaseAuth());
        yield waitForNextUpdate();
        result.current.signOut();
        yield waitForNextUpdate();
        expect(result.current.isAuthReady).toBe(true);
        expect(result.current.user).toBe(null);
    }));
    it('should set a new user on signIn', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, waitForNextUpdate } = renderHook(() => useFirebaseAuth());
        yield waitForNextUpdate();
        result.current.signIn();
        yield waitForNextUpdate();
        expect(result.current.user).toBe(mockUser);
    }));
    it('should include the users idToken in request to the video token server', () => __awaiter(void 0, void 0, void 0, function* () {
        process.env.REACT_APP_TOKEN_ENDPOINT = 'http://test-endpoint.com/token';
        const { result, waitForNextUpdate } = renderHook(() => useFirebaseAuth());
        yield waitForNextUpdate();
        result.current.signIn();
        yield waitForNextUpdate();
        yield result.current.getToken('testuser', 'testroom');
        expect(window.fetch).toHaveBeenCalledWith('http://test-endpoint.com/token', {
            headers: { _headers: { authorization: ['idToken'], 'content-type': ['application/json'] } },
            body: '{"user_identity":"testuser","room_name":"testroom","create_conversation":true}',
            method: 'POST',
        });
    }));
});
