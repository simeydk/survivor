import { Survivor } from "../lib/survivor";
import { IMG_SRC } from "../lib/IMG_SRC";
import { TRIBE_COLORS } from "../lib/TRIBE_COLORS";

export function Contestant({
    survivor,
    spoilometer = 0,
    update,
    showComments = false,
}: {
    survivor: Survivor;
    spoilometer: number;
    update: (survivor: Survivor) => any;
    showComments: boolean;
}) {
    const { Name, Comments, EliminatedEpisode, OriginalTribe } = survivor;
    const isEliminated = (EliminatedEpisode || 99) <= spoilometer;
    const imgSrc = IMG_SRC[Name.toLowerCase()];
    const tribeColor = TRIBE_COLORS[OriginalTribe.slice(0, 1)];
    return (
        <li className="flex gap-2">
            <div>
                <div
                    className={
                        "relative -rotate-1 " +
                        (isEliminated ? " grayscale brightness-90 " : "")
                    }
                >
                    <img
                        src={imgSrc}
                        alt={Name}
                        className={
                            "w-16 h-16 border-4 border-b-8  border-white " +
                            (isEliminated ? " grayscale brightness-90 " : "")
                        }
                    />
                    <div
                        className={
                            " absolute bottom-0 right-0 w-5 h-5 flex items-center justify-center font-['courier_new'] text-white rounded  rotate-3 font-bold text-sm " +
                            tribeColor
                        }
                    >
                        {OriginalTribe.slice(0, 1)}
                    </div>
                    {isEliminated ? (
                        <div className="absolute inset-0 grid place-content-center font-['courier_new'] text-white font-bold text-3xl drop-shadow-md">
                            {EliminatedEpisode}
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
            <div className="flex-grow">
                <h3
                    className={
                        "font-['courier_new'] font-bold text-2xl text-stone-700 leading-none " +
                        (isEliminated ? "line-through" : "")
                    }
                >
                    {Name}
                </h3>
                <form action="" className="w-full">
                    {showComments ? <textarea
                        key="comments"
                        rows={2}
                        className="p-1 rounded bg-white/50 w-full text-sm leading-tight"
                        value={Comments}
                        onChange={(e) => update({ ...survivor, Comments: e.target.value })}
                    /> :
                    <textarea
                        key="disabled"
                        rows={2}
                        className="p-1 rounded bg-stone-300/75 w-full text-sm leading-tight"
                        disabled
                        value=""
                    />}
                </form>
            </div>
        </li>
    );
}
