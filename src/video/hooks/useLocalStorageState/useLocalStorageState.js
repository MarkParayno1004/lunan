import { useEffect, useState } from 'react';
export function useLocalStorageState(key, initialState) {
    const [value, setValue] = useState(() => {
        const item = window.localStorage.getItem(key);
        if (item !== null) {
            return JSON.parse(item);
        }
        else {
            return initialState;
        }
    });
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
}
