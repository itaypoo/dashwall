import React from "react";

type MpTextProps = {
    scale: "fineprint" | "body" | "subtitle" | "title" | "heading"
    noMargin?: boolean
    className?: string
}

export default function MpText(props: React.PropsWithChildren<MpTextProps>) {
    return (
        <p className={"mp-text "+props.className} data-scale={props.scale} data-nomargin={props.noMargin}>
            {props.children}
        </p>
    )
}