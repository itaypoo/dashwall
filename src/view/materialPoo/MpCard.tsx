import React from "react";

type MpCardProps = {
    type: "primary" | "filled" | "outlined",
    isHeader?: boolean,
    onClick?: () => void,
    className?: string,
    fade?: string,
}

export default function MpCard(props: React.PropsWithChildren<MpCardProps>) {
    return(
        <div className={"mp-card "+props.className} data-type={props.type} data-header={props.isHeader} onClick={props.onClick} data-fade={props.fade}>
            { props.children }
        </div>
    )
}