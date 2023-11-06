import { useEffect, useState } from 'react';
export default function useHeight() {
    var _a;
    const [height, setHeight] = useState(window.innerHeight * (((_a = window.visualViewport) === null || _a === void 0 ? void 0 : _a.scale) || 1));
    useEffect(() => {
        const onResize = () => {
            var _a;
            setHeight(window.innerHeight * (((_a = window.visualViewport) === null || _a === void 0 ? void 0 : _a.scale) || 1));
        };
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    });
    return height + 'px';
}
