var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from 'react';
import LoginPage from './LoginPage';
import { act, fireEvent, render, waitForElement } from '@testing-library/react';
import { useAppState } from '../../state';
import { useLocation, useHistory } from 'react-router-dom';
import { setImmediate } from 'timers';
jest.mock('react-router-dom', () => {
    return {
        useLocation: jest.fn(),
        useHistory: jest.fn(),
    };
});
jest.mock('../../state');
jest.mock('./google-logo.svg', () => ({ ReactComponent: () => null }));
const mockUseAppState = useAppState;
const mockUseLocation = useLocation;
const mockUseHistory = useHistory;
const mockReplace = jest.fn();
mockUseHistory.mockImplementation(() => ({ replace: mockReplace }));
mockUseLocation.mockImplementation(() => ({ pathname: '/login' }));
describe('the LoginPage component', () => {
    beforeEach(jest.clearAllMocks);
    describe('with auth enabled', () => {
        it('should redirect to "/" when there is a user ', () => {
            process.env.REACT_APP_SET_AUTH = 'firebase';
            mockUseAppState.mockImplementation(() => ({ user: {}, signIn: () => Promise.resolve(), isAuthReady: true }));
            render(React.createElement(LoginPage, null));
            expect(mockReplace).toHaveBeenCalledWith('/');
        });
        it('should render the login page when there is no user', () => {
            process.env.REACT_APP_SET_AUTH = 'firebase';
            mockUseAppState.mockImplementation(() => ({ user: null, signIn: () => Promise.resolve(), isAuthReady: true }));
            const { getByText } = render(React.createElement(LoginPage, null));
            expect(mockReplace).not.toHaveBeenCalled();
            expect(getByText('Sign in with Google')).toBeTruthy();
        });
        it('should redirect the user to "/" after signIn when there is no previous location', done => {
            process.env.REACT_APP_SET_AUTH = 'firebase';
            mockUseAppState.mockImplementation(() => ({ user: null, signIn: () => Promise.resolve(), isAuthReady: true }));
            const { getByText } = render(React.createElement(LoginPage, null));
            getByText('Sign in with Google').click();
            setImmediate(() => {
                expect(mockReplace).toHaveBeenCalledWith({ pathname: '/' });
                done();
            });
        });
        it('should redirect the user to their previous location after signIn', done => {
            process.env.REACT_APP_SET_AUTH = 'firebase';
            mockUseLocation.mockImplementation(() => ({ state: { from: { pathname: '/room/test' } } }));
            mockUseAppState.mockImplementation(() => ({ user: null, signIn: () => Promise.resolve(), isAuthReady: true }));
            const { getByText } = render(React.createElement(LoginPage, null));
            getByText('Sign in with Google').click();
            setImmediate(() => {
                expect(mockReplace).toHaveBeenCalledWith({ pathname: '/room/test' });
                done();
            });
        });
        it('should not render anything when isAuthReady is false', () => {
            process.env.REACT_APP_SET_AUTH = 'firebase';
            mockUseAppState.mockImplementation(() => ({ user: null, signIn: () => Promise.resolve(), isAuthReady: false }));
            const { container } = render(React.createElement(LoginPage, null));
            expect(mockReplace).not.toHaveBeenCalled();
            expect(container.children[0]).toBe(undefined);
        });
    });
    describe('with passcode auth enabled', () => {
        it('should call sign in with the supplied passcode', done => {
            const mockSignin = jest.fn(() => Promise.resolve());
            process.env.REACT_APP_SET_AUTH = 'passcode';
            mockUseAppState.mockImplementation(() => ({ user: null, signIn: mockSignin, isAuthReady: true }));
            const { getByLabelText, getByText } = render(React.createElement(LoginPage, null));
            act(() => {
                fireEvent.change(getByLabelText('Passcode'), { target: { value: '1234' } });
            });
            act(() => {
                fireEvent.submit(getByText('Submit'));
            });
            setImmediate(() => {
                expect(mockSignin).toHaveBeenCalledWith('1234');
                done();
            });
        });
        it('should call render error messages when signin fails', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockSignin = jest.fn(() => Promise.reject(new Error('Test Error')));
            process.env.REACT_APP_SET_AUTH = 'passcode';
            mockUseAppState.mockImplementation(() => ({ user: null, signIn: mockSignin, isAuthReady: true }));
            const { getByLabelText, getByText } = render(React.createElement(LoginPage, null));
            act(() => {
                fireEvent.change(getByLabelText('Passcode'), { target: { value: '1234' } });
            });
            act(() => {
                fireEvent.submit(getByText('Submit'));
            });
            const element = yield waitForElement(() => getByText('Test Error'));
            expect(element).toBeTruthy();
        }));
    });
    it('should redirect to "/" when auth is disabled', () => {
        delete process.env.REACT_APP_SET_AUTH;
        mockUseAppState.mockImplementation(() => ({ user: null, signIn: () => Promise.resolve(), isAuthReady: true }));
        render(React.createElement(LoginPage, null));
        expect(mockReplace).toHaveBeenCalledWith('/');
    });
});
