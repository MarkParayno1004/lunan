export const initialSettings = {
    trackSwitchOffMode: undefined,
    dominantSpeakerPriority: 'standard',
    bandwidthProfileMode: 'collaboration',
    maxAudioBitrate: '16000',
    contentPreferencesMode: 'auto',
    clientTrackSwitchOffControl: 'auto',
};
// This inputLabels object is used by ConnectionOptions.tsx. It is used to populate the id, name, and label props
// of the various input elements. Using a typed object like this (instead of strings) eliminates the possibility
// of there being a typo.
export const inputLabels = (() => {
    const target = {};
    for (const setting in initialSettings) {
        target[setting] = setting;
    }
    return target;
})();
export function settingsReducer(state, action) {
    return Object.assign(Object.assign({}, state), { [action.name]: action.value === 'default' ? undefined : action.value });
}
