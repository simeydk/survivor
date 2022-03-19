import { useLocalStorage } from "@/lib/LocalStorage";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useSurvivors } from "../lib/useSurvivor";
import { Owner } from "./Owner";

export default function Survivors() {
    const [survivors, update] = useSurvivors();

    const spoilRef = useRef<HTMLSelectElement>(null);
    const [spoiloMeter, setSpoilometer] = useLocalStorage<number>('spoilometer', 0);
    const maxSpoiloMeter = Math.max(
        ...survivors.map((s) => s.EliminatedEpisode || 0)
    );
    useEffect(() => {spoilRef.current && (spoilRef.current.value = String(spoiloMeter))}, [])

    // const [spoilometer, setSpoilometer] = useLocalStorage<number>("spoilometer", 0);

    const owners = ["Cara", "Ryan", "Nielen", "Simey", "Unpicked"].map(
        (name) => ({
            name,
            survivors: survivors.filter((s) => s.Owner === name),
        })
    );

    return (
        <div className="h-screen flex flex-col relative bg-stone-200 overflow-auto">
            <Head>
                <title>Survivor 42</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="w-full flex justify-center p-4">
                <div className="w-48 h-32">
                    <Image src="/s42.png" width="394" height="253" alt="Survivor season 42" />
                </div>
            </header>
            <div className="flex justify-center">
                <form className="flex justify-center items-center gap-2 px-2 p-1 paper rounded shadow">
                    <label htmlFor="spoilometer" className="font-['courier_new'] font-bold leading-none">Spoilometer</label>
                    <select
                        name="spoilometer"
                        value={spoiloMeter}
                        onChange={(e) => setSpoilometer(Number(e.target.value))}
                        ref={spoilRef}
                        className="text-sm px-2 p-1 bg-white/50 rounded border"
                    >
                        <option value={0}>Start</option>
                        {Array.from(
                            { length: maxSpoiloMeter },
                            (_, i) => i
                        ).map((i) => (
                            <option value={i+1}>Episode {i+1}</option>
                        ))}
                    </select>
                </form>
            </div>
            <main className="w-full p-2 gap-4 md:p-8 flex md:gap-8 flex-wrap">
                {owners.map((owner, i) => (
                    <Owner owner={owner} key={owner.name} leanRight={Boolean(i % 2)} update={update} spoilometer={spoiloMeter} />
                ))}
            </main>
        </div>
    );
}



