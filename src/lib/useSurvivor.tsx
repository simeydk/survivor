import { useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";
import { Survivor } from "./survivor";

const API_URL = "/api/survivor";

export const fetchJSON = async (url: string) => fetch(url).then((res) => res.json());

export function useSurvivors(): [Survivor[], (survivor: Survivor) => any] {
    const { data, error } = useSWR<Survivor[]>(API_URL, fetchJSON);
    const { mutate } = useSWRConfig();

    const survivors = data || [];

    const refresh = () => {
        mutate(API_URL);
    };

    const update = async (survivor: Survivor) => {
        mutate(
            API_URL,
            survivors.map((s) => (s.row === survivor.row ? survivor : s)),
            false
        );
        const response = await fetch(API_URL, {
            method: "PUT",
            body: JSON.stringify(survivor),
        });
        await refresh();
        return response;
    };

    useEffect(() => {
        mutate(API_URL);
    }, []);
    return [survivors, update];
}
