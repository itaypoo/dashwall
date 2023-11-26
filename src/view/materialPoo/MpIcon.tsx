import React from "react";

type MpIconProps = {
    icon: string,
    onClick?: () => void,
    className?: string
}

export default function MpIcon(props: MpIconProps) {
    return (
        <>
            <span className={"material-symbols-rounded mp-icon "+props.className} onClick={props.onClick}>
                {props.icon}
            </span>
        </>
    )
}