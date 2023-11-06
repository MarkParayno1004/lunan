import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'isomorphic-fetch';
configure({ adapter: new Adapter() });
// Mocks the Fullscreen API. This is needed for ToggleFullScreenButton.test.tsx.
Object.defineProperty(document, 'fullscreenEnabled', { value: true, writable: true });
class LocalStorage {
    constructor() {
        this.store = {};
    }
    getItem(key) {
        return this.store[key] ? this.store[key] : null;
    }
    setItem(key, value) {
        this.store[key] = value;
    }
    clear() {
        this.store = {};
    }
}
Object.defineProperty(window, 'localStorage', { value: new LocalStorage() });
// This is to suppress the "Platform browser has already been set." warnings from the video-processors library
jest.mock('@twilio/video-processors', () => ({}));
