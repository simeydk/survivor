import { useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";
import { Survivor } from "./survivor";
import debounce from 'lodash.debounce'

const API_URL = "/api/survivor";

export const fetchJSON = async (url: string) => fetch(url).then((res) => res.json());

const debouncedFetch = debounce(fetchJSON, 300);

export function useSurvivors(initialData: Survivor[] = []): [Survivor[], (survivor: Survivor) => any] {
    const { data, error } = useSWR<Survivor[]>(API_URL, fetchJSON);
    const { mutate } = useSWRConfig();

    const survivors = data || initialData;

    const refresh = () => {
        mutate(API_URL);
    };

    const pushnpull = async (survivor: Survivor) => {
        const response = await fetch(API_URL, {
            method: "PUT",
            body: JSON.stringify(survivor),
        });
        await refresh();
        return response;
    }
    const debouncedPushnpull = debounce(pushnpull, 1000);

    const update = async (survivor: Survivor) => {
        console.log({update:'update', survivor});
        mutate(
            API_URL,
            survivors.map((s) => (s.row === survivor.row ? survivor : s)),
            false
        );
        return await debouncedPushnpull(survivor);
    };

    useEffect(() => {
        mutate(API_URL);
    }, []);
    return [survivors, update];
}
