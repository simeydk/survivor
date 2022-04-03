import { Survivor } from "../lib/survivor";
import { IMG_SRC } from "../lib/IMG_SRC";
import { TRIBE_COLORS } from "../lib/TRIBE_COLORS";
import { useDebouncedState } from './../lib/useDebouncedState';

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
    const { Name, Comments, EliminatedEpisode, OriginalTribe, VotedOutNumber } = survivor;
    const isEliminated = (EliminatedEpisode || 99) <= spoilometer;
    const imgSrc = IMG_SRC[Name.toLowerCase()];
    const tribeColor = TRIBE_COLORS[OriginalTribe.slice(0, 1)];
    // @ts-ignore
    const [comment, setComment] = useDebouncedState(Comments, x => update({...survivor, Comments: x}) , 500);
    
    
    return (
        <li className="flex gap-2">
            <div>
                <div
                    className={
                        "relative -rotate-1 p-1 pb-2 bg-white drop-shadow " +
                        (isEliminated ? " grayscale brightness-90 " : "")
                    }
                >
                    <img
                        src={imgSrc}
                        alt={Name}
                        className={
                            "w-12 h-12 " +
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
                            {VotedOutNumber}
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
                        rows={3}
                        placeholder="notes and quips"
                        className="p-1 rounded bg-white/35 w-full text-sm leading-tight placeholder:text-stone-600 placeholder:italic"
                        // @ts-ignore
                        value={comment} onChange={(e) => setComment(e.target.value )}
                        onFocusOut
                    /> :
                    <textarea
                        key="disabled"
                        rows={3}
                        className="p-1 rounded bg-stone-300/50 w-full text-sm leading-tight"
                        disabled
                        value=""
                    />}
                </form>
            </div>
        </li>
    );
}
