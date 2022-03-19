import { useLocalStorage } from "@/lib/LocalStorage";
import { getAll, Survivor } from "@/lib/survivor";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useSurvivors } from "../lib/useSurvivor";
import { Owner } from "./Owner";

export default function Survivors({initialData = []}: {initialData: Survivor[]}) {
    const [survivors, update] = useSurvivors();

    const spoilRef = useRef<HTMLSelectElement>(null);
    const [spoiloMeter, setSpoilometer] = useLocalStorage<number>('spoilometer', 0);
    const maxSpoiloMeter = Math.max(
        ...survivors.map((s) => s.EliminatedEpisode || 0)
    );
    const showComments = spoiloMeter === maxSpoiloMeter;
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
                            <option key={i+1} value={i+1}>Episode {i+1}</option>
                        ))}
                    </select>
                </form>
            </div>
            <main className="w-full p-2 gap-4 md:p-8 flex md:gap-8 flex-wrap">
                {owners.map((owner, i) => (
                    <Owner owner={owner} key={owner.name} leanRight={Boolean(i % 2)} update={update} spoilometer={spoiloMeter} showComments={showComments} />
                ))}
            </main>
        </div>
    );
}


export async function getStaticProps() {
    return [
        {
        "Owner": "Cara",
        "PickRank": "1",
        "GlobalPickRank": "1",
        "Name": "Drea",
        "OriginalTribe": "Ika",
        "EliminatedEpisode": "",
        "Comments": "power/danger? ",
        "row": 2
        },
        {
        "Owner": "Cara",
        "PickRank": "2",
        "GlobalPickRank": "8",
        "Name": "Rocksroy",
        "OriginalTribe": "Ika",
        "EliminatedEpisode": "",
        "Comments": "My future is on the rocks",
        "row": 3
        },
        {
        "Owner": "Cara",
        "PickRank": "3",
        "GlobalPickRank": "9",
        "Name": "Swati",
        "OriginalTribe": "Ika",
        "EliminatedEpisode": "",
        "Comments": "have I mentioned that I go to Harvard? (Lol - N)",
        "row": 4
        },
        {
        "Owner": "Cara",
        "PickRank": "4",
        "GlobalPickRank": "16",
        "Name": "Jonathan",
        "OriginalTribe": "Taku",
        "EliminatedEpisode": "",
        "Comments": "Christian metal screamer (Why pick me as the shouter!?)",
        "row": 5
        },
        {
        "Owner": "Nielen",
        "PickRank": "1",
        "GlobalPickRank": "4",
        "Name": "Tori",
        "OriginalTribe": "Ika",
        "EliminatedEpisode": "",
        "Comments": "I DONT HAVE AN IDOL OK",
        "row": 6
        },
        {
        "Owner": "Nielen",
        "PickRank": "2",
        "GlobalPickRank": "5",
        "Name": "Zach",
        "OriginalTribe": "Ika",
        "EliminatedEpisode": "1",
        "Comments": "Whyyyy did I choose him? - N",
        "VotedOutNumber": "2",
        "row": 7
        },
        {
        "Owner": "Nielen",
        "PickRank": "3",
        "GlobalPickRank": "12",
        "Name": "Daniel",
        "OriginalTribe": "Vati",
        "EliminatedEpisode": "",
        "Comments": "shoulda boy (shoulder - geddit?) (Took me a couple of reads before I did -C)",
        "row": 8
        },
        {
        "Owner": "Nielen",
        "PickRank": "4",
        "GlobalPickRank": "13",
        "Name": "Jenny",
        "OriginalTribe": "Vati",
        "EliminatedEpisode": "",
        "Comments": "S: I like her (me too but I hate her voice - N)",
        "row": 9
        },
        {
        "Owner": "Ryan",
        "PickRank": "1",
        "GlobalPickRank": "2",
        "Name": "Chanelle",
        "OriginalTribe": "Vati",
        "EliminatedEpisode": "",
        "Comments": "Wait who?",
        "row": 10
        },
        {
        "Owner": "Ryan",
        "PickRank": "2",
        "GlobalPickRank": "7",
        "Name": "Omar",
        "OriginalTribe": "Taku",
        "row": 11
        },
        {
        "Owner": "Ryan",
        "PickRank": "3",
        "GlobalPickRank": "10",
        "Name": "Maryanne",
        "OriginalTribe": "Taku",
        "EliminatedEpisode": "",
        "Comments": "LIFE IN ALL-CAPS!!!! (SDK - I ENJOY LIFE ALOT)",
        "row": 12
        },
        {
        "Owner": "Ryan",
        "PickRank": "4",
        "GlobalPickRank": "15",
        "Name": "Lydia",
        "OriginalTribe": "Vati",
        "EliminatedEpisode": "",
        "Comments": "I yell (and wear inappropriate pants - N) (\"the whitest white girl\" -C)",
        "row": 13
        },
        {
        "Owner": "Simey",
        "PickRank": "1",
        "GlobalPickRank": "3",
        "Name": "Hai",
        "OriginalTribe": "Vati",
        "EliminatedEpisode": "",
        "Comments": "vegan al die krappe eet? (Favourite quip sovêr - C)",
        "row": 14
        },
        {
        "Owner": "Simey",
        "PickRank": "2",
        "GlobalPickRank": "6",
        "Name": "Mike",
        "OriginalTribe": "Vati",
        "EliminatedEpisode": "",
        "Comments": "there's a fork in the road",
        "row": 15
        },
        {
        "Owner": "Simey",
        "PickRank": "3",
        "GlobalPickRank": "11",
        "Name": "Lindsay",
        "OriginalTribe": "Taku",
        "EliminatedEpisode": "",
        "Comments": "Bad Jew",
        "row": 16
        },
        {
        "Owner": "Simey",
        "PickRank": "4",
        "GlobalPickRank": "14",
        "Name": "Romeo",
        "OriginalTribe": "Ika",
        "EliminatedEpisode": "",
        "Comments": "If I didn't sit out the challenge I would be gone (true dat - N)",
        "row": 17
        },
        {
        "Owner": "Unpicked",
        "PickRank": "1",
        "GlobalPickRank": "17",
        "Name": "Jackson",
        "OriginalTribe": "Taku",
        "EliminatedEpisode": "1",
        "Comments": "Al least we got... ",
        "VotedOutNumber": "1",
        "row": 18
        },
        {
        "Owner": "Unpicked",
        "PickRank": "2",
        "GlobalPickRank": "18",
        "Name": "Marya",
        "OriginalTribe": "Taku",
        "EliminatedEpisode": "2",
        "Comments": "... These 2 just about right (shame man, her brother)",
        "VotedOutNumber": "3",
        "row": 19
        }
        ]
}
