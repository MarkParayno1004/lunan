import { useState, useEffect } from 'react';
export default function useVideoTrackDimensions(track) {
    const [dimensions, setDimensions] = useState(track === null || track === void 0 ? void 0 : track.dimensions);
    useEffect(() => {
        setDimensions(track === null || track === void 0 ? void 0 : track.dimensions);
        if (track) {
            const handleDimensionsChanged = (newTrack) => setDimensions({
                width: newTrack.dimensions.width,
                height: newTrack.dimensions.height,
            });
            track.on('dimensionsChanged', handleDimensionsChanged);
            return () => {
                track.off('dimensionsChanged', handleDimensionsChanged);
            };
        }
    }, [track]);
    return dimensions;
}
