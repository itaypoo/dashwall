import MpIcon from "@/view/materialPoo/MpIcon";
import MpIconButton from "@/view/materialPoo/MpIconButton";

type MpBottomAppBarProps = {
    iconButtons: string[],
    fabIcon: string,
    onIconClick: (icon: string) => void,
    onFabClick: () => void,
}

export default function MpBottomAppBar(props: MpBottomAppBarProps) {
    return (
        <div className="mp-bottom-app-bar">
            <div className="mpbap-fab" onClick={props.onFabClick}>
                <MpIcon icon={props.fabIcon}/>
            </div>
            <div className="mpbap-icons">
                { props.iconButtons.map((icon, index) => (
                    <MpIconButton type="text" icon={icon} key={index} onClick={() => props.onIconClick(icon)}/>
                ))}
            </div>
        </div>
    )
}