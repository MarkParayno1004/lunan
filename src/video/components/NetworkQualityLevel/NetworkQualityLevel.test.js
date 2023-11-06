import renderer from 'react-test-renderer';
import NetworkQualityLevel from './NetworkQualityLevel';
describe('the NetworkQualityLevel component', () => {
    it('should render correctly for level 5', () => {
        const mockParticipant = { networkQualityLevel: 5, on: () => { } };
        const tree = renderer.create(React.createElement(NetworkQualityLevel, { participant: mockParticipant })).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('should render correctly for level 3', () => {
        const mockParticipant = { networkQualityLevel: 3, on: () => { } };
        const tree = renderer.create(React.createElement(NetworkQualityLevel, { participant: mockParticipant })).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('should render correctly for level 0', () => {
        const mockParticipant = { networkQualityLevel: 0, on: () => { } };
        const tree = renderer.create(React.createElement(NetworkQualityLevel, { participant: mockParticipant })).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
