import React, {useState} from "react";

type MpTextboxProps = {
    hint: string,
    text: string,
    onTextChange: (text: string) => void,
    className?: string,
}

export default function MpTextarea(props: React.PropsWithChildren<MpTextboxProps>) {
    return (
        <div className={"mp-textarea "+props.className}>
            <textarea placeholder={"a"} value={props.text} onChange={(event) => {props.onTextChange(event.target.value);}}/>
            <label>{props.hint}</label>
        </div>
    )
}