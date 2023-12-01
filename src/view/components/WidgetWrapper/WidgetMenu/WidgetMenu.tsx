import {useWidgetMenu} from "./useWidgetMenu"
import styles from "./WidgetMenu.module.css"
import MpIcon from "@/view/materialPoo/MpIcon";
import MpText from "@/view/materialPoo/MpText";
import ConfirmActionDialog from "@/view/components/ConfirmActionDialog/ConfirmActionDialog";
import {useContext, useRef} from "react";
import {AppPageContext} from "@/view/pages/AppPage/AppPageContext";

type Props = {
    isOpen: boolean
    onClose: () => void
    panelUid: string
}

export default function WidgetMenu(props: Props) {
    const bgRef = useRef<HTMLDivElement>(null)
    useWidgetMenu(props.isOpen, props.onClose, bgRef)

    const {
        setDeleteWidgetDialogOpenFor,
        setWidgetOptionsDialogOpenFor,
    } = useContext(AppPageContext)

    return (
        <>
            <div
                className={styles.bg}
                data-shown={props.isOpen}
                ref={bgRef}
            >
                <div
                    className={styles.menu}
                    data-shown={props.isOpen}
                >
                    <div
                        className={styles.menuOption}
                        onClick={() => {
                            setWidgetOptionsDialogOpenFor(props.panelUid)
                            props.onClose()
                        }}
                    >
                        <MpIcon icon="settings"/>
                        <MpText scale="body" noMargin>Settings</MpText>
                    </div>
                    <div
                        className={styles.menuOption}
                        onClick={() => {
                            setDeleteWidgetDialogOpenFor(props.panelUid)
                            props.onClose()
                        }}
                    >
                        <MpIcon icon="delete"/>
                        <MpText scale="body" noMargin>Delete</MpText>
                    </div>
                </div>
            </div>
        </>
    )
}