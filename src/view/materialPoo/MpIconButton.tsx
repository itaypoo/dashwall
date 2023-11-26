import MpIcon from "./MpIcon";
import React from "react";

type MpIconButtonProps = {
    type: "primary" | "outlined" | "text",
    icon: string,
    isDisabled?: boolean,
    onClick?: React.MouseEventHandler<HTMLDivElement>,
    className?: string
}

export default function MpIconButton(props: MpIconButtonProps) {
    return (
        <div
            onClick={props.isDisabled ? undefined : props.onClick}
            className={"mp-icon-button "+props.className}
            data-type={props.type}
            data-disabled={props.isDisabled}
        >
            <MpIcon icon={props.icon}/>
        </div>
    )
}