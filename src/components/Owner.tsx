import { Survivor } from "../lib/survivor";
import { useState } from "react";
import { Contestant } from "./Contestant";

export function Owner({ owner, leanRight, update, spoilometer=0, showComments=false }: { owner: { name: string; survivors: Survivor[]; }; leanRight: boolean; update: (survivor: Survivor) => any; spoilometer: number, showComments: boolean; }) {
    const { name, survivors } = owner;

    const numContestantsLeft: number = survivors.filter((s) => (!s.EliminatedEpisode)).length;
    const isEliminated = numContestantsLeft == 0
    const eliminatedTitleClass = isEliminated ? "" : "" // name.startsWith('C') ? " saturate-[0.75] line-through" : ""

    return (
        <div className={"w-full max-w-md p-4 md:p-8 relative shadow paper " + (leanRight ? "rotate-1" : "-rotate-1 ")}>
            {/* <div className="absolute inset-0 paper -rotate-1 shadow"></div> */}
            <div className="relative">
                <h2 className={"font-survivor text-4xl rotate-1 text-amber-900 mb-4 " + eliminatedTitleClass}>
                    {name.toUpperCase()}
                </h2>
                <ul className="flex flex-col gap-2">
                    {survivors.map((survivor) => <Contestant key={survivor.Name} survivor={survivor} spoilometer={spoilometer} update={update} showComments={showComments}/>)}
                </ul>
            </div>
        </div>
    );
}
