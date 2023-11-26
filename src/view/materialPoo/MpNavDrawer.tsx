import React, {useEffect, useState} from "react";
import MpIcon from "./MpIcon";

type MpNavDrawerProps = {
    items: string[],
    titles?: Title[]
    onItemSelected: (index: number) => void,
    itemIcons?: string[],
    autoNumberItems?: boolean,
    initialSelected?: number,
    className?: string
}

type Title = {
    name: string,
    beforeItemIndex: number
}

export default function MpNavDrawer(props: React.PropsWithChildren<MpNavDrawerProps>) {
    const [selectedIndex, setSelectedIndex] = useState<number>(props.initialSelected || 0)
    const [combinedList, setCombinedList] = useState<(string|Title)[]>([])

    useEffect(() => {
        const arr: (string|Title)[] = []
        for(let i = 0; i < props.items.length; i++) {
            const titleHere = props.titles?.find(title => title.beforeItemIndex == i)
            if(titleHere) {
                arr.push(titleHere)
            }
            arr.push(props.items[i])
        }
        setCombinedList(arr)
    }, [props.titles, props.items]);

    return (
        <div className={"mp-nav-drawer "+props.className}>
            {props.children}

            { combinedList.map((entry, index) => {
                if(typeof entry === "object") {
                    return(
                        <p className="mp-nav-drawer-title" key={index}>{entry.name}</p>
                    )
                }
                else {
                    const realIndex = props.items.indexOf(entry)
                    return (
                        <div key={index}
                             className={"mp-nav-drawer-item "+(selectedIndex === realIndex ? "selected" : "")}
                             onClick={() => {setSelectedIndex(realIndex); props.onItemSelected(realIndex)}}
                        >
                            { props.itemIcons && props.itemIcons[realIndex] &&
                                <MpIcon icon={props.itemIcons[realIndex]}/>
                            }
                            { props.autoNumberItems &&
                                <p>{realIndex+" | "+entry}</p>
                            }
                            { !props.autoNumberItems &&
                                <p>{realIndex}</p>
                            }
                        </div>
                    )
                }
            })}
        </div>
    )
}