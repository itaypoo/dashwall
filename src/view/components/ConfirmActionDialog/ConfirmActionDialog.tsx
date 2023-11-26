import styles from "./ConfirmActionDialog.module.css"
import MpDialog from "@/view/materialPoo/MpDialog";
import MpText from "@/view/materialPoo/MpText";
import MpButton from "@/view/materialPoo/MpButton";

type Props = {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    text?: string
    confirmText?: string
    cancelText?: string
}

export default function ConfirmActionDialog(props: Props) {

    return (
        <MpDialog isOpen={props.isOpen}>
            <p className="mp-dialog-title">{props.title}</p>
            { props.text &&
                <MpText scale="body">{props.text}</MpText>
            }
            <div className="mp-dialog-buttons">
                <MpButton
                    type="outlined"
                    onClick={props.onClose}
                >
                    {props.cancelText || "Cancel"}
                </MpButton>
                <MpButton
                    type="filled"
                    onClick={() => {
                        props.onConfirm()
                        props.onClose()
                    }}
                >
                    {props.confirmText || "Yes"}
                </MpButton>
            </div>
        </MpDialog>
    )
}