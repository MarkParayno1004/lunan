import { EventEmitter } from 'events';
class MockRoom extends EventEmitter {
    constructor() {
        super(...arguments);
        this.state = 'connected';
        this.disconnect = jest.fn();
        this.localParticipant = {
            publishTrack: jest.fn(),
            videoTracks: [{ setPriority: jest.fn() }],
        };
    }
}
const mockRoom = new MockRoom();
class MockTrack extends EventEmitter {
    constructor(kind) {
        super();
        this.kind = '';
        this.stop = jest.fn();
        this.mediaStreamTrack = { getSettings: () => ({ deviceId: 'mockDeviceId' }) };
        this.kind = kind;
    }
}
const twilioVideo = {
    connect: jest.fn(() => Promise.resolve(mockRoom)),
    createLocalTracks: jest.fn(
    // Here we use setTimeout so we can control when this function resolves with jest.runAllTimers()
    () => new Promise(resolve => setTimeout(() => resolve([new MockTrack('video'), new MockTrack('audio')])))),
    createLocalVideoTrack: jest.fn(() => new Promise(resolve => setTimeout(() => resolve(new MockTrack('video'))))),
};
export { mockRoom };
export default twilioVideo;
