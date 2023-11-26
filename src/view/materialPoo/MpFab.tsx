import MpIcon from "@/view/materialPoo/MpIcon";
import MpText from "@/view/materialPoo/MpText";

type MpFabProps = {
    icon: string,
    label?: string,
    isPrimary?: boolean,
    floatingPos?: 'default' | 'left' | 'right'
    className?: string
}

export default function MpFab(props: MpFabProps) {
    return(
        <div className="mp-fab"
             data-pos={props.floatingPos || "default"}
             data-expanded={props.label != undefined}
             data-primary={props.isPrimary}
        >
            <MpIcon icon={props.icon}/>
            { props.label &&
                <MpText scale="body">{props.label}</MpText>
            }
        </div>
    )
}