import {useEffect, useState} from "react";
import MpIconButton from "./MpIconButton";

type MpSnackbarProps = {
    message: string,
    messageId?: number,
    isError?: boolean,
    durationMillis?: number,
    className?: string,
}
// To show the same message multiple times, use a unique messageID

export default function MpSnackbar(props: MpSnackbarProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if(props.message == "") return
        setIsVisible(true)
        const t = setTimeout(() => {
            setIsVisible(false)
        }, props.durationMillis || 3000)

        return () => {
            setIsVisible(false)
            clearTimeout(t)
        }
    }, [props.messageId, props.message])

    return (
        <div className={"mp-snackbar "+props.className}
             data-visible={isVisible}
             data-error={props.isError}
             key={props.messageId+props.message+"mpsnackbar"}
        >
            <div>
                <MpIconButton type="text" icon="close" onClick={()=>{setIsVisible(false)}}/>
                <p>{props.message}</p>
            </div>
        </div>
    )
}