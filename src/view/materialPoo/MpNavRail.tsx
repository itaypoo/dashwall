import {useState} from "react";
import MpIcon from "./MpIcon";
import MpTooltip from "@/view/materialPoo/MpTooltip";

type MpNavRailProps = {
    items: MpNavRailItem[],
    fabIcon?: string,
    fabLabel?: string,
    onFabClick?: () => void,
    onItemClick?: (id: string) => void,
    initialSelectedId: string,
    className?: string
}

type MpNavRailItem = {
    icon: string,
    label: string,
    id: string
}

export default function MpNavRail(props: MpNavRailProps) {
    const [selectedId, setSelectedId] = useState(props.initialSelectedId);

    return (
        <div className={"mp-nav-rail "+props?.className}>
            { props.fabIcon && props.fabLabel &&
                <MpTooltip text={props.fabLabel||""}>
                    <div className="mp-nav-rail-fab" onClick={props.onFabClick}>
                        <MpIcon icon={props.fabIcon}/>
                    </div>
                </MpTooltip>
            }
            { props.fabIcon && !props.fabLabel &&
                <div className="mp-nav-rail-fab" onClick={props.onFabClick}>
                    <MpIcon icon={props.fabIcon}/>
                </div>
            }

            <div className={"mp-nav-rail-separator"}/>

            { props.items.map((item, index) => {
                return (
                    <div className="mp-nav-rail-item" key={index} data-selected={item.id === selectedId}
                         onClick={() => {setSelectedId(item.id); props.onItemClick && props.onItemClick(item.id)}}
                    >
                        <div className="icon-wrapper"><MpIcon icon={item.icon}/></div>
                        <span className="label">{item.label}</span>
                    </div>
                )
            })}
        </div>
    )
}