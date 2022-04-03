import { useLocalStorage } from "@/lib/LocalStorage";
import { Survivor } from "@/lib/survivor";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useSurvivors } from "../lib/useSurvivor";
import { Owner } from "./Owner";
import { Note } from "./Note";

export default function Survivors({
    initialData = [],
    renderTime = null,
}: {
    initialData: Survivor[];
    renderTime: any;
}) {
    const [survivors, update] = useSurvivors(initialData);

    const spoilRef = useRef<HTMLSelectElement>(null);
    const [spoiloMeter, setSpoilometer] = useLocalStorage<number>(
        "spoilometer",
        0
    );
    useEffect(() => {
        spoilRef.current && (spoilRef.current.value = String(spoiloMeter));
    }, []);

    const maxSpoiloMeter = Math.max(
        ...survivors.map((s) => s.EliminatedEpisode || 0)
    );
    const showComments = spoiloMeter === maxSpoiloMeter;

    const numContestantsLeft: number = survivors.filter(survivor => (survivor.GlobalPickRank > 0) && !(survivor.EliminatedEpisode >= 1) ).length;

    const owners = ["Cara", "Ryan", "Nielen", "Simey", "Unpicked"].map(
        (name) => ({
            name,
            survivors: survivors.filter((s) => s.Owner === name),
            owner: survivors.filter((s) => s.Name === name)[0],
        })
    );

    const free = survivors.filter((s) => s.Owner === "Free")[0];
    const episodes = survivors.filter(
        (s) => s.Owner === "Episode" && s.PickRank <= maxSpoiloMeter
    );

    return (
        <div className="h-screen flex flex-col relative bg-stone-200 overflow-auto">
            <Head>
                <title>Survivor 42</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="w-full flex justify-center p-4">
                <div className="w-48 h-32">
                    <Image
                        src="/s42.png"
                        width="394"
                        height="253"
                        alt="Survivor season 42"
                    />
                </div>
            </header>
            <div className="flex justify-center">
                <form className="flex justify-center items-center gap-2 px-2 p-1 paper rounded shadow">
                    <label
                        htmlFor="spoilometer"
                        className="font-['courier_new'] font-bold leading-none"
                    >
                        Spoilometer
                    </label>
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
                            <option key={i + 1} value={i + 1}>
                                Episode {i + 1}
                            </option>
                        ))}
                    </select>
                </form>
                
            </div>
            <div className="flex flex-col gap-2 items-center p-4">
                <div className="h-8">
            {showComments && <h3 className="font-survivor text-amber-800 text-lg">{numContestantsLeft} are left</h3>}
                </div>
                <div className="max-w-xl paper p-4 w-full flex flex-col gap-4 shadow -rotate-1">
                    
                    <h2 className="font-survivor text-4xl rotate-1 text-amber-900 mb-4 ">
                        Dear Diary
                    </h2>

                    <Note
                        survivor={free}
                        showComments={spoiloMeter === maxSpoiloMeter}
                        update={update}
                        title=""
                    />
                    {episodes.map((episode) => <Note key={episode.Name} survivor={episode} update={update} showComments={episode.PickRank <= spoiloMeter} />)}
                </div>
            </div>
            
            <main className="w-full py-8 p-1 gap-6 md:p-8 flex md:gap-8 flex-wrap justify-center items-start">
                {owners.map((owner, i) => (
                    <Owner
                        owner={owner}
                        key={owner.name}
                        leanRight={Boolean(i % 2)}
                        update={update}
                        spoilometer={spoiloMeter}
                        showComments={showComments}
                    />
                ))}
            </main>
            <footer className="py-8 font-['courier_new'] text-sm font-bold text-stone-500 text-center">
                <div>
                    Edit on{" "}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://docs.google.com/spreadsheets/d/1mL3Gx1u-9pBJaj75a0HhsHPkgkQJZKMOtcoIHUAjCKM/edit#gid=0"
                        className="underline"
                    >
                        Google Sheets
                    </a>
                </div>
                <div>
                    rendered {new Date(renderTime).toLocaleString("en-ZA")}
                </div>
            </footer>
        </div>
    );
}
