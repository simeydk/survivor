import Head from "next/head";
import Image from "next/image";
import { useSurvivors } from "../lib/useSurvivor";
import { Survivor } from "../lib/survivor";
import { useState } from "react";

function Owner({ owner, leanRight, update }: { owner: { name: string; survivors: Survivor[] }, leanRight: boolean, update: (survivor: Survivor) => any }) {
    const { name, survivors } = owner;
    const [spoilometer, setSpoilometer] = useState(2);
    
    return (
        <div className={"w-full max-w-sm p-4 md:p-8 relative paper shadow " + (leanRight ? "rotate-1" : "-rotate-1")}>
            {/* <div className="absolute inset-0 paper -rotate-1 shadow"></div> */}
            <div className="relative">
                <h2 className="font-survivor text-4xl rotate-1 text-amber-900">
                    {name.toUpperCase()}
                </h2>
                <ul className="flex flex-col gap-2">
                    {survivors.map((survivor) => <Contestant survivor={survivor} spoilometer={spoilometer} update={update} />)}
                </ul>
            </div>
        </div>
    );
}

function Contestant({survivor, spoilometer = 0, update} : {survivor: Survivor, spoilometer: number, update: (survivor: Survivor) => any}) {
    const { Name, Comments, EliminatedEpisode, OriginalTribe} = survivor
    const isEliminated = (EliminatedEpisode || 99) <= spoilometer 
    const imgSrc = IMG_SRC[Name.toLowerCase()]
    const tribeColor = TRIBE_COLORS[OriginalTribe.slice(0,1)]
    return (
        <li className="flex gap-2">
          <div>
          <div className={"relative -rotate-1 " + (isEliminated ? " grayscale brightness-90 " : "")}>

            <img src={imgSrc} className={"w-16 h-16 border-4 border-b-8  border-white " + (isEliminated ? " grayscale brightness-90 " : "")} />
            <div className={" absolute bottom-0 right-0 w-5 h-5 flex items-center justify-center font-['courier_new'] text-white rounded  rotate-3 font-bold text-sm " + tribeColor}>{OriginalTribe.slice(0,1)}</div>
            {isEliminated ? <div className="absolute inset-0 grid place-content-center font-['courier_new'] text-white font-bold text-3xl drop-shadow-md">{EliminatedEpisode}</div> : ''}
          </div> 
          </div>
        <div className="flex-grow">
            <h3 className={"font-['courier_new'] font-bold text-2xl text-stone-700 leading-none " + (isEliminated ? "line-through" : "" )}>
                {Name}
            </h3>
            <form action="" className="w-full">
              <textarea rows="2" value={Comments} className="p-1 rounded bg-white/50 w-full text-sm leading-tight"/>
            </form>
        </div>
        </li>
    );
}

export default function Home() {
    const [survivors, update] = useSurvivors();

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
                    <Owner owner={owner} leanRight={Boolean(i % 2)} update={update} />
                ))}
            </main>
        </div>
    );
}


const TRIBE_COLORS = {
  I: "bg-blue-500",
  V: "bg-green-600",
  T: "bg-yellow-600",
};

const IMG_SRC = {
  chanelle:
      "https://static.wikia.nocookie.net/survivor/images/c/cb/S42_chanelle_t.png",
  daniel: "https://static.wikia.nocookie.net/survivor/images/9/97/S42_daniel_t.png",
  drea: "https://static.wikia.nocookie.net/survivor/images/9/95/S42_drea_t.png",
  hai: "https://static.wikia.nocookie.net/survivor/images/2/29/S42_hai_t.png",
  jackson:
      "https://static.wikia.nocookie.net/survivor/images/b/bb/S42_jackson_t.png",
  jenny: "https://static.wikia.nocookie.net/survivor/images/6/6a/S42_jenny_t.png",
  jonathan:
      "https://static.wikia.nocookie.net/survivor/images/c/c8/S42_jonathan_t.png",
  lindsay:
      "https://static.wikia.nocookie.net/survivor/images/d/d7/S42_lindsay_t.png",
  lydia: "https://static.wikia.nocookie.net/survivor/images/9/93/S42_lydia_t.png",
  marya: "https://static.wikia.nocookie.net/survivor/images/1/1b/S42_marya_t.png",
  maryanne:
      "https://static.wikia.nocookie.net/survivor/images/2/26/S42_maryanne_t.png",
  mike: "https://static.wikia.nocookie.net/survivor/images/c/c7/S42_mike_t.png",
  omar: "https://static.wikia.nocookie.net/survivor/images/8/86/S42_omar_t.png",
  rocksroy:
      "https://static.wikia.nocookie.net/survivor/images/2/2c/S42_rocksroy_t.png",
  romeo: "https://static.wikia.nocookie.net/survivor/images/0/09/S42_romeo_t.png",
  swati: "https://static.wikia.nocookie.net/survivor/images/3/3b/S42_swati_t.png",
  tori: "https://static.wikia.nocookie.net/survivor/images/2/24/S42_tori_t.png",
  zach: "https://static.wikia.nocookie.net/survivor/images/d/db/S42_zach_t.png",
};
