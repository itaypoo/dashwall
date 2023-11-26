import MpText from "@/view/materialPoo/MpText";
import {useEffect, useState} from "react";

type MpProgressBarProps = {
    progress: number
    max: number
    showProgressText?: boolean
}

export default function MpProgressBar(props: MpProgressBarProps) {
    const [percent, setPercent] = useState(0)
    useEffect(() => {
        setPercent(Math.round(props.progress / props.max * 100))
    }, [props.progress, props.max])

    return (
        <div className="mp-progress-bar">
            { props.showProgressText &&
                <MpText scale="fineprint">{percent + "%"}</MpText>
            }
            <progress max={props.max} value={props.progress} />
        </div>
)
}
