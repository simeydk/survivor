import debounce from "lodash.debounce";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";


export function useDebouncedState<T>(value: T,
    setValue: Dispatch<SetStateAction<T>>,
    delayMs: number): (T | ((newValue: T) => void))[] {
    const [draft, setDraft] = useState<T>(value);
    const debouncedSetValue = useCallback(debounce(x => { console.log(x); setValue(x); }, delayMs, { trailing: true }), []);
    const setter = (newValue: T) => {
        setDraft(newValue);
        debouncedSetValue(newValue);
    };
    useEffect(() => {
        if (draft !== value) {
            setDraft(value);
        }
    }, [value]);
    return [draft, setter];
}