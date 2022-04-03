import { Survivor } from "../lib/survivor";
import { IMG_SRC } from "../lib/IMG_SRC";
import { TRIBE_COLORS } from "../lib/TRIBE_COLORS";
import { useDebouncedState } from '../lib/useDebouncedState';

export function Note({
    survivor,
    update,
    showComments = false,
    rows = 4,
    title,
}: {
    survivor: Survivor;
    update: (survivor: Survivor) => any;
    showComments: boolean;
    rows?: number;
    title?: string;
}) {
    const { Name, Comments } = survivor;
    
    // @ts-ignore
    const [comment, setComment] = useDebouncedState(Comments, x => update({...survivor, Comments: x}) , 500);
    
    
    return (
        <li className="flex gap-2">

            <div className="flex-grow">
                <h3
                    className={
                        "font-['courier_new'] font-bold text-2xl text-stone-700 leading-none "
                    }
                >
                    {title === undefined ? Name : title}
                </h3>
                <form action="" className="w-full">
                    {showComments ? <textarea
                        key="comments"
                        rows={rows}
                        placeholder="notes and quips"
                        className="p-1 rounded bg-white/25 w-full text-sm leading-tight placeholder:text-stone-600 placeholder:italic"
                        // @ts-ignore
                        value={comment} onChange={(e) => setComment(e.target.value )}
                        onFocusOut
                    /> :
                    <textarea
                        key="disabled"
                        rows={rows}
                        className="p-1 rounded bg-stone-300/50 w-full text-sm leading-tight"
                        disabled
                        value=""
                    />}
                </form>
            </div>
        </li>
    );
}
