import React from "react";

type MpPageLayoutProps = {
    gap?: string,
    className?: string
}

export default function MpPageLayout(props: React.PropsWithChildren<MpPageLayoutProps>) {
    return(
        <div
            className={"mp-page-layout "+props.className}
        >
            <div
                style={{gap: props.gap || "12px"}}
            >
                {props.children}
            </div>
        </div>
    )
}