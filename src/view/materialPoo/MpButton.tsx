import React from "react";

type MpButtonProps = {
    type: "filled" | "outlined" | "text";
    onClick?: () => void,
    isDisabled?: boolean
    isHuge?: boolean,
    className?: string,
}

export default function MpButton(props: React.PropsWithChildren<MpButtonProps>) {
    return (
        <button
            className={"mp-button "+props.className}
            data-type={props.type} data-huge={props.isHuge}
            data-disabled={props.isDisabled}
            onClick={props.isDisabled ? undefined : props.onClick}
        >
            {props.children}
        </button>
    )
}