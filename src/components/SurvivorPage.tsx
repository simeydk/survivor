import { useLocalStorage } from "@/lib/LocalStorage";
import Head from "next/head";
import Image from "next/image";
import { useSurvivors } from "../lib/useSurvivor";
import { Owner } from "./Owner";

export default function Survivors() {
    const [survivors, update] = useSurvivors();

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
                    <Image src="/s42.png" width="394" height="253" />
                </div>
            </header>
            <main className="w-full p-2 gap-4 md:p-8 flex md:gap-8 flex-wrap">
                {owners.map((owner, i) => (
                    <Owner owner={owner} key={owner.name} leanRight={Boolean(i % 2)} update={update} />
                ))}
            </main>
        </div>
    );
}



