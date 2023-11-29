import {useWidgetMenu} from "./useWidgetMenu"
import styles from "./WidgetMenu.module.css"
import MpIcon from "@/view/materialPoo/MpIcon";
import MpText from "@/view/materialPoo/MpText";

type Props = {
    isOpen: boolean
    onClose: () => void
}

export default function WidgetMenu(props: Props) {
    useWidgetMenu(props.isOpen, props.onClose)

    return (
        <div
            className={styles.bg}
            data-shown={props.isOpen}
            onClick={props.onClose}
        >
            <div
                className={styles.menu}
                data-shown={props.isOpen}
                onClick={e => e.stopPropagation()}
            >
                <div className={styles.menuOption}>
                    <MpIcon icon="settings"/>
                    <MpText scale="body" noMargin>Settings</MpText>
                </div>
                <div className={styles.menuOption}>
                    <MpIcon icon="delete"/>
                    <MpText scale="body" noMargin>Delete</MpText>
                </div>
            </div>
        </div>
    )
}