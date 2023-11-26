import MpText from "@/view/materialPoo/MpText";
import {PropsWithChildren} from "react";

type MpTooltipProps = {
    text: string;
    width?: string;
    className?: string;
}

export default function MpTooltip(props: PropsWithChildren<MpTooltipProps>) {
    return (
        <div className={"mp-tooltip "+props.className}>
            { props.children }
            <div className="mp-tooltip-text" style={props.width ? {width: props.width} : {}}>
                { props.text }
            </div>
        </div>
    )
}