import {useChangeThemeDialog} from "./useChangeThemeDialog"
import styles from "./ChangeThemeDialog.module.css"
import MpDialog from "@/view/materialPoo/MpDialog";
import MpButton from "@/view/materialPoo/MpButton";
import MpSwitch from "@/view/materialPoo/MpSwitch";
import {useContext} from "react";
import {AppPageContext} from "@/view/pages/AppPage/AppPageContext";
import MpText from "@/view/materialPoo/MpText";

type Props = {
    isOpen: boolean
    onClose: () => void
}

export default function ChangeThemeDialog(props: Props) {
    const {
        autoCycleHue,
        setAutoCycleHue,
    } = useContext(AppPageContext)

    return (
        <MpDialog isOpen={props.isOpen} >
            <p className="mp-dialog-title">Change the global theme</p>
            <div className={styles.content}>
                <div className={styles.switchWrapper}>
                    <MpText scale="body" noMargin>Alternate theme throughout the day</MpText>
                    <MpSwitch
                        isInitiallyChecked={autoCycleHue}
                        onChange={setAutoCycleHue}
                    />
                </div>
                <div className={styles.dummyWidget}>
                    <p>Example Widget</p>
                    <p>This is how the current theme looks like.</p>
                </div>
            </div>
            <div className="mp-dialog-buttons">
                <MpButton type="filled" onClick={props.onClose}>Close</MpButton>
            </div>
        </MpDialog>
    )
}