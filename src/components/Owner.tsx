import { Survivor } from "../lib/survivor";
import { useState } from "react";
import { Contestant } from "./Contestant";

export function Owner({ owner, leanRight, update }: { owner: { name: string; survivors: Survivor[]; }; leanRight: boolean; update: (survivor: Survivor) => any; }) {
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
                    {survivors.map((survivor) => <Contestant key={survivor.Name} survivor={survivor} spoilometer={spoilometer} update={update} />)}
                </ul>
            </div>
        </div>
    );
}
